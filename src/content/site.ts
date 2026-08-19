export const site = {
  brand: "Mkrty",
  name: "David Mkrtychyan",
  role: "Software Engineer II. I build construction software at Trimble.",
  location: "Bothell",
  now: "Software Engineer II at Trimble",
  email: "dmkrtychyan@gmail.com",
  github: "https://github.com/DavidMkr",
  linkedin: "https://www.linkedin.com/in/mkrtychyan/",
  description:
    "Software Engineer II at Trimble, formerly Viewpoint. Personal hub for resume, work, and projects.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/work", label: "Work" },
] as const;

export type NavItem = (typeof nav)[number];
