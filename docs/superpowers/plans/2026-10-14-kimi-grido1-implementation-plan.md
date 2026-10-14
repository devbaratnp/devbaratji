# KIMI — GRID01 Racing Systems Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a faithful, full-motion, single-file recreation of the supplied Kimi Antonelli / GRID01 Racing Systems site.

**Architecture:** Create one `index.html` containing all markup, CSS, SVG primitives, and one inline ES module. Build reusable motion and rendering helpers inside that module, then compose the five sections over one ticker and one set of design tokens. Use the supplied remote asset bucket with visible failures and deterministic non-WebGL fallbacks.

**Tech Stack:** HTML5, CSS custom properties/container queries, inline SVG, Canvas 2D, Three.js `0.185.0`, Lenis `1.3.26`, Google Fonts Oswald and Space Grotesk, browser-native accessibility APIs.

---

## File map

- Create: `D:/www/devbaratji/index.html` — the complete deliverable; no other runtime file is allowed.
- Create: `D:/www/devbaratji/docs/superpowers/specs/2026-10-14-kimi-grido1-design.md` — approved design record, already committed.
- Create: `D:/www/devbaratji/docs/superpowers/plans/2026-10-14-kimi-grido1-implementation-plan.md` — this implementation plan.

## Task 1: Scaffold the single-file document and token system

**Files:** Create `D:/www/devbaratji/index.html`.

- [ ] Add `<!doctype html>`, `<html lang="en">`, the font preconnects, the exact Three.js/Lenis import map, and semantic page landmarks.
- [ ] Add the complete tier-1 and tier-2 token sets from the brief, root font-size bands, breakpoint variables, reset styles, typography classes, visually-hidden utility, and shared bracket/chamfer primitives.
- [ ] Set `history.scrollRestoration = "manual"` and call `window.scrollTo(0, 0)` before initializing the page.
- [ ] Add a `<div id="asset-errors" aria-live="polite">` region, a loader veil with `role="status"`, and fallback hero layers that can be shown without JavaScript.
- [ ] Verify the scaffold parses by opening `index.html` in a browser and confirming the document background, font loading, and no console syntax errors.

## Task 2: Build the motion runtime

**Files:** Modify `D:/www/devbaratji/index.html` inside its inline module.

- [ ] Implement `subscribe(callback, getFramerate)` using a snapshot of subscribers, elapsed-time gating, start-on-first/cancel-on-last behavior, and one shared rAF loop.
- [ ] Instantiate Lenis with `{ smoothWheel: true }`, register its `raf` subscriber first, and bypass Lenis under `prefers-reduced-motion: reduce`.
- [ ] Implement the damped spring state `{ value, velocity }`, 1ms substeps capped at 64ms, named configs `REVEAL`, `ROW`, `ITEM`, `SHEET`, `FIGURE`, `TYPE`, `YEAR`, `COPY`, `NAME`, `VEIL`, `CLEAR`, `LABEL`, `PROGRESS`, `YEAR_SETTLE`, and `TRIGGER`, plus `delayIn` and `once/always/forward` modes.
- [ ] Implement `makeTextReveal(element, { mode, units, stagger, delayIn, config })` with visually-hidden plain copy, `aria-hidden` animated spans, word/letter transform states, and no clipping.
- [ ] Implement `makeScrollTrigger(element, options)` using the brief's `poses` math, scrub/toggle handling, immediate transform interpolation, smoothed progress, IntersectionObserver gating, and ten-frame post-leave loop.
- [ ] Add a diagnostic `window.__kimi` object exposing the ticker, spring factory, and trigger count for browser verification only.
- [ ] Run a browser console smoke check that `window.__kimi` exists and `document.querySelectorAll('[data-reveal]')` registers without throwing.

## Task 3: Build the sticky stack, header, and hero DOM

**Files:** Modify `D:/www/devbaratji/index.html` markup and styles.

- [ ] Add the masthead/header/nav, h1, driver meta rows, profile/trailer panels, next-race panel, stat panel, footer row, mobile menu dialog, and the first three-section sticky wrapper.
- [ ] Add the hero contour SVG/canvas layers, WebGL host, portrait fallback, helmet veil mask, cursor-reveal layer, and texture/error status hooks with the supplied asset names.
- [ ] Implement the mobile menu open/close button, focus transfer to close, `Escape` close, dialog semantics, and primary navigation anchors.
- [ ] Add the hero entrance schedules `nav 0`, `identity 180`, `panels 900`, `actions 1500`, plus the exact copy and asset references from the brief.
- [ ] Apply sticky recede logic to Hero and Season with `RECEDE_SCALE = 0.9`, `RECEDE_SHADE = 0.55`, phone shrink disabled, and empty transform at rest.
- [ ] Verify visually at 1440px and 390px that the hero has correct structure, no horizontal overflow, and the next sticky layer covers it.

## Task 4: Implement the Three.js hero scene and fallback

**Files:** Modify `D:/www/devbaratji/index.html` inline module and hero styles.

- [ ] Import `GLTFLoader`, `DRACOLoader`, `RGBELoader`, and `mergeGeometries` from the specified CDN paths.
- [ ] Load `helmet3.glb`, `studio-light.hdr`, `noise.webp`, and the four person maps through `Promise.all`; set the Draco decoder path exactly to the supplied CDN decoder path.
- [ ] Build the PMREM environment, helmet scene, portrait depth-parallax plane, alpha cutout, normal-map relight, noise mask, contour backdrop, and camera sizing with resize handling.
- [ ] Add pointer-path sampling, recent-path liquid reveal, mobile/coarse-pointer idle sweep behavior, wireframe scan timing, and reduced-motion freeze behavior.
- [ ] On any asset failure, call `showAssetError(url)`, keep the failure visible in `#asset-errors`, show the SVG/portrait fallback, and lift the veil immediately if WebGL is unavailable.
- [ ] Test a normal browser load and a forced WebGL-disabled/failure path; verify the page never leaves an opaque veil behind without a message.

