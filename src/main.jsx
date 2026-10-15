import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import Lenis from "lenis";
import "./styles.css";

const portrait = "/assets/generated/devbarat-hero-cutout-v2.png";
const aboutPortrait = "/assets/generated/devbarat-about-cutout-v2.png";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Project"],
  ["skills", "Skill"],
  ["contact", "Contact me"],
  ["work-with-me", "Work with me"],
];

const projects = [
  {
    number: "01",
    title: "KlipifyAI",
    category: "AI product / workflow",
    description: "A practical AI product shaped around clearer content workflows and useful output.",
    image: "/assets/people/devbarat-caption-thumbnail.jpg",
    href: "https://klipifyai.com/",
    tags: ["Product direction", "AI workflows"],
  },
  {
    number: "02",
    title: "iSoftro",
    category: "Business systems / product",
    description: "Software systems that turn messy business processes into tools people can actually use.",
    image: "/assets/people/devbarat-building-thumbnail.jpg",
    href: "https://isoftro.com/",
    tags: ["Systems thinking", "Automation"],
  },
  {
    number: "03",
    title: "Selected systems",
    category: "Web / experiments",
    description: "Interfaces, automations, and experiments assembled in public as the work keeps moving.",
    image: "/assets/generated/devbarat-cyan-motion.png",
    href: "https://github.com/devbaratnp",
    tags: ["Frontend", "Open source"],
  },
];

const skills = ["Frontend", "AI workflows", "SaaS", "Automation", "Product design", "Business systems"];

