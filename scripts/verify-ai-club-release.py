from pathlib import Path
import hashlib,json,re
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'scripts/ai-club-release.json').read_text())
for item in manifest['files']:
    assert item['path'].startswith('site/public/product/ai-club/')
    assert '..' not in Path(item['path']).parts
    p=root/item['path']
    assert p.stat().st_size==item['bytes'],item['path']
    assert hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256'],item['path']
page=(root/'site/public/product/ai-club/index.html').read_text()
assert '<base href="/product/ai-club/" />' in page
assert page.index('不止于听课')<page.index('已加入的部分企业家')
assert page.index('下一站，继续向前')<page.index('科技与投资视野')
assert 'ai-native-innovation-growth-shanghai-2026-audience.jpg' in page
assert page.count('class="benefit-photo"')==4
assert re.findall(r'data-month="([^"]+)"',page)==['2026-12','2027-01','2027-02','2027-03','2027-04','2027-05']
print('Verified',len(manifest['files']),'AI Club publication files and approved page content.')
