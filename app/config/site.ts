const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "gabriel.dev@email.com"

export const siteConfig = {
  contactEmail: email,
  links: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com",
    cv: process.env.NEXT_PUBLIC_CV_URL ?? "#",
  },
  forms: {
    formspreeEndpoint:
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xyzpozal",
  },
  backend: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3333/api",
    contactRoute: process.env.NEXT_PUBLIC_API_CONTACT_ROUTE ?? "/contact/messages",
    projectsRoute: process.env.NEXT_PUBLIC_API_PROJECTS_ROUTE ?? "/projects",
  },
  projects: {
    nexusLive: process.env.NEXT_PUBLIC_PROJECT_NEXUS_LIVE_URL ?? "https://example.com",
    nexusRepo: process.env.NEXT_PUBLIC_PROJECT_NEXUS_REPO_URL ?? "https://github.com",
    auroraLive: process.env.NEXT_PUBLIC_PROJECT_AURORA_LIVE_URL ?? "https://example.com",
    auroraRepo: process.env.NEXT_PUBLIC_PROJECT_AURORA_REPO_URL ?? "https://github.com",
    pulseLive: process.env.NEXT_PUBLIC_PROJECT_PULSE_LIVE_URL ?? "https://example.com",
    pulseRepo: process.env.NEXT_PUBLIC_PROJECT_PULSE_REPO_URL ?? "https://github.com",
  },
}

