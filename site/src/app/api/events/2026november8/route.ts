import { createRegistrationHandler, isConfigured, readConfig } from '@/lib/events/registration.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const config = readConfig();
const submit = createRegistrationHandler(config);
export async function POST(request: Request) { return submit(request); }
export async function GET() {
  return Response.json({ enabled: isConfigured(config) }, { headers: { 'Cache-Control': 'no-store' } });
}
