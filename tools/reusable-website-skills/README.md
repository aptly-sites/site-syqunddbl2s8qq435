# Portable website skills

Six independently installable Codex skills extracted from the refined site. Each has concise instructions, a detailed adaptation guide, and offline source references. The photo viewer also has a small reusable component/CSS starter. These are implementation skills, not an npm package or a complete cloned website.

## Install on another machine
Copy the six skill folders into `${CODEX_HOME:-$HOME/.codex}/skills/`, or run `python3 install.py` from this extracted bundle. The installer refuses to overwrite existing skills. Refresh/restart Codex after installation if they do not appear. You can install any one folder independently.

## Invoke
- `$floating-icon-navigation` — rounded logo/icon dock, grouped menus and previews.
- `$edge-section-navigation` — edge ticks, section labels, contrast and anchor logic.
- `$real-estate-buyer-seller-pages` — rounded buyer and seller page layouts.
- `$scrolling-testimonial-wall` — readable animated masonry testimonials.
- `$boardui-listing-search` — filter toolbar, range slider, cards and map behavior.
- `$property-photo-viewer` — mosaic entry and fullscreen photo viewer.

Example: “Use $floating-icon-navigation and $edge-section-navigation on this site. Keep its brand, colors, logo and routes.”

## Portability
No machine-specific paths are required by the skills. Original source snapshots retain Pruitt labels and routes solely as reference; the instructions explicitly require replacement. No customer reviews, private keys, backend credentials, media library or Board UI Pro distribution is bundled. Use your authorized Board UI installation for that skill. Existing React/Next imports in reference snapshots are adaptation points, not a requirement to change your next site's framework. Brand claims, pricing assumptions and legal/application criteria must come from the next client.

The source was captured after the mobile header corrections. Known caveats and acceptance checks are documented in each guide; snapshots are not blanket endorsements of every old implementation detail. No deployment or GitHub push is performed by installation.
