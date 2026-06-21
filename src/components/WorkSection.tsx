const projects = [
  {
    title: "Mesta",
    image: "/images/mesta.png",
    tags: ["Web Design", "Branding", "Dev"],
  },
  {
    title: "Liva Food",
    image: "/images/livafoodmenu.png",
    tags: ["Web Design", "Menu", "Dev"],
  },
  {
    title: "Rapport",
    image: "/images/rapportsiden.png",
    tags: ["UX/UI", "Frontend"],
  },
  {
    title: "AI Trainer",
    image: "/images/aitrainer.png",
    tags: ["Product", "AI", "Dev"],
  },
];

export default function WorkSection() {
  return (
    <section className="px-6 md:px-12 lg:px-16 py-24 lg:py-32">
      <div className="lg:grid lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        {/* Left: sticky section label */}
        <div className="mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-gray-500">1</span>
              <h2 className="text-sm font-medium uppercase tracking-widest text-gray-300">
                Selected work
              </h2>
            </div>
          </div>
        </div>

        {/* Right: project cards */}
        <div className="space-y-20 lg:space-y-28">
          {projects.map((p) => (
            <article key={p.title} className="group">
              <div className="overflow-hidden rounded-2xl bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/20 px-3 py-1 text-xs text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
