"""Store large printout files as Git-sized parts; restore exact originals before deployment."""
from hashlib import sha256
from pathlib import Path
import json
import re

ROUTE = Path('public/event/2026november8/printout/assets')


def digest(path):
    with path.open('rb') as stream:
        return sha256_stream(stream)


def sha256_stream(stream):
    result = sha256()
    while block := stream.read(1024 * 1024):
        result.update(block)
    return result.hexdigest()


def pack_asset(site, asset, chunk_bytes=48 * 1024 * 1024):
    site, asset = Path(site), Path(asset)
    if asset.parent.resolve() != (site / ROUTE).resolve() or not re.fullmatch(r'[a-f0-9]{24}\.[a-z0-9]+', asset.name):
        raise ValueError('Asset must be a content-hashed printout file')
    bundle = site / 'printout-assets'
    bundle.mkdir(parents=True, exist_ok=True)
    manifest = bundle / 'manifest.json'
    data = json.loads(manifest.read_text()) if manifest.exists() else {'assets': []}
    full_hash = digest(asset)
    parts = []
    with asset.open('rb') as stream:
        while block := stream.read(chunk_bytes):
            name = f'{full_hash}.{len(parts):03d}.part'
            path = bundle / name
            if not path.exists() or digest(path) != sha256(block).hexdigest():
                path.write_bytes(block)
            parts.append({'name': name, 'bytes': len(block), 'sha256': sha256(block).hexdigest()})
    row = {'target': asset.name, 'bytes': asset.stat().st_size, 'sha256': full_hash, 'parts': parts}
    data['assets'] = [item for item in data['assets'] if item['target'] != asset.name] + [row]
    manifest.write_text(json.dumps(data, indent=2) + '\n')
    ignore = asset.parent.parent / '.gitignore'
    text = ignore.read_text() if ignore.exists() else '# Full originals are restored from site/printout-assets before deployment.\n'
    line = f'/assets/{asset.name}'
    if line not in text.splitlines():
        ignore.write_text(text + line + '\n')
    return row


def restore(site):
    site = Path(site)
    bundle = site / 'printout-assets'
    manifest = bundle / 'manifest.json'
    if not manifest.exists():
        return
    for row in json.loads(manifest.read_text())['assets']:
        if not re.fullmatch(r'[a-f0-9]{24}\.[a-z0-9]+', row['target']):
            raise ValueError('Invalid printout destination')
        target = site / ROUTE / row['target']
        if target.exists() and target.stat().st_size == row['bytes'] and digest(target) == row['sha256']:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        temp = target.with_suffix(target.suffix + '.tmp')
        try:
            with temp.open('wb') as output:
                for part in row['parts']:
                    if not re.fullmatch(r'[a-f0-9]{64}\.[0-9]{3}\.part', part['name']):
                        raise ValueError('Invalid printout part')
                    content = (bundle / part['name']).read_bytes()
                    if len(content) != part['bytes'] or sha256(content).hexdigest() != part['sha256']:
                        raise ValueError('Printout part does not match its content hash')
                    output.write(content)
            if temp.stat().st_size != row['bytes'] or digest(temp) != row['sha256']:
                raise ValueError('Restored printout does not match its original')
            temp.replace(target)
        finally:
            temp.unlink(missing_ok=True)
        print(f'Restored {target.name}: {row["bytes"]} bytes', flush=True)


if __name__ == '__main__':
    restore(Path(__file__).resolve().parents[1])
