const JOBS = [
  {
    company: "Company A",
    title: "Software Engineer",
    period: "2023 – Present",
    description: "Placeholder description of role and impact.",
  },
  {
    company: "Company B",
    title: "Junior Developer",
    period: "2021 – 2023",
    description: "Placeholder description of role and impact.",
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
