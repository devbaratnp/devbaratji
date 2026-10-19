import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const heroArtwork = "/assets/generated/devbarat-hero-editorial-v3.png";
const aboutPortrait = "/assets/generated/devbarat-about-cutout-v2.png";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["education", "Education"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

const projects = [
  {
    slug: "little-puma",
    title: "Little Puma",
    label: "CRM & retail operations",
    description: "A multi-channel sales and CRM platform with automated WhatsApp notifications and instant stock sync for a busy retail workflow.",
    image: "/assets/projects/little-puma.png",
    tone: "cobalt",
  },
  {
    slug: "santosh-guru",
    title: "Santosh Guru",
    label: "Booking & client portal",
    description: "A self-service consultation portal with timezone-aware booking, automated payments, and a client profile archive in one clear flow.",
    image: "/assets/projects/santosh-guru.png",
    tone: "orange",
  },
  {
    slug: "nishana-suppliers",
    title: "Nishana Suppliers",
    label: "B2B eCommerce & inventory",
    description: "A hybrid B2B and B2C commerce system with live inventory reservation, credit lines, and invoice generation for supplier operations.",
    image: "/assets/projects/nishana-suppliers.png",
    tone: "yellow",
  },
  {
    slug: "klipify-ai",
    title: "Klipify AI",
    label: "AI & media workflow",
    description: "A focused SaaS product that takes uploaded video through captioning, review, and publishing in one simple workspace.",
    image: "/assets/projects/klipify-ai.png",
    tone: "cobalt",
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Start with a question",
    description: "Good work usually starts with a small question: what is slow, confusing, or harder than it needs to be?",
  },
  {
    number: "02",
    title: "Learn by making",
    description: "I learn fastest when the lesson has somewhere to go: a prototype, a tool, or a real person trying it out.",
  },
  {
    number: "03",
    title: "Share the useful part",
    description: "Notes become tutorials, experiments become products, and the feedback makes the next build sharper.",
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/devbarat.p", icon: "ri-facebook-fill" },
  { label: "Instagram", href: "https://www.instagram.com/patel.jee6317/", icon: "ri-instagram-line" },
  { label: "GitHub", href: "https://github.com/devbaratnp", icon: "ri-github-line" },
];

function pageHref(page) {
  return page === "home" ? "/" : `/${page}`;
}

function getCurrentPage() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const segment = path.split("/").pop()?.replace(/\.html$/, "");
  return navItems.some(([id]) => id === segment) ? segment : "home";
}

function Arrow({ direction = "right" }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">→</span>;
}

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("has-js");
    const elements = [...document.querySelectorAll(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header({ activePage, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="wordmark" href={pageHref("home")} aria-label="Devbarat home" onClick={() => setMenuOpen(false)}>
        DEVBARAT
      </a>

      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
        {navItems.map(([id, label]) => (
          <a
            key={id}
            className={activePage === id ? "is-active" : ""}
            href={pageHref(id)}
            aria-current={activePage === id ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? "Close" : "Menu"}</span>
        <i aria-hidden="true"><span /><span /></i>
      </button>
    </header>
  );
}

function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <section className="home-section" aria-labelledby="home-title">
      <div className="hero-visual" aria-hidden="true">
        <img src={heroArtwork} alt="" fetchPriority="high" />
        <div className="hero-shade" />
      </div>

      <div className="page-shell home-shell">
        <div className="hero-copy reveal">
          <p className="eyebrow">Software builder · educator · creator</p>
          <h1 id="home-title">Build useful <span>things.</span></h1>
          <p className="hero-lede">I build practical software for people who need the next step to feel obvious.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={pageHref("projects")}>View projects <Arrow /></a>
            <a className="button button-outline" href={pageHref("about")}>How I work <Arrow /></a>
          </div>
          <div className="hero-footnote">
            <span className="status-dot" />
            <span>Based in Birgunj, Nepal</span>
            <span className="hero-rule" />
            <span>Working worldwide</span>
          </div>
        </div>

        <div className="hero-scroll reveal"><span>Scroll to see the work</span><i /></div>
      </div>

      <div className="home-proof-band">
        <div className="home-proof page-shell">
          <article className="home-proof-item reveal">
            <span className="home-proof-number">01</span>
            <div><h3>Product thinking</h3><p>Find the real problem before adding another feature.</p></div>
          </article>
          <article className="home-proof-item reveal">
            <span className="home-proof-number">02</span>
            <div><h3>Interface craft</h3><p>Make the useful path clear, calm, and easy to pick up.</p></div>
          </article>
          <article className="home-proof-item reveal">
            <span className="home-proof-number">03</span>
            <div><h3>Practical automation</h3><p>Remove repetitive work without adding a new layer of mystery.</p></div>
          </article>
        </div>
      </div>

      <div className="home-featured page-shell">
        <div className="home-section-head reveal">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Useful work, <em>out in the world.</em></h2>
          </div>
          <a className="inline-link" href={pageHref("projects")}>See all projects <Arrow /></a>
        </div>

        <div className="home-project-grid">
          {featuredProjects.map((project, index) => (
            <article className={`home-project home-project-${project.tone} reveal`} key={project.title}>
              <a className="home-project-image" href={`${pageHref("projects")}#${project.slug}`} aria-label={`View ${project.title} project`}>
                <img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" />
                <span>0{index + 1} <Arrow /></span>
              </a>
              <div className="home-project-copy">
                <p className="project-label">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="home-practice-band">
        <div className="home-practice page-shell">
          <div className="home-practice-label reveal">04 / Approach</div>
          <div className="home-practice-copy reveal">
            <h2>Make the complicated part <em>easier to use.</em></h2>
            <p>I work across product, frontend, AI, and operations. The goal is simple: understand the real problem, then build the smallest reliable system around it.</p>
            <a className="inline-link inline-link-light" href={pageHref("about")}>Read the full story <Arrow /></a>
          </div>
        </div>
      </div>

      <div className="home-cta page-shell reveal">
        <p className="section-kicker">05 / Next step</p>
        <div className="home-cta-content">
          <h2>Have an idea worth <em>building?</em></h2>
          <p className="body-copy">Start with the problem, even if the idea is still rough. A useful first conversation is enough.</p>
          <a className="button button-dark" href={pageHref("contact")}>Let&apos;s talk <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function PageHeading({ number, label, aside, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""} reveal`}>
      <p className="section-kicker">{number} / {label}</p>
      <span className="section-line" />
      <p className="section-aside">{aside}</p>
    </div>
  );
}

function About() {
  return (
    <section className="section-block about-section page-view" aria-labelledby="about-title">
      <div className="page-shell">
        <PageHeading number="01" label="About" aside="A practical way to build" />

        <div className="about-layout">
          <div className="about-copy reveal">
            <h2 id="about-title">Make the complicated part <em>easier to use.</em></h2>
            <p className="body-copy">I work across product, frontend, AI, and operations. My focus is simple: understand the real problem, then build the smallest reliable system around it.</p>
            <div className="about-tags">
              <span>Product thinking</span><span>Interface craft</span><span>Practical automation</span>
            </div>
          </div>

          <figure className="about-portrait reveal">
            <div className="portrait-accent portrait-accent-blue" />
            <div className="portrait-accent portrait-accent-orange" />
            <img src={aboutPortrait} alt="Devbarat Prasad Patel in a black t-shirt" loading="lazy" />
            <figcaption>Building from Birgunj, Nepal</figcaption>
          </figure>
        </div>

        <div className="about-story">
          <div className="about-story-intro reveal">
            <p className="section-kicker">About me</p>
            <h2>A builder who likes the first rough version.</h2>
          </div>
          <div className="about-story-copy reveal">
            <p>I&apos;m Devbarat Prasad Patel, a software builder, educator, and creator based in Birgunj, Nepal. I spend most of my time turning ideas into working software. That can mean designing a clear interface, connecting an API, building an AI workflow, improving a business process, or figuring out why a product feels harder to use than it should.</p>
            <p>My work sits between technology and people. I care about how something works behind the screen, but I also care about how it feels when someone uses it for the first time. A good product should make the next step obvious. It should remove confusion, save time, and give people enough confidence to keep going.</p>
            <p>I work across frontend development, product design, AI tools, business systems, and automation. I enjoy the early stage of a project, when the idea is still rough and the right questions have not been answered yet. That is usually where the most useful work begins.</p>
            <p>Some of my work includes KlipifyAI, a tool for creating captions and subtitles for multilingual video content, and iSoftro, where I work on websites, e-commerce systems, ERP, CRM, and business automations. I also build smaller experiments, test new tools, and share what I learn through my projects and content.</p>
            <p>Education is part of how I work. I learn by building, then try to explain the useful parts in a simple way. When I understand something better, I write about it, teach it, or turn it into a small working example. Teaching helps me slow down, question my assumptions, and make difficult ideas easier to understand.</p>
            <p>Being based in Birgunj has shaped the way I think about technology. I have seen how much work still happens through manual steps, scattered information, and tools that were never designed around the people using them. That keeps me interested in building software that feels clear, affordable, and useful in everyday work.</p>
            <p>I do not want to build software only to add another product to the internet. I want to make things that solve a real problem, help someone move faster, or make a complicated task feel manageable.</p>
            <p>I am still learning, still experimenting, and still building. Each project teaches me something about technology, communication, and the kind of work I want to do next.</p>
          </div>
        </div>

        <div className="principles-grid">
          {[
            ["01", "Understand first", "The right question usually saves more time than a clever solution."],
            ["02", "Make it clear", "Good software should feel calm, direct, and easy to pick up."],
            ["03", "Keep it moving", "Ship a useful version, learn from it, then make the next version better."],
          ].map(([number, title, text]) => (
            <article className="principle-card reveal" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section-block education-section page-view" aria-labelledby="education-title">
      <div className="education-grid page-shell">
        <div className="education-intro">
          <PageHeading number="02" label="Education" aside="Learning in public" light />
          <div className="reveal">
            <h1 id="education-title">Keep learning. <em>Keep building.</em></h1>
            <p className="body-copy">A living record of the questions, tools, and lessons that shape the work.</p>
          </div>
          <div className="education-note reveal"><span>Field note / 2026</span><p>“The best lessons are the ones that make the next build feel possible.”</p></div>
        </div>

        <div className="learning-list">
          {learningSteps.map((step) => (
            <article className="learning-step reveal" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h2>{step.title}</h2><p>{step.description}</p></div>
              <Arrow />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-block projects-section page-view" aria-labelledby="projects-title">
      <div className="page-shell">
        <PageHeading number="03" label="Projects" aside="Selected work from the agency portfolio" />
        <div className="projects-intro reveal">
          <h1 id="projects-title">Useful work, <em>out in the world.</em></h1>
          <p className="body-copy">Four projects from the agency portfolio, covering commerce, bookings, supplier operations, and an AI media workflow.</p>
        </div>

        <div className="project-grid project-grid-four">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${project.tone} reveal`} id={project.slug} key={project.title}>
              <div className="project-image">
                <img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" />
                <span className="project-index">0{index + 1}</span>
                <span className="project-open"><Arrow /></span>
              </div>
              <div className="project-copy">
                <p className="project-label">{project.label}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <a className="inline-link" href={pageHref("contact")}>Discuss a similar project <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Your name</span>
          <input type="text" name="name" placeholder="Name" autoComplete="name" required />
        </label>
        <label>
          <span>Email address</span>
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>What are you building?</span>
        <textarea name="message" rows="6" placeholder="Tell me a little about the idea, project, or problem." required />
      </label>
      <div className="form-footer">
        <button className="button button-dark" type="submit">Send message <Arrow /></button>
        {submitted && <p className="form-status" role="status">Thanks. This preview form is ready to connect to your email service.</p>}
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact-section section-block page-view" aria-labelledby="contact-title">
      <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
      <div className="page-shell contact-inner">
        <PageHeading number="04" label="Contact" aside="Open to useful conversations" light />
        <div className="contact-copy reveal">
          <h1 id="contact-title">Have an idea worth <em>building?</em></h1>
          <p className="body-copy">Tell me what you&apos;re trying to make, fix, or understand. Start with the problem, even if the idea is still rough.</p>
        </div>

        <div className="contact-layout">
          <ContactForm />
          <aside className="contact-sidebar reveal">
            <p className="section-kicker">Find me online</p>
            <p className="contact-sidebar-copy">I share projects, experiments, and everyday notes from the work across these spaces.</p>
            <div className="social-list">
              {socialLinks.map((link) => (
                <a className="social-link" key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <span className="social-icon"><i className={link.icon} aria-hidden="true" /></span>
                  <span>{link.label}</span>
                  <Arrow />
                </a>
              ))}
            </div>
            <a className="inline-link inline-link-light" href={pageHref("projects")}>Browse the projects <Arrow /></a>
          </aside>
        </div>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Devbarat Prasad Patel</span>
          <span>Software / AI / education / Nepal</span>
          <a href={pageHref("home")}>Back to home <Arrow direction="up" /></a>
        </footer>
      </div>
    </section>
  );
}

function App() {
  const activePage = getCurrentPage();
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  const page = {
    home: <Home />,
    about: <About />,
    education: <Education />,
    projects: <Projects />,
    contact: <Contact />,
  }[activePage] || <Home />;

  return (
    <div className={`app app-${activePage}`}>
      <Header activePage={activePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main">{page}</main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
