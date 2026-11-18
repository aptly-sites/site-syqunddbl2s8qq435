# Listing gallery and photo viewer
## Entry gallery
Build a rounded mosaic: large primary photo with smaller supporting images, a View all photos control and shared listing Share action. Mobile reduces the mosaic count while all photos remain available in the viewer. Clicking any image opens at that exact index. Zero images shows a deliberate placeholder and no viewer button; one image suppresses previous/next.

## Fullscreen viewer
Use the included `assets/PhotoViewer.tsx` and `assets/photo-viewer.css` as a small React starter, or translate into the destination UI framework. Dependencies: react, react-dom, lucide-react. Import the CSS once. Mount only when open and photos are nonempty; render client-side. Inputs: image URLs, address, locationLabel, controlled index, onChange and onClose. Filter invalid URLs and reset/clamp the controlled index when property or photos change. Supply semantic photo descriptions if available instead of relying solely on numbered address text.
Native dialog rendered via portal into document.body avoids parent stacking contexts. Open with showModal, lock body scrolling and restore the previous overflow and opener focus on teardown. For applications with nested dialogs, use the destination's shared scroll-lock manager. Escape/onClose must synchronize parent state. Use native modal focus management or an equivalent accessible focus trap, never a visual overlay without keyboard containment.
Dark fullscreen canvas, address/location top-left, close top-right, large image object-fit:contain so the entire room is visible. Previous/next buttons and arrow keys wrap around; swipe horizontal threshold50px. Counter announces active photo. Horizontal thumbnail strip centers the active thumbnail, marks it with a contrasting border and aria-pressed. Reduced motion disables smooth thumbnail scrolling. Thumbnail images lazy-load; the active photo loads promptly. No new generated imagery is needed.

## Checks
Open every mosaic index; previous/next including wrap; thumbnails; arrow keys; Escape; close button; focus restoration; page scroll position; iOS viewport/safe areas; portrait/landscape images; a long address; slow/broken photos; empty/one-image lists; property changes while open. Keep main image visible with thumbnails and heading at short landscape heights. Do not intercept arrows while focus is in a text input if the destination adds one. The starter assumes valid nonempty photos; the caller must enforce this contract.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
