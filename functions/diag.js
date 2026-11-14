export async function onRequest() {
  const base = 'https://my.flexmls.com/davidpruitt/search/idx_links/20251219165502731127000000';
  const out = {};
  for (const [name, headers] of [['app-ua', { 'User-Agent': 'PruittRentalWebsite/1.0', Accept: 'application/json,text/html' }], ['browser-ua', { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36', Accept: 'application/json,text/html' }]]) {
    try { const r = await fetch(base + '/listings/ids', { headers }); const t = await r.text(); out[name] = { status: r.status, type: r.headers.get('content-type'), head: t.slice(0, 200) }; } catch (e) { out[name] = { error: String(e) }; }
  }
  try { const r = await fetch('https://app.getaptly.com/api/portal/listings/syQuNDDbL2S8qQ435/g7rcYNTB9cG2DBqP3?audience=applicant&page=0&size=1'); out.aptly = { status: r.status }; } catch (e) { out.aptly = { error: String(e) }; }
  return Response.json(out);
}
