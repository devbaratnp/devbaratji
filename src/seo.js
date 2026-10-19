export const siteUrl = "https://devbarat.com.np";
export const siteName = "Devbarat";
export const socialUrls = [
  "https://www.facebook.com/devbarat.p",
  "https://www.instagram.com/patel.jee6317/",
  "https://github.com/devbaratnp",
];

const defaultImage = "/assets/optimized/devbarat-hero-editorial-v3.webp";

export const seoPages = {
  home: {
    path: "/",
    title: "Devbarat | Software Builder, Educator and Creator",
    description: "Devbarat Prasad Patel is a software builder, educator, and creator from Birgunj, Nepal, building practical products, interfaces, AI workflows, and business automation.",
    image: defaultImage,
    type: "ProfilePage",
  },
  about: {
    path: "/about",
    title: "About Devbarat Prasad Patel | Software Builder in Nepal",
    description: "Learn how Devbarat Prasad Patel works across frontend development, product design, AI tools, education, and business automation from Birgunj, Nepal.",
    image: "/assets/optimized/devbarat-about-cutout-v2.webp",
    type: "ProfilePage",
  },
  education: {
    path: "/education",
    title: "Learning and Education | Devbarat",
    description: "Notes on learning by building, explaining useful ideas, and turning practical software lessons into tools, tutorials, and experiments.",
    image: "/assets/optimized/devbarat-blueprint-texture.webp",
    type: "WebPage",
  },
  projects: {
    path: "/projects",
    title: "Software Projects | Devbarat",
    description: "Explore Devbarat's software projects across commerce, bookings, supplier operations, CRM, and AI-powered media workflows.",
    image: "/assets/projects/little-puma.webp",
    type: "CollectionPage",
  },
  contact: {
    path: "/contact",
    title: "Contact Devbarat | Let’s Build Something Useful",
    description: "Tell Devbarat what you are trying to make, fix, or understand. Start a conversation about software, AI, frontend, or business automation.",
    image: defaultImage,
    type: "ContactPage",
  },
};

export function getSeoPage(page = "home") {
  return seoPages[page] || seoPages.home;
}

export function absoluteUrl(path) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function buildStructuredData(page = "home") {
  const metadata = getSeoPage(page);
  const pageUrl = absoluteUrl(metadata.path);
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Devbarat Prasad Patel",
        url: siteUrl,
        image: absoluteUrl("/assets/optimized/devbarat-about-cutout-v2.webp"),
        jobTitle: "Software builder, educator, and creator",
        description: "Software builder, educator, and creator from Birgunj, Nepal.",
        homeLocation: {
          "@type": "Place",
          name: "Birgunj, Nepal",
        },
        sameAs: socialUrls,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: seoPages.home.description,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": metadata.type,
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: metadata.title,
        description: metadata.description,
        image: absoluteUrl(metadata.image),
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en",
      },
      ...(page === "home" ? [] : [{
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: metadata.title.split("|")[0].trim(), item: pageUrl },
        ],
      }]),
    ],
  };
}
