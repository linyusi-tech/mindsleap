"""Add only the event routes to an independently updated CN server middleware."""
from pathlib import Path
import re
import shutil
import sys
import tempfile

path = Path(sys.argv[1])
original = path.read_text()
marker = '// November 8 registration entry points'
signature = re.search(r'export\s+(?:default\s+)?(?:async\s+)?function\s+middleware\s*\(\s*(\w+)\s*:\s*NextRequest\s*\)\s*\{', original)
if marker in original:
    sys.exit(0)
if not signature or 'NextResponse' not in original:
    sys.exit('Unexpected server middleware signature; nothing changed')
request = signature.group(1)
block = '''
  // November 8 registration entry points
  {
    const path = REQUEST.nextUrl.pathname.replace(/\\/$/, "");
    if (["/zh/event/2026november8", "/event/2026november8", "/event/2026november8/printout", "/privacy"].includes(path)) {
      const target = REQUEST.nextUrl.clone();
      target.pathname = path.replace(/^\\/zh\\//, "/") + "/index.html";
      return NextResponse.rewrite(target);
    }
  }
'''.replace('REQUEST', request)
with tempfile.NamedTemporaryFile(mode='w', dir=path.parent, delete=False) as out:
    tmp = Path(out.name)
    out.write(original[:signature.end()] + block + original[signature.end():])
try:
    shutil.copymode(path, tmp)
    if path.read_text() != original:
        sys.exit('Server middleware changed during deployment; retry')
    backup = path.with_suffix('.ts.before-november8-fix')
    if not backup.exists():
        shutil.copy2(path, backup)
    tmp.replace(path)
finally:
    tmp.unlink(missing_ok=True)
