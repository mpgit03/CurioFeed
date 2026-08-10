import { BrainCircuit, Newspaper, RadioTower, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI-powered personalization",
    description: "Your feed learns from the topics you choose, the publishers you follow, and the stories you keep reading.",
    icon: BrainCircuit,
  },
  {
    title: "Multiple trusted sources",
    description: "See the same story across respected outlets so you can understand the broader context quickly.",
    icon: Newspaper,
  },
  {
    title: "Follow publishers",
    description: "Keep your favorite reporters and outlets within reach with a focused follow model that feels intentional.",
    icon: RadioTower,
  },
  {
    title: "Personalized feed",
    description: "Every visit starts with a reading experience that feels curated, calm, and built around your interests.",
    icon: Sparkles,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Features</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          News that feels tailored to your curiosity.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
