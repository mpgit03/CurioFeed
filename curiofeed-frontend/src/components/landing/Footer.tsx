export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>CurioFeed</p>
        <div className="flex items-center gap-5">
          <a href="#features" className="transition hover:text-slate-950">Features</a>
          <a href="#how-it-works" className="transition hover:text-slate-950">How it works</a>
        </div>
      </div>
    </footer>
  );
}
