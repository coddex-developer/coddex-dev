const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "gabriel.dev@email.com"
const contactChannels = (
  process.env.NEXT_PUBLIC_CONTACT_CHANNELS ?? "email,linkedin,github,instagram"
)
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)

export const siteConfig = {
  contactEmail: email,
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+55 (11) 99999-9999",
  contactWhatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "5511999999999",
  links: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com",
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL ??
      "https://wa.me/5511999999999?text=Oi%2C%20quero%20falar%20sobre%20um%20projeto.",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
    behance: process.env.NEXT_PUBLIC_BEHANCE_URL ?? "",
    dribbble: process.env.NEXT_PUBLIC_DRIBBBLE_URL ?? "",
    cookiePolicy: process.env.NEXT_PUBLIC_COOKIE_POLICY_URL ?? "#",
    cv: process.env.NEXT_PUBLIC_CV_URL ?? "#",
  },
  contactChannels,
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
