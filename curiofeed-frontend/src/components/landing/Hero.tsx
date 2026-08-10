import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Personalized news for curious minds
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            A cleaner way to keep up with what matters.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            CurioFeed brings trusted sources, publisher follow lists, and AI-guided personalization together in one focused reading experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Join CurioFeed
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              See how it works
            </Link>
          </div>

          <dl className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <dt className="text-slate-500">Trusted publishers</dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-950">150+</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <dt className="text-slate-500">Personalized ranking</dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-950">AI tuned</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <dt className="text-slate-500">Reading flow</dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-950">Minimal</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="absolute -right-6 bottom-6 h-28 w-28 rounded-full bg-sky-300/30 blur-3xl" />

          <div className="relative rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Your feed</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">Curated for your interests</h2>
                </div>
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["AI picks your top headlines", "Technology"],
                  ["Followed publishers stay in focus", "Business"],
                  ["Source diversity keeps the story balanced", "World"],
                ].map(([title, tag], index) => (
                  <article key={index} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{title}</p>
                        <p className="mt-1 text-xs text-slate-500">Updated just now</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {tag}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
