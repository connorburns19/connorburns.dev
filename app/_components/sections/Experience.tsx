const JOBS = [
  {
    company: "Rocscience Inc.",
    companyUrl: "https://www.rocscience.com/",
    title: "Full-Stack Web Developer",
    period: "July 2024 – December 2025",
    bullets: [
      "Developed full-stack features for RSLog, a geotechnical ASP.NET Core borehole logging application",
      "Scoped and developed the RSLog API service used internally and by client development teams",
      "Built a JSON export and import service enabling cross-instance project sharing between partnered clients",
      "Redesigned and scoped a UI/UX-focused query builder module for dynamic filtering of RSLog entities",
      "Implemented unit and integration tests to ensure API reliability and prevent regressions",
    ],
  },
  {
    company: "Dayforce",
    companyUrl: "https://www.dayforce.com/",
    title: "Full-Stack Web Developer Intern",
    period: "May 2022 – May 2023",
    bullets: [
      "Worked full-stack developing the Dayforce .NET HR web software while participating in Agile practices",
      "Created and updated UI widgets for a new feature using TypeScript and the Dojo Toolkit",
      "Wrote business logic in C# to manage the application status of candidates in the job recruiting module",
      "Optimized the running times of existing SQL queries present in the Data Access Layer",
      "Implemented accessibility features compliant with the Web Content Accessibility Guidelines",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-10">
          Professional Experience
        </h2>
        <div className="divide-y divide-zinc-800/60">
          {JOBS.map((job) => (
            <article key={job.company} className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-zinc-100 hover:text-zinc-300 transition-colors"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <span className="font-semibold text-zinc-100">{job.company}</span>
                  )}
                  <span className="text-zinc-500 mx-2">·</span>
                  <span className="text-zinc-300">{job.title}</span>
                </div>
                <span className="text-sm text-zinc-400 whitespace-nowrap shrink-0">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-1.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-zinc-300 leading-relaxed">
                    <span className="text-zinc-600 mt-0.5 shrink-0">–</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
