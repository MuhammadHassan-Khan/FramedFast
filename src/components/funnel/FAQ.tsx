import { useState } from "react";

const items = [
  {
    q: "Do I need professional photography equipment?",
    a: "No. Your phone camera is enough. We handle everything else.",
  },
  {
    q: "What if I don't like the images?",
    a: "Our Luxury Guarantee means we keep revising until you're satisfied. No extra charge.",
  },
  {
    q: "How do I send my products to you?",
    a: "You don't. Just WhatsApp us your phone photos or upload them in the booking form.",
  },
  {
    q: "Will the images look consistent with my brand?",
    a: "Yes. After your first shoot, we save your brand style. Every future shoot matches it automatically.",
  },
  {
    q: "Can I get images for Daraz and Shopify listings?",
    a: "Every package includes marketplace-ready versions.",
  },
  {
    q: "How fast is delivery?",
    a: "Standard: 48 hours. Rush delivery: 24 hours (+40%).",
  },
  {
    q: "What's the difference between one-time packages and retainers?",
    a: "One-time packages are per collection. Retainers give you a fixed monthly image output with priority service — best for brands launching new products regularly.",
  },
  {
    q: "Is this halal to use? Are there real models in the images?",
    a: "No real models are used unless requested. All visuals are produced and fully customizable.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg md:text-xl text-brand-black">{it.q}</span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full border border-brand-black/20 grid place-items-center text-brand-orange transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="text-brand-neutral max-w-3xl">
                  {it.a.split(/(WhatsApp us)/g).map((part, j) =>
                    part === "WhatsApp us" ? (
                      <a
                        key={j}
                        href="https://wa.me/923120117197"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 decoration-brand-neutral/30 hover:decoration-brand-orange"
                      >
                        WhatsApp us
                      </a>
                    ) : (
                      part
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
