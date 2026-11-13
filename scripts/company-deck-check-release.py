from pathlib import Path
import hashlib,json,subprocess
r=Path(__file__).resolve().parents[1]
tracked=set(subprocess.check_output(['git','ls-files','-z'],cwd=r).decode().split('\0'))
manifest=json.loads((r/'scripts/company-deck-release-sha256.json').read_text())
for name,sha in manifest.items():
    p=r/name
    assert p.is_file(),name
    assert name in tracked, 'Not in Git: '+name
    assert hashlib.sha256(p.read_bytes()).hexdigest()==sha,name
release=(r/'scripts/company-deck-release-files.txt').read_text().splitlines()
assert set(release)==set(manifest)-{'site/public/decks/index.html'}
assert release[-1]=='site/public/decks/MindsLeap/company-and-products/index.html'
print('PASS:',len(manifest),'release files exist, tracked, SHA256 verified')
