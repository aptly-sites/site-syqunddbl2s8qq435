---
name: boardui-listing-search
description: "Build a rental and sale listing search with Board UI filters, price histogram and range slider, bed-bath controls, property cards and synchronized map clusters."
---

# Board UI Listing Search

## Adapt to the destination
Inspect the destination framework, existing components, brand tokens and page shell first. Preserve the requested behavior; adapt class names, routing and assets to that project. The reference is React/TypeScript, but the pattern is not tied to React, Next.js, a hosting provider or a property feed.

Read [the implementation guide](references/implementation.md) before adapting code. `references/source/` is an offline snapshot of the refined implementation, not a standalone dependency-complete package. Use its relevant sections rather than pasting an entire legacy stylesheet. Resolve imports in the destination and consolidate overrides. Source snapshots retain original context only to explain the implementation; never publish the original company's branding, reviews, statistics, contacts, routes or business rules for another client.

Replace colors, fonts, assets, labels, URLs and locale using destination configuration. Do not copy server credentials or a provider integration merely to implement a visual pattern. Use supplied or authorized images; no brand media or client review data is bundled here. Changes to the destination site do not authorize a deployment.

## Deliver and verify
Implement the requested pattern, verify its behavior at mobile and desktop widths, and report files changed and any unverified integration. The guide lists pattern-specific acceptance checks. Do not claim a production check based only on local rendering.
