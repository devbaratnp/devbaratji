# SEO fixes and deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Repair the portfolio's crawlability, metadata, structured data, image delivery, heading semantics, and contact conversion path, then build and deploy the verified result to `devbarat.com.np`.

**Architecture:** Keep the existing Vite React SPA and add a small route metadata layer in `src/main.jsx`. Add crawl files to `public/`, improve the Apache fallback and security rules in `public/.htaccess`, and keep the current visual system unchanged. Use a mailto-based contact fallback so the form does not pretend to send data without a configured backend.

**Tech Stack:** React 19, Vite, Apache/LiteSpeed `.htaccess`, JSON-LD, WebP image assets.

---

### Task 1: Add route metadata and JSON-LD

**Files:**
- Modify: `D:\www\devbaratji\index.html`
- Modify: `D:\www\devbaratji\src\main.jsx`

- [ ] Add route-specific title, description, canonical, Open Graph, Twitter, and JSON-LD updates on navigation and initial render.
- [ ] Add truthful `Person`, `WebSite`, and page schema with the existing social URLs.
- [ ] Change the About page's primary heading from `H2` to `H1`.
- [ ] Give the meaningful hero portrait a descriptive alt text.

### Task 2: Add crawl and security files

**Files:**
- Create: `D:\www\devbaratji\public\robots.txt`
- Create: `D:\www\devbaratji\public\sitemap.xml`
- Create: `D:\www\devbaratji\public\llms.txt`
- Modify: `D:\www\devbaratji\public\.htaccess`

- [ ] Expose valid plain-text robots directives and a five-route XML sitemap.
- [ ] Add a concise machine-readable site summary for AI crawlers.
- [ ] Prevent crawl files from entering the SPA fallback.
- [ ] Redirect HTTP to HTTPS and add safe security headers.

### Task 3: Reduce image transfer cost

**Files:**
- Create: optimized WebP copies of the hero and about images under `public/assets/optimized/`.
- Modify: `D:\www\devbaratji\src\main.jsx`

- [ ] Generate WebP versions for above-fold images.
- [ ] Use the optimized files with explicit dimensions and responsive loading hints.
- [ ] Keep project screenshot loading lazy and add dimensions to reduce layout shift.

### Task 4: Make contact submission honest and usable

**Files:**
- Modify: `D:\www\devbaratji\src\main.jsx`

- [ ] Preserve client-side validation.
- [ ] Build a `mailto:` fallback from the entered name, email, and message.
- [ ] Show a clear confirmation explaining that the user's email client will open.
- [ ] Add a visible privacy note without storing form data.

### Task 5: Verify and deploy

**Files:**
- Build output: `D:\www\devbaratji\dist\`

- [ ] Run `npm run build`.
- [ ] Verify the built route shell, robots, sitemap, llms, metadata, JSON-LD, and optimized images.
- [ ] Commit the changes on `main`.
- [ ] Upload the verified `dist` output to the cPanel document root `/home/ektamultp/devbarat.com.np`.
- [ ] Recheck the live routes, crawl files, HTTPS redirect, and contact behavior.
