# Devbarat cinematic portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Kimi prototype on `master` with a cinematic, static Devbarat Prasad Patel portfolio using the supplied photographs, generated atmospheric assets, and verified public profile content.

**Architecture:** Keep one portable `index.html` with semantic sections, CSS variables, a small `siteContent` object, and a progressive-enhancement module. Store supplied photographs under `assets/people` and generated atmospheres under `assets/generated`. The static HTML remains readable if JavaScript, fonts, or generated images fail.

**Tech Stack:** Native HTML, CSS, JavaScript modules, Google Fonts as an optional enhancement, built-in image generation, PowerShell, Node.js static checks, and local browser verification.

---

## Files and responsibilities

- Modify: `index.html` — complete Devbarat portfolio markup, styling, content object, interactions, reduced-motion behavior, and fallback effects.
- Create: `assets/people/devbarat-hero.jpg` — primary supplied portrait.
- Create: `assets/people/devbarat-caption-thumbnail.jpg` — creator thumbnail.
- Create: `assets/people/devbarat-ai-skills-thumbnail.jpg` — creator thumbnail.
- Create: `assets/people/devbarat-building-thumbnail.jpg` — creator thumbnail.
- Create: `assets/people/devbarat-black-shirt-01.jpg` — secondary portrait.
- Create: `assets/people/devbarat-black-shirt-02.jpg` — secondary portrait.
- Create: `assets/generated/devbarat-hero-atmosphere.png` — wide generated hero atmosphere.
- Create: `assets/generated/devbarat-blueprint-texture.png` — technical background texture.
- Create: `assets/generated/devbarat-cyan-motion.png` — product-chapter atmosphere.
- Create: `assets/generated/devbarat-editorial-warm.png` — creator-section atmosphere.
- Modify: `docs/superpowers/plans/2026-10-15-devbarat-cinematic-portfolio.md` — check off completed steps as execution proceeds.

## Task 1: Prepare the supplied images

**Files:** Create the six files under `assets/people/` listed above.

- [ ] Create `assets/people` and `assets/generated` on `master`.

Run:

```powershell
New-Item -ItemType Directory -Force -Path assets/people, assets/generated
```

Expected: both directories exist and are empty.

- [ ] Copy the six attached images without overwriting the originals.

```powershell
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-837c3043-99fa-493f-abaf-cff783b4771b.jpg' 'assets/people/devbarat-hero.jpg'
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-8368df2a-310a-4e4d-a56a-34234c4c8446.jpg' 'assets/people/devbarat-caption-thumbnail.jpg'
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-a3cdcabc-abc6-462c-9019-6a99a8657ac7.jpg' 'assets/people/devbarat-ai-skills-thumbnail.jpg'
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-96b2c223-2475-4ee2-92e4-eb0eefbb8839.jpg' 'assets/people/devbarat-building-thumbnail.jpg'
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-55eb3333-6f21-45bb-915b-e56daa94b88b.jpg' 'assets/people/devbarat-black-shirt-01.jpg'
Copy-Item 'C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-39fc9c2e-0c8f-4239-b5af-eb5beea38be1.jpg' 'assets/people/devbarat-black-shirt-02.jpg'
```

Expected: six JPEG files exist and none is zero bytes.

- [ ] Verify the image files before layout work.

```powershell
Get-ChildItem assets/people | Select-Object Name,Length
```

Expected: six named JPEGs with positive lengths.

- [ ] Commit the asset import.

```powershell
git add assets/people
git commit -m "assets: add Devbarat supplied photography"
```

## Task 2: Generate project-bound atmospheres

**Files:** Create four PNG files under `assets/generated/`.

- [ ] Generate a wide hero atmosphere with no people, logos, UI copy, or watermark. Use a dark graphite studio field with cyan light trails, subtle blueprint lines, and usable negative space toward the upper-left for hero typography.
- [ ] Generate a dark blueprint texture with fine technical linework, matte paper grain, and no text.
- [ ] Generate a cyan motion-light composition for the product chapters with abstract glass, light, and depth, with no interface labels.
- [ ] Generate a warm editorial texture for the creator chapter with amber light, paper grain, and dark shadows, with no people or text.

Each built-in image-generation result must be copied into its named workspace path. Inspect each output for unwanted words, logos, watermarks, extra people, and harsh contrast before using it.

- [ ] Commit the generated visual assets.

