# Board UI property search
## UI and data boundaries
Source uses local Board UI select/range-slider primitives built on react-aria-components, custom popovers, lucide-react and Leaflet. Reuse the destination's authorized Board UI installation. The bundle includes the refined search composition as reference, not the entire Pro kit. Do not claim stock Board UI supplies all the custom behaviors below. `source/board-ui-imports.txt` lists local primitive dependencies; resolve their equivalents and theme tokens in the destination before copying imports.
Normalize destination inventory into `{id,listingKind:'rent'|'sale',address,city,region,zip,price:number|null,beds:number|null,baths:number|null,area,images:string[],lat:number|null,lng:number|null,detailHref,tourHref?,applicationHref?}`. Snapshot calls price `rent` for both types; use explicit price/unit fields in new projects. Keep backend fetching separate; supply data and callbacks. No original feed account, API route, portal, application rule or secret is bundled.

## Toolbar
Order: address/city/ZIP search; For Rent / For Sale / All Listings; City; Price; Beds & baths; Sort. Single active custom popover, outside click/Escape dismissal with focus returning to trigger. Use stable IDs. Style rounded bordered controls, strong selected state and compact accessible popover surfaces. On narrow screens wrap or use an accessible sheet without horizontal page overflow.
Price: sixteen histogram bins for relevant inventory, min/max dual-thumb slider plus synchronized numeric inputs. Selected bins emphasized. Histogram updates by listing kind and city; never silently mix monthly and purchase units without explicit labeling. For All Listings, prefer separate ranges or an explicit choice when the spread makes the rental scale useless. Handle no prices, identical prices, null/negative/nonfinite data, minimum greater than maximum, and changes to inventory/type/city. Preserve valid user-entered bounds even outside observed prices; ensure the displayed slider and actual filter agree. Reference steps25rent/1000sale are configurable, not universal.
Include “Calculate What I Can Afford” and “See N results”. Rent calculator uses destination-approved income rule, sale flow may link to buyer budget tool. Never inherit 3× income as a universal rule.
Beds segments Any,1+,2+,3+,4+,5+ with exact-match checkbox; Baths Any,1+,1.5+,2+,3+,4+. Accessible pressed/radio state. Sort featured/price ascending/descending; unknown prices last and deterministic tie handling.

## Cards and map
Whole card opens canonical detail URL; only Schedule Tour and Request Application as primary actions. Prevent action clicks from navigating the card. Use semantic links/buttons rather than invalid nested anchors. Photo controls, share and comparison must remain independent. Reuse shared application modal when configured; don't embed a second application form at page bottom.
Map and cards share active ID. For each cluster maintain ALL member IDs; hover/focus of any card highlights that cluster, including after zoom rebuild. Use DOM/SVG/divIcon markers or explicitly bundled icon images so deployment doesn't lose Leaflet marker assets. Null coordinates remain in list. Cluster click zooms or exposes individual results when coincident. Map failure leaves a usable list. Preserve attribution.

## Integration checks
Include both rent and sale records in the feed adapter. Share canonical URLs; carry filter context back from detail. Prefetch/cache detail by stable ID without loading every gallery upfront. Distinguish loading, real empty results and feed failure; never display stale fabricated inventory as live. Verify deployed feed and image access separately from local mocks.
Test all filters together, reset, URL initialization/back, city/type changes, mouse and keyboard slider, numeric extremes, touch popovers, card vs action clicks, cluster highlighting through zoom, empty data and slow/error feed. Validate actual destination primitives and CSS theme rather than copying their import names only.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
