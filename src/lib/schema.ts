import { site } from "../content/site"
import { resume } from "../content/resume"

export function personJsonLd(canonical: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Software Engineer II",
    url: canonical,
    email: site.email,
    sameAs: [site.github, site.linkedin],
    knowsAbout: resume.skills,
  }
}
