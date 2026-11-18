# Floating navigation implementation
## Design and interaction
- Center the floating navigation over the hero image/video. The logo sits inside the left end of the rounded black dock, with white icons and text; logo opacity is 0.85 (15% transparent), not 0.15. Use the destination's light logo or an approved monochrome treatment.
- Desktop inactive items are icons until hovered/focused. The current page keeps its label visible with a subtly lighter rounded active background. Expanding labels must not push the whole dock off center.
- The persistent Search Listings CTA sits next to the dock, same height, with search icon and no trailing arrow. Keep this configurable for other site types.
- Items with children open a rounded dark popover. Group resident links into Current Residents and Future Residents. Display submenu links on the right, preview on the left. Hover or keyboard focus selects the preview. Escape closes and restores trigger focus; outside click and leaving the entire popover close it. A small exit delay bridges the hover gap. Touch uses a toggle, never hover-only navigation.
- Preview may be a supplied tall screenshot that pans vertically, or a same-origin iframe. Prefer screenshots when embedding pages would initialize maps, feeds or recursive UI. Load only the selected preview. Cross-origin documents cannot be read or auto-scrolled; use a static preview instead. Disable motion for reduced-motion users. Do not move focus into a decorative preview.

## Porting inputs
Use config `{logo:{src,alt,href},items:[{id,label,icon,href?,children?:[{label,description,href,group?,previewImage?,previewUrl?}]}],searchCTA:{label,href},activeId}`. Use the destination router to determine active route, including child routes. Header.tsx shows composition; menu files show groups and NavigationPopover.tsx handles interaction. Source menu URLs and business-specific links must be replaced.

## Mobile clearance is part of the feature
At the mobile breakpoint (reference: 800px), use a two-row dock: brand/search on top, seven compact icon-label items beneath, with generous rounding. If the destination has more items, use an accessible compact menu rather than squeezing them indefinitely. Do not hide touch labels.
A fixed dock takes no flow space. Measure its actual height via ResizeObserver, add top inset and spacing, and expose a shell variable such as `--navigation-clearance`. Use that on hero content, breadcrumbs and plain-page introductions; don't add it twice to nested wrappers. The source contains per-page 180–210px corrections at 375px width: these are evidence of the issue, not universal constants. Allow hero height to grow with wrapped copy. Include safe-area inset where appropriate.

## Checks
Check 320,375,425,768 and desktop widths. Every first eyebrow, breadcrumb and heading must clear the dock; test long labels, enlarged text, pricing, legal, guides, forms, search and listing details. Verify open menus fit the viewport, scroll internally if tall, and remain above sticky sections without covering modal dialogs. Test pointer transitions, keyboard Tab/Escape, touch toggle, selected route, reduced-motion previews, missing preview image and SSR hydration. Keep desktop layout unchanged when fixing mobile.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
