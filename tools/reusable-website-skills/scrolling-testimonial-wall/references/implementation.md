# Animated masonry review wall
## Layout
Use configurable review records `{id,quote,name,sourceUrl?}`. Keep real client quotes verbatim and associated with their actual source; don't carry Pruitt testimonials into another client's site. No review dataset is bundled.
Two or three vertical columns of naturally varied-height rounded ivory cards. Navy text, warm quote mark, initials avatar, reviewer name. Reference final homepage uses22px quotes desktop,20px mobile with1.7–1.75 line-height,38px/28px card padding,26px radius and18px/17px reviewer labels. These override the older16px base stylesheet. Adapt proportionately to target typography without shrinking reviews into unreadable cards.

## Seamless motion
Partition records into column arrays. Each track contains two identical groups including the same bottom gap; animate translateY(-50%) so one whole group scrolls past without a jump. Use slow linear loops, about85–110seconds, alternating the middle direction. For too little content to fill a column, use a static layout rather than large blank looping gaps. Decorative copies must be aria-hidden and have no interactive descendants reachable by keyboard. Stable record IDs avoid duplicate-name keys.
Pause on hover, focus-within and a persistent Pause button. Provide Read all reviews: stop animation, remove mask/height clipping and hide the duplicate groups. Reduced-motion mode is static, all reviews accessible. Never hide reviews permanently when reducing to one mobile column; ensure read-all exposes every column or repartition all records into the single track.

## Responsive height
Homepage variant: a flex column with height100dvh; heading and controls flex-shrink:0, masonry flex:1 and min-height:0. Gentle top/bottom fade mask. If content exceeds a short viewport or enlarged text, use auto/min-height rather than clipping controls or forcing negative wall height. Standalone seller variant can use a taller configurable fixed/max-clamped wall. Expanded and reduced-motion modes always use auto height.
The source's final homepage overrides are in `source/home-wall-overrides.css`; fold their intent into a scoped component rather than retaining #figures and .home-main selectors. Set columns from a CSS variable matching the columnCount prop; the older source default stylesheet hardcodes three columns.

## Inputs and checks
Take reviews, optional heading/description/source link, column count, wall sizing and brand tokens as props. Replace the snapshot JSON import and source link with these inputs. Dependencies: React, lucide-react icons (or target equivalents), component CSS.
Check short/long quotes, zero/one/many reviews, duplicate names, resize, visible loop seam, pause/resume, keyboard focus, all-review expansion, reduced motion and 320px width/short landscape viewport. Source attribution links must remain usable without motion. Don't load huge photos for initials avatars.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
