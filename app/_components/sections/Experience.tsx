const JOBS = [
  {
    company: "Rocscience Inc.",
    title: "Full-Stack Web Developer",
    period: "July 2024 – December 2025",
    description:
      "Built full-stack features for RSLog, a geotechnical borehole logging application on ASP.NET Core. Scoped and developed the RSLog API service used internally and by client teams, designed a query builder module for dynamic entity filtering, and built a JSON import/export service for cross-instance project sharing. Managed database migrations with Entity Framework Core and shipped via Azure DevOps.",
  },
  {
    company: "Dayforce",
    title: "Full-Stack Web Developer Intern",
    period: "May 2022 – May 2023",
    description:
      "Worked full-stack on Dayforce's .NET HR platform in an Agile team. Developed TypeScript UI widgets using the Dojo Toolkit, wrote C# business logic for the recruiting module, optimized SQL queries in the data access layer, and implemented WCAG-compliant accessibility features.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-10">
          Experience
        </h2>
        <div className="divide-y divide-zinc-800/60">
          {JOBS.map((job) => (
            <article key={job.company} className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="font-semibold text-zinc-100">{job.company}</span>
                  <span className="text-zinc-500 mx-2">·</span>
                  <span className="text-zinc-300">{job.title}</span>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap shrink-0">
                  {job.period}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{job.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
