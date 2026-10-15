# Devbarat cinematic portfolio design

## Intent

Create a single-page personal portfolio for Devbarat Prasad Patel that feels like a short cinematic film about a builder: deliberate pacing, strong typography, controlled motion, and a clear story from person to products to invitation.

The page should present Devbarat as a software builder, founder, and tech creator. It should help three audiences quickly understand the work:

- prospective software clients looking for practical systems,
- collaborators and developers looking for a product-minded builder,
- followers who know Devbarat through technology content.

The experience takes the cinematic pacing and visual confidence of the existing Kimi GRID01 prototype as inspiration, but uses an original visual language for Devbarat. It must not present invented clients, awards, metrics, or credentials.

## Design direction

The selected direction is a cinematic founder film.

The visual system is dark graphite, ink black, warm white, and electric cyan with restrained amber accents borrowed from the supplied portrait photography. Typography should combine a distinctive editorial display face with a clean technical sans-serif. The page should feel like a designed publication with a motion system, not a standard portfolio template.

Design dials:

- Design variance: 8/10. Use asymmetry, oversized type, layered images, and occasional grid breaks.
- Motion intensity: 7/10. Use an authored reveal sequence, scroll-linked depth, image drift, and purposeful hover states.
- Visual density: 4/10. Leave room around the main statements and let the imagery carry atmosphere.

## Page structure

### 1. Opening / hero

The page opens with a short loading treatment that resolves into a full-viewport hero. The supplied primary portrait anchors the composition. The background uses generated abstract assets: dark studio atmosphere, fine blueprint lines, soft cyan light, and restrained digital fragments. The subject remains readable and the background never competes with the face.

Hero copy:

> Devbarat Prasad Patel
> I build software that moves real work forward.

Supporting line: software builder, founder, and tech creator from Birgunj, Nepal.

The hero includes a small scroll cue and a compact navigation surface for Work, About, and Connect.

### 2. Builder statement

A chapter transition turns the hero into a text-led statement about turning rough business problems into working software. The copy is based on the public GitHub profile and can be edited from one content object in the page script.

Use a split layout: statement on the left, a generated technical texture and a secondary supplied portrait on the right. The section should still make sense when motion is disabled.

### 3. Work / product chapters

Present the work as a vertical sequence of cinematic chapters rather than a uniform card grid:

- KlipifyAI: AI captioning and subtitle workflows for English, Nepali, Hindi, and mixed Nepali-English video.
- iSoftro: practical software delivery for websites, e-commerce, ERP, CRM, dashboards, business automation, and client systems.
- Selected systems: iSoftro ERP, GymSathi, ChatBot Nepal, Santosh Guru, Palika Sanchaar, and related operational tools.

Each chapter has a large title, one short description, service or product tags, a supplied image or generated atmosphere, and a clear external link when one is available. Avoid fabricated screenshots; when a product screenshot is not supplied, use abstract generated visuals and label the work through text.

### 4. Creator / learning chapter

Use the supplied thumbnail images as a small editorial wall for Grow With Devbarat. The chapter explains that Devbarat shares practical content about AI, coding, web development, freelancing, product building, automation, SaaS, and the student-to-developer journey.

The image wall should behave like a film strip: staggered columns on desktop, an ordered horizontal or vertical stack on small screens.

### 5. About / approach

Use a quieter section with the black-shirt portrait and a short working philosophy:

1. Understand the real problem.
2. Design the right workflow.
3. Build the simplest reliable system.
4. Test it with real users.
5. Improve it from feedback.

The section also includes selected technical areas from the GitHub profile, such as PHP/Laravel, MySQL/MariaDB, Python/FastAPI, REST APIs, Next.js, responsive interfaces, deployment, and AI-assisted development.

### 6. Contact / closing frame

End with a high-contrast closing frame: “Have a useful problem to build?” Include links to GitHub, iSoftro, KlipifyAI, and the creator handle. Use business contact details only if they are confirmed for public display during implementation.

## Assets

### Supplied assets

Use the six attached images as identity references and editorial content:

- the circular yellow/blue portrait as the primary hero portrait,
- the three square AI/content thumbnails as the creator wall,
- the two black-shirt portraits as secondary portrait options.

The original files should be copied into a project-local `assets/people` directory and referenced with stable filenames. Do not overwrite the originals.

### Generated assets

Use the built-in image generation tool to create project-bound atmospheric assets in `assets/generated`:

- one wide hero atmosphere with negative space for type,
- one dark blueprint / technical texture,
- one abstract cyan motion-light asset for the product chapters,
- one warm editorial background for the creator section.

Generated imagery must contain no fake UI copy, logos, awards, client names, or identifiable people. It should support layout and mood, not claim product evidence.

## Interaction and motion

- Run a short staged intro: color field, title, image, then navigation.
- Add scroll-linked section progress and depth movement, with restrained parallax on supplied portraits and generated backgrounds.
- Use a sticky chapter frame for the main work sequence, but keep the content reachable with normal scrolling.
- Use hover and focus states that reveal metadata or nudge imagery, never essential information only available through hover.
- Respect `prefers-reduced-motion`; in that mode use fades and immediate layout changes, with no continuous animation or scroll hijacking.
- Keep touch interaction simple on mobile. The cinematic rhythm should come from typography, image ordering, and short transitions rather than a heavy 3D scene.

## Technical shape

Build a portable static site with one entry HTML file, local assets, and no server requirement. Use native HTML, CSS, and JavaScript. External font and library requests may be progressive enhancements, but the page must retain a complete static fallback if they fail.

Keep content in a small JavaScript data object so project names, descriptions, links, and contact details can be updated without rewriting layout logic. Use semantic landmarks, one `h1`, keyboard-accessible controls, meaningful alt text, visible focus states, and a skip link.

## Performance and failure behavior

- Prefer modern compressed image formats for generated assets and responsive image sizing for supplied photographs.
- Lazy-load below-the-fold imagery while keeping the primary portrait eager.
- Avoid a blank page while dynamic effects or fonts load. The static hero and all copy must render first.
- If generated assets are unavailable, fall back to CSS gradients, noise, and the supplied portraits.
- If JavaScript fails, the content remains readable as a normal single-page document.

## Validation

Before handoff, verify:

- the page serves locally and renders at desktop and mobile widths,
- the intro resolves without blocking content,
- navigation anchors and external links work,
- the reduced-motion path removes continuous or scroll-linked motion,
- the supplied images have meaningful alt text and do not distort faces,
- the generated assets contain no unwanted text or watermarks,
- the page has one `h1`, logical heading order, keyboard focus, and visible contrast,
- `git diff --check` passes and the final working tree is understandable.

## Content source

Public source of truth: [Devbarat Prasad Patel on GitHub](https://github.com/devbaratnp). Product references can link to [iSoftro](https://isoftro.com/) and [KlipifyAI](https://klipifyai.com/). Any claim not present in those sources or supplied directly by Devbarat should be omitted until confirmed.
