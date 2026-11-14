from pathlib import Path
import hashlib,json,re,subprocess
r=Path(__file__).resolve().parents[1]
tracked=set(subprocess.check_output(['git','ls-files','-z'],cwd=r).decode().split('\0'))
manifest=json.loads((r/'scripts/geo-deck-release-sha256.json').read_text())
for name,sha in manifest.items():
    p=r/name
    assert p.is_file() and name in tracked, name
    assert hashlib.sha256(p.read_bytes()).hexdigest()==sha, name
    assert not re.search(r'(?:vless|vmess|trojan|ss|ssr|hysteria2?|hy2)://',p.read_text(),re.I), 'Private connection in '+name
print('PASS: 3 release files tracked, SHA verified, no private connection')
