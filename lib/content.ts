export type NavItem = { label: string; href: string };
export type CardItem = { icon: string; title: string; body: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" }
];

export const features: CardItem[] = [
  { icon: "◇", title: "Innovative Design", body: "Beautiful, modern, and user-focused systems crafted for memorable first impressions." },
  { icon: "ϟ", title: "Lightning Fast", body: "Performance-first architecture with optimized assets, lazy scenes, and smooth UI." },
  { icon: "⌑", title: "Secure & Reliable", body: "Robust foundations, protected data flows, and dependable production practices." },
  { icon: "↗", title: "Scalable Growth", body: "Modular products that evolve with new markets, services, and teams." }
];

export const services: CardItem[] = [
  { icon: "▣", title: "Web Development", body: "Responsive SaaS sites and apps engineered for speed, conversion, and clarity." },
  { icon: "▯", title: "Mobile Development", body: "Cross-platform experiences with polished flows and reliable integrations." },
  { icon: "✦", title: "UI/UX Design", body: "Elegant product systems that translate strategy into calm, premium interfaces." },
  { icon: "▴", title: "Digital Marketing", body: "Growth campaigns, positioning, and analytics loops for measurable ROI." },
  { icon: "☁", title: "Cloud Solutions", body: "Secure, scalable infrastructure tailored around your operations." }
];

export const values: CardItem[] = [
  { icon: "☼", title: "Innovation", body: "We constantly explore new ideas and technologies." },
  { icon: "◌", title: "Collaboration", body: "The best results come from transparent partnerships." },
  { icon: "◎", title: "Integrity", body: "We do the right thing and build trust every step." },
  { icon: "☆", title: "Excellence", body: "Quality is embedded in every interaction we ship." }
];

export const stats = [
  ["120+", "Projects Completed"],
  ["80+", "Happy Clients"],
  ["5+", "Years of Experience"],
  ["25+", "Experts & Creators"]
] as const;
