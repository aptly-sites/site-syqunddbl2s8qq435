// scripts/refresh-listings.ts
import { mkdir, writeFile } from "node:fs/promises";

// lib/mls.ts
var base = "https://my.flexmls.com/davidpruitt/search/idx_links/20251219165502731127000000";
var decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
var plain = (s) => decode(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
var numeric = (v) => v !== null && v !== void 0 && v !== "" && Number.isFinite(Number(v)) ? Number(v) : null;
function attribute(html, name) {
  const m = html.match(new RegExp(name + `=(['"])(.*?)\\1`, "s"));
  if (!m) throw Error("MLS detail structure changed");
  return JSON.parse(decode(m[2]));
}
function parseMlsDetail(html) {
  const d = attribute(html, "data-map--ldp-listing");
  const f = d.StandardFields;
  if (!f || typeof f.PropertyClass !== "string" || typeof f.StandardStatus !== "string") throw Error("MLS classification missing");
  if (!["Rental", "Residential"].includes(f.PropertyClass) || f.StandardStatus !== "Active" || d.MlsStatus !== "Active") return null;
  const media = attribute(html, "data-map--ldp-listing-native-media");
  const area = numeric(html.match(/<span>\s*([\d,]+)\s+SF\s*<\/span>/)?.[1]?.replace(/,/g, ""));
  const description = plain(html.match(/class="remarks-and-showing-info-clamped"[^>]*>([\s\S]*?)<\/div>/)?.[1] || "");
  const rent = numeric(d.ListPrice), beds = numeric(d.BedsTotal), baths = numeric(d.BathsTotal);
  if (!d.ListingKey || !d.StreetAddress || rent === null || rent <= 0 || beds === null || baths === null || area === null) throw Error("Incomplete MLS rental facts");
  return { listingKind: f.PropertyClass === "Rental" ? "rent" : "sale", id: d.ListingKey, address: d.StreetAddress, city: d.City, zip: d.PostalCode, title: d.StreetAddress, rent, beds, baths, area, images: (media.Photos || []).map((p) => p.Uri1024 || p.UriLarge).filter((u) => typeof u === "string" && u.startsWith("https://")), lat: numeric(d.Latitude), lng: numeric(d.Longitude), available: null, type: f.PropertyClass === "Rental" ? "Residential Lease" : "Residential Sale", description, amenities: [], pets: "Contact leasing", deposit: null, tourUrl: null, applicationUrl: null, virtualTourUrl: null };
}
async function fetchMlsRentals() {
  const relay = process.env.MLS_RELAY_URL?.trim();
  if (relay) {
    const key = process.env.MLS_RELAY_KEY?.trim();
    if (!key) throw Error("MLS relay key missing");
    const url = new URL(relay);
    if (url.protocol !== "https:" && url.hostname !== "localhost") throw Error("MLS relay must use https");
    const response2 = await fetch(relay.replace(/\/+$/, "") + "/listings", { headers: { "x-relay-key": key, Accept: "application/json" }, signal: AbortSignal.timeout(25e3) });
    if (!response2.ok) throw Error("MLS relay unavailable");
    const data2 = await response2.json();
    if (!Array.isArray(data2.listing_keys) || data2.listing_keys.length > 1e3 || data2.listing_keys.some((id) => !/^\d{26}$/.test(id)) || !data2.details || typeof data2.details !== "object") throw Error("Invalid MLS inventory");
    return [...new Set(data2.listing_keys)].map((id) => {
      const html = data2.details[id];
      if (typeof html !== "string") throw Error("MLS detail missing");
      return parseMlsDetail(html);
    }).filter((home) => home !== null);
  }
  const response = await fetch(base + "/listings/ids", { headers: { "User-Agent": "PruittRentalWebsite/1.0", Accept: "application/json,text/html" }, signal: AbortSignal.timeout(2e4) });
  if (!response.ok) throw Error("MLS inventory unavailable");
  const body = await response.text();
  if (!body.trim().startsWith("{")) throw Error("MLS returned non-data response");
  const data = JSON.parse(body);
  if (!Array.isArray(data.listing_keys) || data.listing_keys.length > 1e3 || data.listing_keys.some((id) => !/^\d{26}$/.test(id))) throw Error("Invalid MLS inventory");
  const ids = [...new Set(data.listing_keys)];
  const result = new Array(ids.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < ids.length) {
      const i = cursor++;
      const r = await fetch(base + "/listing_detail/" + ids[i], { headers: { "User-Agent": "PruittRentalWebsite/1.0", Accept: "application/json,text/html" }, signal: AbortSignal.timeout(2e4) });
      if (!r.ok) throw Error("MLS detail unavailable");
      result[i] = parseMlsDetail(await r.text());
    }
  }));
  return result.filter((h) => h !== null);
}
var words = { north: "n", south: "s", east: "e", west: "w", street: "st", drive: "dr", avenue: "ave", road: "rd", lane: "ln", court: "ct", place: "pl", trail: "trl", circle: "cir", boulevard: "blvd", saint: "st", apartment: "unit", apt: "unit" };
function addressKey(address, city) {
  return (address + " " + city).toLowerCase().replace(/[.#,]/g, " ").split(/\s+/).filter(Boolean).map((w) => words[w] || w).filter((w) => w !== "unit").join(" ");
}
function attachTours(homes2, aptly) {
  const index = /* @__PURE__ */ new Map();
  for (const h of aptly) {
    const a = h.home;
    if (!a?.tourUrl) continue;
    const raw = h.raw;
    const variants = [a.address];
    if (raw.unitNumber && raw.unitNumber !== "1" && !/\b(unit|apt)\b|#/i.test(a.address)) variants.push(a.address + " " + raw.unitNumber);
    if (raw.name) variants.push(raw.name.replace(/\s+#\s*1$/, ""));
    for (const v of variants) {
      const key = addressKey(v, a.city);
      const matches = index.get(key) || /* @__PURE__ */ new Map();
      matches.set(a.id, a);
      index.set(key, matches);
    }
  }
  return homes2.map((h) => {
    if (h.listingKind === "sale") return h;
    const candidates = index.get(addressKey(h.address, h.city));
    const a = candidates?.size === 1 ? [...candidates.values()][0] : null;
    return { ...h, tourUrl: a?.tourUrl || null, aptlyId: a?.id };
  });
}

// lib/rentals.ts
function safeUrl(v) {
  try {
    if (typeof v !== "string") return null;
    const u = new URL(v);
    return u.protocol === "https:" && !u.username && !u.password ? u.href : null;
  } catch {
    return null;
  }
}
var text = (v) => typeof v === "string" ? v : "";
var positive = (v) => typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null;
var cents = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0 ? v / 100 : null;
function normalizeRental(h) {
  if (h.publishedForRent !== true || typeof h._id !== "string" || !h.address?.address) return null;
  const xy = h.address.geopoint;
  const valid = Array.isArray(xy) && xy.length === 2 && xy.every((n) => typeof n === "number" && Number.isFinite(n)) && Math.abs(xy[0]) <= 180 && Math.abs(xy[1]) <= 90 && xy[0] !== 0 && xy[1] !== 0;
  const images = [...new Set([...Array.isArray(h.marketingFiles) ? h.marketingFiles : [], ...Array.isArray(h.photo) ? h.photo : []].map(safeUrl).filter((v) => !!v))];
  return { id: h._id, address: text(h.address.address), city: text(h.address.city), zip: text(h.address.postalCode), title: text(h.marketingName) || text(h.address.address), rent: cents(positive(h.marketRent?.amount)), beds: positive(h.beds), baths: positive(h.baths), area: positive(h.totalArea), images, lat: valid ? xy[1] : null, lng: valid ? xy[0] : null, available: typeof h.availableDate === "string" && !Number.isNaN(Date.parse(h.availableDate)) ? h.availableDate : null, type: text(h.buildingType), description: text(h.marketingDescription).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(), amenities: Array.isArray(h.unitAmenities) ? h.unitAmenities.filter((v) => typeof v === "string") : [], pets: h.petsAllowed === true ? ["Pets considered", ...Array.isArray(h.petRestrictions) ? h.petRestrictions.filter((v) => typeof v === "string") : []].join(" \xB7 ") : h.petsAllowed === false ? "No pets" : "Contact leasing", deposit: cents(h.deposit?.amount), tourUrl: h.aptlyShowings?.active ? h.aptlyShowings.type === "aptly" ? `https://portal.getaptly.com/syQuNDDbL2S8qQ435/showing/app/showing/create/?cId=${encodeURIComponent(h._id)}` : safeUrl(h.aptlyShowings.link) : null, applicationUrl: h.aptlyScreening?.active ? safeUrl(h.aptlyScreening.link || h.applicationUrl) : null, virtualTourUrl: safeUrl(h.virtualTourUrl) };
}
var cache;
var pending;
async function getTourSources() {
  const records = /* @__PURE__ */ new Map();
  let received = 0;
  for (let page = 0; page < 30; page++) {
    const r = await fetch(`https://app.getaptly.com/api/portal/listings/syQuNDDbL2S8qQ435/g7rcYNTB9cG2DBqP3?audience=applicant&page=${page}&size=50`, { signal: AbortSignal.timeout(12e3) });
    if (!r.ok) throw Error("Tour source unavailable");
    const data = await r.json();
    if (!Array.isArray(data.data) || !Number.isFinite(data.total)) throw Error("Invalid tour source");
    for (const raw of data.data) {
      const home = normalizeRental(raw);
      if (home) records.set(home.id, { raw, home });
    }
    received += data.data.length;
    if (received >= data.total) return [...records.values()];
    if (!data.data.length) throw Error("Incomplete tour source");
  }
  throw Error("Tour source exceeds limit");
}
var retryAfter = 0;
var cacheNumber = (key, fallback) => {
  const value = Number(process.env[key] ?? NaN);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};
var edgeCache = () => typeof caches !== "undefined" ? caches.default : void 0;
var cacheRequest = () => new Request("https://mls-cache.invalid/listings-v2");
async function readLastGood() {
  try {
    const response = await edgeCache()?.match(cacheRequest());
    const value = response ? await response.json() : void 0;
    return value && Array.isArray(value.homes) && Number.isFinite(value.at) ? value : void 0;
  } catch {
    return void 0;
  }
}
async function saveLastGood(value) {
  try {
    await edgeCache()?.put(cacheRequest(), new Response(JSON.stringify(value), { headers: { "content-type": "application/json", "cache-control": "public, max-age=172800" } }));
  } catch {
  }
}
async function readSnapshot() {
  if (process.env.MLS_REQUIRE_LIVE === "1") return;
  try {
    const response = await fetch("https://site-syqunddbl2s8qq435.pages.dev/data/listings.json", { signal: AbortSignal.timeout(8e3) });
    if (!response.ok) return;
    const value = await response.json();
    if (!Number.isFinite(value.at) || value.at > Date.now() + 6e4 || Date.now() - value.at > 24 * 36e5 || !Array.isArray(value.homes) || !value.homes.length) return;
    if (!value.homes.every((h) => typeof h.id === "string" && typeof h.address === "string" && Array.isArray(h.images))) return;
    return value;
  } catch {
    return void 0;
  }
}
async function getRentals() {
  const fresh = cacheNumber("MLS_CACHE_FRESH_SECONDS", 300) * 1e3, stale = cacheNumber("MLS_CACHE_MAX_STALE_HOURS", 24) * 36e5;
  if (cache && Date.now() - cache.at < fresh) return cache.homes;
  if (pending) return pending;
  pending = (async () => {
    const usable = (value) => value && Date.now() - value.at < stale ? value : void 0;
    const stored = await readLastGood();
    if (stored && Date.now() - stored.at < fresh) {
      cache = stored;
      return stored.homes;
    }
    if (Date.now() < retryAfter) {
      const saved = usable(cache) || usable(await readLastGood()) || await readSnapshot();
      if (saved) {
        cache = saved;
        return saved.homes;
      }
    }
    try {
      const [homes2, tours] = await Promise.all([fetchMlsRentals(), getTourSources().catch(() => [])]);
      const result = attachTours(homes2, tours);
      cache = { at: Date.now(), homes: result };
      retryAfter = 0;
      await saveLastGood(cache);
      return result;
    } catch (error) {
      retryAfter = Date.now() + 6e4;
      const saved = usable(cache) || usable(await readLastGood()) || await readSnapshot();
      if (saved) {
        cache = saved;
        return saved.homes;
      }
      throw error;
    }
  })();
  try {
    return await pending;
  } finally {
    pending = void 0;
  }
}

// scripts/refresh-listings.ts
process.env.MLS_REQUIRE_LIVE = "1";
var homes = await getRentals();
if (!homes.length) throw Error("Refusing to replace inventory with an empty feed");
var destination = process.argv[2] || "public/data/listings.json";
await mkdir(destination.slice(0, destination.lastIndexOf("/")), { recursive: true });
await writeFile(destination, JSON.stringify({ at: Date.now(), homes }));
console.log(`Refreshed ${homes.length} listings`);
