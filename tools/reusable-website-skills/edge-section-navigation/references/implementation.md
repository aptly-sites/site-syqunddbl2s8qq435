# Screen-edge section navigator
## Appearance
Fixed exactly at left:0, vertically centered. No containing pill, border or panel. Thin horizontal ticks: inactive roughly16px, active30px. On hover create a peak: selected52px, neighbors taper by12px per distance down to16px. Animate widths for about280ms; active/hover opacity1 versus0.4. On mobile shorten ticks to28px maximum and avoid covering text. Label appears to the right in a rounded black pill at70% opacity, white text, about13px. Keyboard focus reveals the same label. Hide in print and disable transitions for reduced motion.

## Sections and navigation
Prefer explicit `{id,label,element,theme?}` registrations or `data-section-label` and `data-section-theme` hooks. The snapshot discovers visible h1/h2 sections beneath `.site-page-content`; adapt that root to the target. Exclude modal headings, menus, hidden tab panels, cards and sidebar widgets. Deduplicate nested headings. Keep authored IDs; generate stable unique IDs only if missing. Recompute on route and visible-tab changes, async content and viewport changes, with observer cleanup.
Click updates the hash and jumps below the actual header clearance. Reduced motion uses immediate scrolling. Preserve query parameters. Reflect the visible section via `aria-current="location"` and an accessible navigation label. Verify direct hash links and back/forward behavior in the target router.

## Sticky panel trap
A pinned section's bounding rectangle gives its pinned position, not its original document location. Use a stable normal-flow sentinel before each sticky panel where possible. The snapshot's `sectionTop` temporarily unpins sticky sections synchronously, measures, and restores inline styles before paint; if reusing it, adapt its selectors and preserve priorities in finally. Check destination from above AND below, especially a homepage markets/Arizona section. A raw current getBoundingClientRect plus scrollY is insufficient for already-pinned panels.

## Contrast
Resolve color per tick against the surface at that tick's Y, not one theme for the whole rail. Prefer explicit light/dark surface metadata for photos, gradients and video. The snapshot uses elementsFromPoint excluding the rail, then foreground color of a photo section heading or opaque ancestor background. This heuristic can be wrong for mixed imagery; add explicit overrides and test. Dark section -> white ticks, light section -> black; label always white on its black pill. Reevaluate on scroll/resize and relevant content changes with requestAnimationFrame; avoid an unnecessary perpetual timer when observers suffice. Verify footer and dark management CTA, including transitions where ticks span two surfaces.

## Checks
Test every tick from both scroll directions, overlapping panels, async height changes, hidden tabs, light/dark transitions, long labels, mobile touch targets, keyboard activation and reduced motion. If a short viewport or many sections cannot fit usable touch targets, offer a compact accessible section menu rather than silently clipping stops.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
