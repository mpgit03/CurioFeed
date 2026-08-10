import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(51,65,85,1))] p-8 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.9)] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Stay informed</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Build a feed that fits the way you think.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
            Join CurioFeed and keep your news personalized, focused, and rooted in credible sources without the noise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
            >
              Create your feed
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