```powershell
git add assets/generated
git commit -m "assets: add cinematic portfolio atmospheres"
```

## Task 3: Build semantic page structure and content

**File:** Modify `index.html`.

- [ ] Replace the Kimi page markup with a semantic document containing `skip-link`, `header`, `nav`, `main`, `section#work`, `section#about`, `section#creator`, and `footer#connect`.
- [ ] Keep exactly one `h1`, with the text `Devbarat Prasad Patel`.
- [ ] Add the hero statement, builder statement, product chapters, creator wall, approach list, and closing invitation from the approved spec.
- [ ] Add a `siteContent` object with editable data for product names, descriptions, tags, URLs, creator links, and contact visibility.
- [ ] Use local image paths for all supplied and generated assets, and write alt text that describes the visible subject or marks decorative atmosphere as empty alt text.
- [ ] Link only to verified public destinations: GitHub, iSoftro, KlipifyAI, and the creator handle where a URL is available.

## Task 4: Implement the visual system and cinematic motion

**File:** Modify `index.html`.

- [ ] Define CSS variables for graphite, ink, warm white, cyan, amber, borders, content width, and easing.
- [ ] Use a distinctive editorial display font paired with a technical sans-serif, with a local/system fallback stack so typography remains readable when remote fonts fail.
- [ ] Build the hero with layered atmosphere, portrait treatment, oversized type, chapter index, and a scroll cue.
- [ ] Build the product sequence with sticky framing, section progress, large chapter numbers, image depth, and external-link affordances.
- [ ] Build the creator wall as staggered editorial tiles on desktop and ordered stacked tiles on mobile.
- [ ] Add a short intro state that cannot block content longer than 1.2 seconds and is skipped when the user prefers reduced motion.
- [ ] Add pointer and scroll interactions only as progressive enhancement. `prefers-reduced-motion: reduce` must disable continuous animation, parallax, and scroll-linked transforms.
- [ ] Ensure focus rings, button labels, skip link, and contrast remain visible on the dark palette.

## Task 5: Add fallback behavior and responsive rules

**File:** Modify `index.html`.

- [ ] Use CSS gradients and grain overlays when a generated image fails to load.
- [ ] Keep all copy and links visible if JavaScript fails.
- [ ] Keep the primary portrait eager and load below-the-fold images lazily.
- [ ] At widths below 760px, switch the hero to a vertical composition, remove sticky work behavior, make the creator wall a single readable column, and keep touch targets at least 44px tall.
- [ ] At widths below 520px, clamp display type to prevent horizontal overflow and ensure the portrait crop keeps the face visible.

## Task 6: Validate the page locally

**Files:** `index.html`, `assets/people/*`, `assets/generated/*`.

- [ ] Run a static syntax and structure check.

```powershell
node --check .\index.html
```

Expected: if the document contains an inline module, extract the module first and run `node --check` against the extracted JavaScript; the check reports no syntax errors.

- [ ] Run repository hygiene checks.

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only intended files are changed.

- [ ] Serve the site locally.

```powershell
python -m http.server 4173
```

Expected: `http://127.0.0.1:4173/` returns status 200 and includes `Devbarat Prasad Patel`.

- [ ] Verify desktop browser behavior: intro resolves, hero renders, nav anchors scroll, product chapters progress, image wall renders, external links open, and closing CTA is reachable.
- [ ] Verify mobile browser behavior at a narrow viewport: no horizontal overflow, portrait face remains visible, menu or nav remains usable, and sections remain readable.
- [ ] Verify reduced motion by enabling the browser reduced-motion emulation or evaluating the media query path; continuous transforms and auto-running loops must not run.

## Task 7: Commit and push the completed main branch

- [ ] Review the final diff and commit the implementation.

```powershell
git add index.html assets docs/superpowers/plans/2026-10-15-devbarat-cinematic-portfolio.md
git commit -m "feat: build Devbarat cinematic portfolio"
```

- [ ] Push `master` to the already configured GitHub remote.

```powershell
git push origin master
```

- [ ] Confirm the remote and final branch state.

```powershell
git remote -v
git status --short --branch
gh repo view devbaratnp/devbaratji --json nameWithOwner,url,defaultBranchRef
```

Expected: `master` tracks `origin/master`, the working tree is clean, and GitHub reports `devbaratnp/devbaratji`.
