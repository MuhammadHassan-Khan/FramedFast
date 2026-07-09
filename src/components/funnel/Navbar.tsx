import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#packages", label: "Packages" },
    { href: "#how", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-black/90 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-brand-white tracking-tight">
            Frame<span className="text-brand-orange">Fast</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-accent text-sm text-brand-white/80 hover:text-brand-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#book" className="hidden md:inline-flex btn-primary !py-2.5 !px-4 text-sm">
          → Book Now
        </a>
        <button
          aria-label="Open menu"
          className="md:hidden text-brand-white p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-brand-white" />
            <span className="block w-6 h-0.5 bg-brand-white" />
            <span className="block w-6 h-0.5 bg-brand-white" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-black border-t border-white/10">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-accent text-brand-white py-2"
              >
                {l.label}
              </a>
            ))}
            <a href="#book" onClick={() => setOpen(false)} className="btn-primary justify-center">
              → Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
