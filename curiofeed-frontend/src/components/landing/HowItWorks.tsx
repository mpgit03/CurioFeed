const steps = [
  {
    title: "Choose interests",
    description: "Start with the topics you care about most and shape your reading profile in minutes.",
  },
  {
    title: "We personalize",
    description: "CurioFeed ranks stories, blends perspectives, and surfaces what matters to you first.",
  },
  {
    title: "Read with focus",
    description: "Open a calm, distraction-free feed that stays current and tailored to your habits.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          From interests to a better daily news habit.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
