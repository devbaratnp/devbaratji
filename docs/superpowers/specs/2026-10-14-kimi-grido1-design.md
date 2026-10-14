# KIMI — GRID01 Racing Systems / Kimi Antonelli

## Goal

Create a single self-contained `index.html` that faithfully recreates the supplied GRID01/Kimi Antonelli one-page driver site brief. The page must preserve the brief's copy, section order, palette, typography, asset references, responsive behavior, accessibility requirements, and specified motion choreography. It must run without a build step and use only inline HTML/CSS/JavaScript plus the permitted Three.js and Lenis import-map dependencies.

## Chosen approach

Use the full interaction-heavy single-file implementation. All visual content remains portable inside one HTML document while the supplied remote asset bucket is referenced through one `ASSET_BASE_URL` constant. The implementation will include a real Three.js hero scene, custom motion primitives, canvas-based map/contour effects, and the supplied fallback behavior. A local asset mirror is intentionally out of scope because it would violate the single-file delivery constraint.

## Page architecture

The DOM contains one accessible page header and five accessible sections:

1. Hero / driver identity.
2. Season so far.
3. From karts to F1 timeline.
4. From the paddock.
5. Keep pushing forward footer.

The first three sections live inside a relative sticky-stack shell. Hero and Season are sticky layers that recede under the next layer; Timeline is the final non-receding layer. Paddock and Footer return to ordinary document flow.

The inline module owns a reference-counted rAF ticker. Lenis registers first when motion is allowed. Other subscribers include spring updates, scroll triggers, canvases, hero scene rendering, and footer figure parallax. The module exposes small internal primitives for:

- damped springs with fixed configs and delay-in behavior;
- word and letter text reveals;
- in-view gates and visible-loop observers;
- scrub/toggle scroll triggers;
- sticky-stack receding;
- asset loading and visible error reporting.

## Visual and motion behavior

### Hero

Use the remote portrait diffuse/depth/alpha/normal maps, Draco-compressed helmet GLB, HDR studio environment, and repeat-wrapped noise texture. The loader veil uses the helmet mask, lifts after the scene is ready, and exposes the entrance sequence. The scene supports the cursor-path liquid helmet reveal, backdrop shadow, wireframe scan, cursor-biased relighting, contour lines, responsive fallbacks, and reduced-motion behavior described in the source brief. Text, nav, panels, stats, trailer cue, and footer row use the given reveal delays and spring configs.

### Season

Use the dark near-black surface, chequered transition seam, map halftone, grid axes, hub rings, ping, track ribbon, clockwise six-second circuit draw, markers, rest-state lap, and pointer reticle. The section remains the first dark surface in the sticky stack and follows the supplied 1440-frame/responsive root sizing rules.

### Timeline

Render the seven supplied year photographs as stepped-corner plates with three parallax layers, center rail, progress thread, square marker, letter-assembled years, resting opacity, staggered in-view rows, and hover dimming. Preserve the mobile column layout and alternating plate behavior.

### Paddock

Render the light section with a 96px masthead, report copy, chamfered CTA, bleeding portrait, contour canvas, five-round calendar strip, crawling dashed connectors, live-round bracket, pulse, and responsive phone stack. Use the supplied geometry constants and `cqw` frame sizing.

### Footer

Render the cyan outer edge and inset near-black panel with white contour field, logo mask, keep-pushing masthead, letter-resolving nav, two-plate helmet/suit figure, bottom legal row, CTA, and socials. The figure moves as a single group through the footer's `bottom bottom` parallax window.

## Responsive and accessibility rules

Implement the specified root font-size bands, 1440-frame `cqw` geometry, Tailwind-like breakpoints, `short` landscape rule, phone layout changes, coarse-pointer/touch behavior, and `prefers-reduced-motion`. Provide one `h1`, one `h2` per section, accessible plain text copies for animated text, hidden decorative imagery, canvas labels via `aria-hidden`, status semantics for the loader veil, a primary nav label, dialog semantics for the mobile menu, keyboard Escape close handling, and a semantic `time` for the next race date.

## Failure handling

Every scene asset load and every section image load must surface a visible banner that names the failed URL. If WebGL or the 3D scene is unavailable, render the supplied contour SVG and portrait fallback, and lift the veil immediately. Asset failures must never leave an apparently finished but empty stage.

## Verification

Verification will include:

- static inspection that the deliverable is exactly one standalone `index.html` with no build-only imports;
- browser parsing/preview at desktop and narrow viewport sizes;
- checking initial scroll position, loader dismissal, sticky stack, section navigation, menu keyboard behavior, reduced-motion behavior, and visible asset errors;
- checking the final file for missing referenced resources, unclosed markup, and JavaScript parse errors.

## Explicit scope exclusions

No framework, bundler, server-side code, external animation library, local asset mirror, or separate CSS/JS file will be introduced. The only external code imports are Three.js, its listed addons, Lenis, and the specified Google Fonts.
