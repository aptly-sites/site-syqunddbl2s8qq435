export async function onRequest() {
  const base = 'https://my.flexmls.com/davidpruitt/search/idx_links/20251219165502731127000000';
  const r = await fetch(base + '/listings/ids', { headers: { 'User-Agent': 'PruittRentalWebsite/1.0', Accept: 'application/json,text/html' } });
  const t = await r.text();
  const headers = Object.fromEntries([...r.headers].filter(([k]) => /server|cf-|x-|via|set-cookie|location|content-type|age/i.test(k)));
  const title = (t.match(/<title>([^<]*)<\/title>/i) || [])[1];
  return Response.json({ status: r.status, url: r.url, redirected: r.redirected, headers, title, len: t.length, body: t.replace(/\s+/g, ' ').slice(0, 1800), tail: t.replace(/\s+/g, ' ').slice(-600) });
}
