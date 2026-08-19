export type Role = {
  company: string
  title: string
  dates: string
  summary: string
  tags: string[]
}

export type Education = {
  school: string
  credential: string
  dates: string
  note?: string
}

export const resume = {
  summary:
    "Software Engineer II at Trimble, formerly Viewpoint Construction Software. Based in Bothell. B.S. in Computer Science from the University of Washington Tacoma.",
  skills: ["TypeScript", "JavaScript", "React", "Next.js", "Swift", "MongoDB"],
  experience: [
    {
      company: "Trimble",
      title: "Software Engineer II",
      dates: "Mar 2020 — Present",
      summary:
        "Software Engineer II at Trimble after Viewpoint became part of Trimble. Seattle-area role on construction software — ERP and project tools for contractors.",
      tags: ["JavaScript", "TypeScript", "React"],
    },
  ] satisfies Role[],
  education: [
    {
      school: "University of Washington Tacoma",
      credential: "B.S. Computer Science",
      dates: "2016 — 2018",
    },
  ] satisfies Education[],
}
