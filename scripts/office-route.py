#!/usr/bin/env python3
"""Restore the public Office exemption, preserving all concurrent server routes.

The source already contains this exemption upstream. Patch only this omission
on the CN server and its current runtime matcher; no rebuild or route rollback.
"""
from pathlib import Path
from datetime import datetime
import json, os, shutil, subprocess, sys

SITE = Path(sys.argv[1])
SOURCE = SITE/'src/middleware.ts'
MANIFEST = SITE/'.next/server/middleware-manifest.json'
OLD = '(?!api|'
NEW = '(?!office(?:/|$)|api|'

def exempt_office(value):
    if NEW in value or 'office(?:/|$)|' in value:
        return value
    if OLD not in value:
        raise ValueError('Unexpected middleware matcher; refusing an unscoped change.')
    assert value.count(OLD) == 1
    return value.replace(OLD, NEW, 1)

old_source = SOURCE.read_text()
new_source = exempt_office(old_source)
old_manifest = json.loads(MANIFEST.read_text())
new_manifest = json.loads(MANIFEST.read_text())
count = 0
for entry in new_manifest.get('middleware',{}).values():
    for matcher in entry.get('matchers',[]):
        if OLD in matcher['regexp'] or NEW in matcher['regexp']:
            matcher['regexp'] = exempt_office(matcher['regexp'])
            matcher['originalSource'] = exempt_office(matcher['originalSource'])
            count += 1
assert count == 1, f'Expected one language matcher, found {count}'

# Test the real JavaScript regex used by Next, including protected case routes.
checks = r'''
const fs=require('fs'); const {before,after}=JSON.parse(fs.readFileSync(0,'utf8'));
const matches=(data,path)=>Object.values(data.middleware).some(entry=>entry.matchers.some(m=>new RegExp(m.regexp).test(path)));
for(const path of ['/office','/office/','/office/subpath']) {
  if(matches(after,path)) throw Error('Office still intercepted: '+path);
}
for(const path of ['/', '/zh', '/en', '/zh/news', '/office-other', '/offices', '/office2', '/zh/office', '/case', '/case/private', '/product', '/decks', '/api/events/2026november8', '/_next/static/file.js', '/event/2026november8', '/zh/event/2026november8']) {
  if(matches(before,path)!==matches(after,path)) throw Error('Unrelated route changed: '+path);
}
console.log('Verified Office exemption and 16 unrelated route matcher cases.');
'''
subprocess.run(['node','-e',checks],input=json.dumps({'before':old_manifest,'after':new_manifest}),text=True,check=True)

backup = SITE.parent.parent/'mindsleap-backups'/('office-route-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup.mkdir(parents=True,exist_ok=False)
for path, data in [(SOURCE,new_source.encode()), (MANIFEST,(json.dumps(new_manifest,ensure_ascii=False)+'\n').encode())]:
    shutil.copy2(path,backup/path.name)
    if path.read_bytes() == data:
        continue
    temp=path.with_name(path.name+'.office-new')
    temp.write_bytes(data)
    shutil.copystat(path,temp)
    os.replace(temp,path)
print('Office route updated; backups:',backup)
