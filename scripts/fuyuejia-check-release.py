#!/usr/bin/env python3
"""Fail before touching production when a release file was omitted from Git."""
from pathlib import Path
import subprocess

root=Path(__file__).resolve().parents[1]
paths=(root/'scripts/fuyuejia-release-files.txt').read_text().splitlines()
paths.append('site/public/proposal/index.html')
tracked=set(subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0'))
errors=[]
for relative in paths:
    if not relative.startswith('site/public/proposal/') or '..' in Path(relative).parts:
        errors.append('Out-of-scope path: '+relative)
    elif not (root/relative).is_file():
        errors.append('Missing release file: '+relative)
    elif relative not in tracked:
        errors.append('Release file not included in Git: '+relative)
if errors:
    raise SystemExit('\n'.join(errors))
print('All '+str(len(paths))+' release files exist and are included in Git.')
