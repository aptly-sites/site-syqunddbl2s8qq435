# Buyer and seller landing page system
## Shared visual system
Full-bleed image/video hero with dark mask, left-aligned eyebrow, large regular sans heading with italic serif emphasis, readable body text and primary CTA. Hero is separate from the rounded cells; no stats bolted to its bottom. Reserve actual mobile navigation height before the first text and allow content to grow.
Below hero, use one continuous warm page background and rounded22–28px sections with a fine warm border, spacious consistent padding and consistent body typography. Brand tokens are configurable; the source palette is ivory #faf8f4, navy #193b50, tan #eee5d7, light blue #b9dfed. Scope styles to these pages. Use flow-root/padding on the page wrapper to prevent last-child margin collapse revealing a different strip above the footer. Preserve breathing room around the last cell while its surrounding background reaches the footer.

## Seller composition (final refined version)
1. Hero: personal selling guidance and consultation CTA.
2. Six key factors: overlapping circular diagram on the left surrounding the client experience. Right side holds headline then selected detail, with no separate colored box behind the detail. The outer cell has a subtle tan diagonal gradient: approximately50% opacity at upper-left, transparent by midpoint. Factors: partnership, preparation, exposure, financial clarity, advocacy, local insight. Mouse, focus and click all select. Mobile must keep text readable; stack or use selectable cards when circles become cramped.
3. One agent guiding you: left selection cells with meaningful icons (no numbers/plus signs), active navy with white text. Right panel has matching wide photo and text below; image is the dominant portion, not text beneath the left navigation. Plan, calendar, presentation, feedback, offers. Optional local line art in upper-right. Source final images preserve panoramic ratio2098/749 rather than forcing severe crop.
4. Preparation: believable before/after of the SAME bedroom, same angle and daylight conditions. Comparison slider on left, explanatory heading/copy on right, compact rounded section. Do not imply generated staging is an actual completed project. Supply both image assets rather than scraping another site's photos.
5. Tall testimonial masonry wall; FAQ; final consultation tile with verified stats on right. Reference seller wall is about900px high desktop/800px mobile, with static/reduced-motion expansion.
The final design deliberately removed separate sales step-by-step, exposure-strategy and financial-clarity sections. Do not reintroduce them just because their concepts appear among the six factors.

## Buyer composition
Hero; short service intro; interactive buying-process guidance; affordability calculator; local market thumbnail links in rounded cards. Include every configured market, not a hard-coded four-city limit. The final market cell ends before the footer, with matching surrounding page color all the way down.
Calculator reference explains income, savings, debt, reserves, DTI, interest, property tax, insurance, PMI, closing costs and HOA. Treat rates, minimum down payment and PMI curves as sample assumptions, never current lender terms. Keep inputs local unless a submitted form explicitly collects them. Show monthly costs, cash at purchase, reserves, and which constraint limits the estimate. Use the destination's approved assumptions and disclosures.

## Inputs and dependencies
Replace brand, market, contact/booking links, hero/gallery images, all review data, FAQs and stats with client-approved material. Never inherit $32M,400+,11× or Arizona defaults. Snapshot page.tsx needs its target Header and metadata helper replaced; SellersContent.tsx needs a destination testimonial component; use the included source for layout behavior, not transplanted claims. Dependencies are React and optional lucide icons; calculator can be isolated from the page.

## Checks
Mobile hero clearance; full section background through footer; each selector changes both image and copy; comparison works with mouse/touch/keyboard; same room aligns at both slider ends; reduced motion; no unknown image URLs; no fabricated proof. Verify calculator zero savings, zero interest, high debts, reserves greater than savings and large values. Test CTA destinations and local market links. Verify valid heading hierarchy and one h1 per page.

## Reference files
See [source index](source-index.md) for the relevant offline components and styles.