## Task 5: Build the season map and transition seam

**Files:** Modify `D:/www/devbaratji/index.html` markup, styles, and module.

- [ ] Add the dark Season section with the exact eyebrow/headline/meta/copy blocks and its map canvas behind the text.
- [ ] Render the 8,004-dot halftone field, dashed grid axes, three hub rings, slow ping, filled track ribbon, turn markers, and map drift through the shared ticker.
- [ ] Add the chequered seam rows and scroll-driven dissolve using a deterministic grid and shared noise, with mobile copy protection and desktop map visibility.
- [ ] Implement the six-second clockwise track fill, hot white filament, additive cyan glow, marker lighting, and cooled closed-lap rest state.
- [ ] Implement the pointer reticle with lattice-aligned row/column arms and crossing chequer dots, disabled for reduced motion.
- [ ] Verify canvas resize, sticky recede, track completion, and reticle behavior without console errors.

## Task 6: Build the timeline block

**Files:** Modify `D:/www/devbaratji/index.html` markup, styles, and module.

- [ ] Add the timeline section heading and seven rows for `2012`, `2015`, `2019`, `2021`, `2024`, `2025`, and `2026`, each with its supplied image, copy, year, and metadata.
- [ ] Style stepped-corner plates with `timeline-outline`, `timeline-fill`, center rail, alternating layout, three parallax layers, and the exact mobile column rules.
- [ ] Implement the progress thread and square marker, row in-view gates with `0% 0% -25% 0%`, letter-by-letter year entrance, `YEAR_RESTING = 0.4`, `YEAR_HOLD = 2200`, and hover dimming.
- [ ] Surface image load failures through the shared banner and preserve the plate outline when a photograph is unavailable.
- [ ] Verify seven rows render, hover dims non-active rows, years settle, and the mobile layout has no overflow.

## Task 7: Build the paddock section and calendar

**Files:** Modify `D:/www/devbaratji/index.html` markup, styles, and module.

- [ ] Add the light paddock section with masthead, race report, portrait, four stat rows, CTA, contour canvas, calendar cards, connectors, live-round bracket, and next-race semantic `<time datetime="2026-07-27">`.
- [ ] Use the supplied `cqw` frame constants for the 1440 design and the narrow variables for tablet/phone layouts.
- [ ] Implement marching-squares contour rendering, portrait bleed/parallax, stats reveals, card delays `560 + index * 90`, pulse `3200`, connector crawl `5200`, and bracket spread `5`.
- [ ] Use the supplied icon assets and expose an asset error for every failed image URL.
- [ ] Verify the section returns to light flow after the stack, the calendar bracket is on the live round, and the CTA keyboard/focus state is visible.

## Task 8: Build the footer/sign-off

**Files:** Modify `D:/www/devbaratji/index.html` markup, styles, and module.

- [ ] Add the cyan outer section, inset black panel, footer contour canvas, logo mask, headline, nav links, figure group, legal CTA, copyright, and socials.
- [ ] Render the body and helmet plates with the exact height shares, aspect ratios, suit mask gradient, 60px figure parallax, and single-group transform behavior.
- [ ] Implement nav letter reveals at `260 + index * 80`, footer delays `640/720/800`, hover accent states, mobile full-width rows, and bottom-row anchoring.
- [ ] Add the supplied CTA and arrow paths as inline SVG so the footer remains single-file and preserves the chamfer geometry.
- [ ] Verify the footer rests in-frame at the bottom, the figure is hidden below `sm`, and mobile navigation/socials/CTA match the specified stack.

## Task 9: Integrate accessibility and failure states

**Files:** Modify `D:/www/devbaratji/index.html`.

- [ ] Confirm there is exactly one `h1`, one `h2` for every section, labeled primary navigation, plain accessible text for every animated reveal, decorative images/canvases marked hidden, and status semantics for loading/errors.
- [ ] Confirm all links have usable destinations, focus-visible styles, menu keyboard behavior, and the mobile dialog does not trap the page in an open state after Escape.
- [ ] Add a non-color failure treatment for asset banners and keep error text concise but URL-specific.
- [ ] Run a DOM audit in the browser console for heading counts, hidden reveal copies, dialog attributes, and missing `alt` values.

## Task 10: End-to-end verification and delivery

**Files:** Verify `D:/www/devbaratji/index.html`; do not introduce runtime files.

- [ ] Run `git diff --check` and a static scan for accidental extra files, placeholder markers, broken local paths, and forbidden animation libraries.
- [ ] Open the file in a browser at desktop, tablet, and phone viewport sizes; verify initial scroll position, loader, nav, stack, season map, timeline, paddock, footer, and mobile menu.
- [ ] Test with reduced motion enabled and with pointer hover unavailable; verify effects degrade as specified without layout failure.
- [ ] Force at least one missing remote asset URL and verify the visible failure banner appears while the remaining page stays usable.
- [ ] Capture a final browser screenshot/console state and run `git status --short` to confirm only the approved spec, plan, and `index.html` are present.
- [ ] Commit the completed deliverable with `git add index.html docs/superpowers/plans/2026-10-14-kimi-grido1-implementation-plan.md` followed by `git commit -m "feat: recreate Kimi GRID01 racing site"`.
