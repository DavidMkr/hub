export type FaqItem = {
  q: string
  a: string
  tags?: string[]
}

export const faq: FaqItem[] = [
  {
    q: "Who are you?",
    a: "David Mkrtychyan — Software Engineer II at Trimble, formerly Viewpoint. Mkrty is the home for resume, work, and projects.",
    tags: ["name", "about", "who", "trimble", "viewpoint"],
  },
  {
    q: "What do you do?",
    a: "I am a Software Engineer II at Trimble. Viewpoint is now Trimble. The work is construction software: ERP and project tools for contractors.",
    tags: ["role", "work", "engineer", "trimble", "viewpoint"],
  },
  {
    q: "Where can I see your resume?",
    a: "Open the Resume page on this site. Download PDF uses the browser print dialog so the page and the file stay in sync.",
    tags: ["resume", "pdf", "cv"],
  },
  {
    q: "How can I contact you?",
    a: "Email dmkrtychyan@gmail.com, or use GitHub and LinkedIn in the footer.",
    tags: ["contact", "email", "github", "linkedin"],
  },
  {
    q: "What have you built?",
    a: "The Work page lists NicPics, a Swift iOS app that shows a random Nicolas Cage photo on tap, and Modern Painting, a brochure and estimate site for a Lynnwood / Seattle painting contractor. More projects land there as they ship.",
    tags: ["projects", "work", "portfolio", "github", "nicpics", "painting"],
  },
]