function useSectionObserver() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-scene-section]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-8% 0px -8%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function useReveal() {
  useEffect(() => {
    const items = [...document.querySelectorAll(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1, rootMargin: "0px 0px -10%" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function usePointerField() {
  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--pointer-xp", `${(event.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--pointer-yp", `${(event.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

function CinematicCanvas({ activeSection }) {
  const canvasRef = useRef(null);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "high-performance" })
        || canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "high-performance" });
      if (!context) {
        canvas.classList.add("is-unavailable");
        return undefined;
      }
      renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (error) {
      canvas.classList.add("is-unavailable");
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const root = new THREE.Group();
    scene.add(root);

    const textureLoader = new THREE.TextureLoader();
    const atmosphereTexture = textureLoader.load("/assets/generated/devbarat-hero-atmosphere.png");
    atmosphereTexture.colorSpace = THREE.SRGBColorSpace;
    const portraitTexture = textureLoader.load(portrait);
    portraitTexture.colorSpace = THREE.SRGBColorSpace;

    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(15, 15),
      new THREE.MeshBasicMaterial({ map: atmosphereTexture, transparent: true, opacity: 0.36, depthWrite: false }),
    );
    backdrop.position.set(0.3, 0.2, -3.5);
    root.add(backdrop);

    const portraitMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.95, 5.25),
      new THREE.MeshBasicMaterial({ map: portraitTexture, transparent: true, opacity: 0.96, depthWrite: false, side: THREE.DoubleSide }),
    );
    portraitMesh.position.set(0.95, -0.2, 0.65);
    root.add(portraitMesh);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(2.15, 2.19, 96),
      new THREE.MeshBasicMaterial({ color: 0x77e4ff, transparent: true, opacity: 0.58, depthWrite: false, side: THREE.DoubleSide }),
    );
    halo.position.set(0.82, -0.28, 0.1);
    halo.scale.set(1, 1.1, 1);
    root.add(halo);

    const innerHalo = new THREE.Mesh(
      new THREE.RingGeometry(1.88, 1.885, 96),
      new THREE.MeshBasicMaterial({ color: 0xf1a858, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }),
    );
    innerHalo.position.set(0.82, -0.28, 0.13);
    root.add(innerHalo);

    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 11, 32, 22),
      new THREE.MeshBasicMaterial({ color: 0x75dff4, wireframe: true, transparent: true, opacity: 0.11, depthWrite: false }),
    );
    grid.position.set(0, -1.7, -2.1);
    grid.rotation.x = -0.1;
    root.add(grid);

    const beam = new THREE.Mesh(
      new THREE.PlaneGeometry(0.015, 10),
      new THREE.MeshBasicMaterial({ color: 0x9ceeff, transparent: true, opacity: 0.28, depthWrite: false }),
    );
    beam.position.set(-2.1, 0, 0.15);
    beam.rotation.z = -0.25;
    root.add(beam);

    const particleCount = 360;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color(0x9aefff);
    const amber = new THREE.Color(0xf0a95a);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.2 + Math.random() * 5.4;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.7;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.65 + (Math.random() - 0.5) * 1.8;
      positions[i * 3 + 2] = -1.8 + Math.random() * 2.1;
      const color = i % 5 === 0 ? amber : cyan;
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ size: 0.026, vertexColors: true, transparent: true, opacity: 0.74, depthWrite: false, sizeAttenuation: true }),
    );
    root.add(particles);

    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const onPointerMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const lenis = new Lenis({ autoRaf: false, lerp: 0.085, smoothWheel: true, syncTouch: false });
    let frameId = 0;
    let elapsed = 0;
    let lastTime = performance.now();
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const mobile = width < 700;
      portraitMesh.position.x = mobile ? 0.45 : 0.95;
      portraitMesh.scale.setScalar(mobile ? 0.83 : 1);
      halo.position.x = mobile ? 0.36 : 0.82;
      innerHalo.position.x = mobile ? 0.36 : 0.82;
    };
    resize();
    window.addEventListener("resize", resize);

    const sceneColor = new THREE.Color(0x77e4ff);
    const tick = (time) => {
      frameId = window.requestAnimationFrame(tick);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += delta;
      lenis.raf(time);
      mouse.lerp(targetMouse, reducedMotion ? 1 : 0.045);
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scroll = window.scrollY / scrollRange;
      const currentSection = activeSectionRef.current;
      const homeIntensity = currentSection === "home" ? 1 : currentSection === "about" ? 0.72 : currentSection === "projects" ? 0.26 : currentSection === "skills" ? 0.18 : 0.34;
      const targetColor = currentSection === "contact" || currentSection === "work-with-me" ? 0xf0a95a : 0x77e4ff;
      sceneColor.lerp(new THREE.Color(targetColor), 0.025);

      root.rotation.y += (mouse.x * 0.075 - root.rotation.y) * 0.035;
      root.rotation.x += (-mouse.y * 0.035 - root.rotation.x) * 0.035;
      root.position.x += (mouse.x * 0.22 - root.position.x) * 0.03;
      root.position.y += (mouse.y * 0.14 - root.position.y) * 0.03;
      camera.position.x += (mouse.x * 0.22 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 0.14 - camera.position.y) * 0.025;
      camera.position.z += ((8.5 - scroll * 0.9) - camera.position.z) * 0.022;

      portraitMesh.material.opacity += (0.96 * homeIntensity - portraitMesh.material.opacity) * 0.035;
      backdrop.material.opacity += (0.36 * (0.55 + homeIntensity * 0.55) - backdrop.material.opacity) * 0.035;
      halo.material.opacity += ((0.18 + homeIntensity * 0.42) - halo.material.opacity) * 0.035;
      halo.rotation.z = elapsed * 0.035 + scroll * 0.8;
      innerHalo.rotation.z = -elapsed * 0.07 - scroll * 0.6;
      grid.rotation.z = Math.sin(elapsed * 0.12) * 0.02;
      grid.position.y = -1.7 - scroll * 0.6;
      beam.position.x = -2.1 + Math.sin(elapsed * 0.28) * 0.7 + mouse.x * 0.3;
      particles.rotation.z = elapsed * 0.012 + scroll * 0.28;
      particles.material.opacity = 0.28 + homeIntensity * 0.48;
      halo.material.color.lerp(sceneColor, 0.05);
      innerHalo.material.color.lerp(new THREE.Color(targetColor), 0.04);
      grid.material.color.lerp(sceneColor, 0.04);

      renderer.render(scene, camera);
    };
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      lenis.destroy();
      particleGeometry.dispose();
      renderer.dispose();
      [backdrop, portraitMesh, halo, innerHalo, grid, beam].forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      atmosphereTexture.dispose();
      portraitTexture.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="global-canvas" aria-hidden="true" />;
}

function Header({ activeSection, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Devbarat Prasad Patel home">
        <span>DP</span>
        <small>devbarat / systems</small>
      </a>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
        {navItems.map(([id, label], index) => (
          <a key={id} className={activeSection === id ? "is-active" : ""} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </nav>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? "Close" : "Index"}</span><i aria-hidden="true" />
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="chapter hero-chapter" data-scene-section>
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="chapter-inner hero-inner">
        <div className="hero-meta reveal">
          <span className="eyebrow">01 / home</span>
          <span className="coordinates">27° 00′ N<br />84° 52′ E / Nepal</span>
        </div>
        <div className="hero-copy reveal">
          <p className="eyebrow">Devbarat Prasad Patel</p>
          <h1>Build<br /><em>useful</em><br />things.</h1>
          <p className="hero-deck">Product builder, software maker, and systems thinker. I turn rough ideas into tools people can keep using.</p>
          <a className="signal-link" href="#work-with-me"><span>Work with me</span><b>↗</b></a>
        </div>
        <div className="hero-figure-note reveal">
          <span>Interactive portrait / plate 01</span>
          <span>Move your cursor</span>
        </div>
        <div className="hero-scroll"><span>Scroll to enter</span><i /></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="chapter about-chapter" data-scene-section>
      <div className="chapter-inner about-inner">
        <div className="section-index reveal"><span>02</span><span>about</span></div>
        <div className="about-copy reveal">
          <p className="eyebrow">A builder from Birgunj</p>
          <h2>Small teams.<br /><em>Clear systems.</em><br />Real momentum.</h2>
          <p className="body-copy">I work across product, frontend, AI, and operations. The common thread is simple: make the complicated part easier to see, then build the smallest useful system around it.</p>
          <div className="about-specs">
            <span><b>01</b> Product thinking</span>
            <span><b>02</b> Interface craft</span>
            <span><b>03</b> Practical automation</span>
          </div>
        </div>
        <div className="about-portrait reveal">
          <div className="portrait-grid" aria-hidden="true" />
          <img src={aboutPortrait} alt="Devbarat Prasad Patel in a black t-shirt" />
          <span className="portrait-caption">Identity plate / 02</span>
        </div>
        <div className="contour-copy" aria-hidden="true">01 — 02 — 03 — 04 — 05</div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, active, setActive }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setTilt({ x: y * -5, y: x * 7 });
    setActive(index);
  };
  return (
    <article
      className={`project-card project-card-${index + 1} ${active === index ? "is-active" : ""}`}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ "--rx": `${tilt.x}deg`, "--ry": `${tilt.y}deg` }}
    >
      <a href={project.href} target="_blank" rel="noreferrer" className="project-card-link" aria-label={`Open ${project.title}`}>
        <div className="project-card-head"><span>{project.number}</span><span>{project.category}</span></div>
        <div className="project-card-art">
          <img src={project.image} alt="" loading="lazy" />
          <span className="art-scan" />
          <span className="art-corner">LIVE / BUILD</span>
        </div>
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <span className="card-arrow">↗</span>
      </a>
    </article>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  return (
    <section id="projects" className="chapter projects-chapter" data-scene-section>
      <div className="chapter-inner projects-inner">
        <div className="projects-intro reveal">
          <div className="section-index"><span>03</span><span>project</span></div>
          <p className="eyebrow">Selected work / 2023—26</p>
          <h2>Made to<br /><em>move.</em></h2>
          <p className="body-copy">A few products and experiments where interface, business logic, and a little bit of nerve meet.</p>
          <a className="text-link" href="https://github.com/devbaratnp" target="_blank" rel="noreferrer">See the public work <span>↗</span></a>
        </div>
        <div className="project-stack reveal" onPointerLeave={() => setActive(0)}>
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} active={active} setActive={setActive} />)}
        </div>
        <div className="projects-footnote"><span>Hover the plates</span><span>Each card opens the live work ↗</span></div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="chapter skills-chapter" data-scene-section>
      <div className="chapter-inner skills-inner">
        <div className="section-index reveal"><span>04</span><span>skill</span></div>
        <div className="skills-copy reveal">
          <p className="eyebrow">The working stack</p>
          <h2>Many tools.<br /><em>One point of view.</em></h2>
          <p className="body-copy">I like the distance between an idea and the thing that ships to be short. That means knowing enough across the stack to keep decisions connected.</p>
        </div>
        <div className="skill-orbit reveal" aria-label="Devbarat skills">
          <div className="orbit-rail rail-a" /><div className="orbit-rail rail-b" /><div className="orbit-rail rail-c" />
          <div className="orbit-core"><span>craft</span><strong>systems</strong><small>DP / 04</small></div>
          {skills.map((skill, index) => <span key={skill} className="skill-node" style={{ "--angle": `${index * 60 - 15}deg`, "--radius": `${160 + (index % 2) * 30}px` }}>{skill}</span>)}
        </div>
        <div className="skill-list reveal">{skills.map((skill, index) => <div key={skill}><span>0{index + 1}</span><b>{skill}</b><i>↗</i></div>)}</div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="chapter contact-chapter" data-scene-section>
      <div className="chapter-inner contact-inner">
        <div className="section-index reveal"><span>05</span><span>contact me</span></div>
        <div className="contact-copy reveal">
          <p className="eyebrow">Open channel</p>
          <h2>Have a sharp<br /><em>problem?</em></h2>
          <p className="body-copy">Tell me what you’re trying to make, fix, or understand. The fastest way to reach me is through GitHub.</p>
          <a className="contact-button" href="https://github.com/devbaratnp" target="_blank" rel="noreferrer"><span>Start a conversation</span><b>↗</b></a>
        </div>
        <div className="contact-stamp reveal"><span>Birgunj</span><strong>NEPAL</strong><small>27° 00′ N / 84° 52′ E</small></div>
        <div className="contact-lines" aria-hidden="true"><span /><span /><span /><span /></div>
      </div>
    </section>
  );
}

function WorkWithMe() {
  return (
    <section id="work-with-me" className="chapter work-chapter" data-scene-section>
      <div className="chapter-inner work-inner">
        <div className="work-topline reveal"><span>06 / work with me</span><span>Next signal / yours</span></div>
        <div className="work-figure"><img src={portrait} alt="Devbarat Prasad Patel in a mustard knit polo" /></div>
        <div className="work-copy reveal">
          <p className="eyebrow">Let’s build the next useful thing</p>
          <h2>Bring the<br /><em>rough idea.</em></h2>
          <a className="signal-link" href="https://github.com/devbaratnp" target="_blank" rel="noreferrer"><span>Open GitHub</span><b>↗</b></a>
        </div>
        <footer className="site-footer"><span>© {new Date().getFullYear()} Devbarat Prasad Patel</span><span>Software / AI / systems / Nepal</span><a href="#home">Back to top ↑</a></footer>
      </div>
    </section>
  );
}

function App() {
  const activeSection = useSectionObserver();
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  usePointerField();

  useEffect(() => {
    document.body.dataset.scene = activeSection;
  }, [activeSection]);

  return (
    <div className={`app scene-${activeSection}`}>
      <CinematicCanvas activeSection={activeSection} />
      <div className="cursor-glow" aria-hidden="true" />
      <Header activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <WorkWithMe />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
