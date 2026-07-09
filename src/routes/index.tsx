import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/funnel/Navbar";
import { Counter } from "@/components/funnel/Counter";
import { FAQ } from "@/components/funnel/FAQ";
import { BookingForm } from "@/components/funnel/BookingForm";
import { PainWord } from "@/components/funnel/PainWord";
import { MindMapSection } from "@/components/funnel/MindMapSection";

import r16 from "@/assets/r16.jpeg";
import r15 from "@/assets/r15.png";
import r14 from "@/assets/r14.png";
import r13 from "@/assets/r13.png";
import r12 from "@/assets/r12.jpeg";
import r11 from "@/assets/r11.jpeg";
import r10 from "@/assets/r10.png";
import r9 from "@/assets/r9.jpeg";
import r8 from "@/assets/r8.jpeg";
import r7 from "@/assets/r7.png";
import Result1 from "@/assets/Result1.png";
import heroBA from "@/assets/before_after.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FramedFast — Luxury Fashion Campaign Images in 48 Hours" },
      {
        name: "description",
        content:
          "Replace your next Rs.100,000 photoshoot with one phone photo. Premium fashion campaign visuals for Pakistani clothing brands. 48-hour delivery.",
      },
      { property: "og:title", content: "FramedFast — Luxury Fashion Campaign in 48 Hours" },
      {
        property: "og:description",
        content:
          "Premium virtual fashion studio for Pakistani clothing brands. No studio. No photographer. 48-hour delivery.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div id="top" className="bg-brand-white text-brand-black">
      <Navbar />
      <Hero />
      <PainSection />
      <ContrastSection />
      <GallerySection />
      <PricingSection />
      <GuaranteeSection />
      <HowItWorksSection />
      <MindMapSection />
      <BookingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ────────── SECTION 1 — HERO ────────── */
function Hero() {
  return (
    <section className="relative bg-brand-black text-brand-white pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="container-x relative grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div>
          <span className="eyebrow">Premium Virtual Fashion Studio</span>
          <h1 className="mt-5 font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            Replace Your Next <span className="text-brand-orange">Rs.100,000 Photoshoot</span>
            <br />
            With One Phone Photo.
          </h1>
          <p className="mt-6 text-brand-neutral text-lg max-w-xl">
            Luxury fashion campaign visuals. 48-hour delivery.
            <br />
            No studio. No photographer. No models. No logistics.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#book" className="btn-primary text-base">
              → Book Your Shoot
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={heroBA}
              alt="Phone photo vs luxury campaign image"
              className="w-full h-auto block"
              width={1280}
              height={960}
            />
            <div className="absolute inset-y-0 left-1/2 w-px bg-brand-orange" />
            <span className="absolute top-3 left-3 font-accent text-[10px] uppercase tracking-widest bg-brand-black/70 px-2 py-1 rounded">
              Phone Photo
            </span>
            <span className="absolute top-3 right-3 font-accent text-[10px] uppercase tracking-widest bg-brand-orange text-brand-black px-2 py-1 rounded">
              FramedFast
            </span>
          </div>
          <p className="mt-3 font-accent text-sm text-brand-neutral text-center">
            Same product. Same phone. Different world.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 2 — PAIN ────────── */
function PainSection() {
  const steps = [
    ["Courier clothes to studio", "2–3 days"],
    ["Wait for photographer slot", "3–5 days"],
    ["Shoot day", "1 day"],
    ["Editing & delivery", "5–7 days"],
    ["Revisions", "3–5 more days"],
  ];
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="container-x max-w-4xl text-center">
        <span className="eyebrow">The Problem</span>
        <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
          Every collection you have is stuck behind a <PainWord>Rs.50,000 photoshoot</PainWord>.
        </h2>
        <div className="mt-8 text-brand-neutral text-base md:text-lg space-y-4 max-w-2xl mx-auto text-left md:text-center">
          <p>
            You're running a clothing brand. You have new products ready. But before one image goes
            live — you wait.
          </p>
          <p>
            You courier the clothes to a studio. You wait for availability. You hire a{" "}
            <PainWord>photographer</PainWord>. You book models. You manage editing. You follow up
            for <PainWord>2 weeks</PainWord>.
          </p>
          <p>And after all of that — the images still don't match your brand.</p>
          <p>
            Meanwhile your competitor just posted 30 stunning campaign images. And your products are
            still sitting in a box.
          </p>
          <p className="text-brand-black font-medium">
            That is the traditional photoshoot. And it is killing your growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-14 max-w-xl mx-auto text-left">
          <ol className="relative border-l-2 border-brand-black/10 pl-6 space-y-5">
            {steps.map(([label, time]) => (
              <li key={label} className="relative">
                <span className="absolute -left-[34px] top-1.5 w-4 h-4 rounded-full bg-brand-orange ring-4 ring-brand-white" />
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-brand-black">{label}</span>
                  <span className="font-accent text-sm text-brand-orange">{time}</span>
                </div>
              </li>
            ))}
            <li className="relative pt-3 border-t border-brand-black/10">
              <span className="absolute -left-[34px] top-5 w-4 h-4 rounded-full bg-brand-black ring-4 ring-brand-white" />
              <div className="flex items-center justify-between gap-4">
                <span className="font-display font-bold text-brand-black">Total Time</span>
                <span className="font-accent font-semibold text-brand-black">2–3 Weeks</span>
              </div>
            </li>
            <li className="relative">
              <span className="absolute -left-[34px] top-1.5 w-4 h-4 rounded-full bg-brand-black ring-4 ring-brand-white" />
              <div className="flex items-center justify-between gap-4">
                <span className="font-display font-bold text-brand-black">Total Cost</span>
                <span className="font-accent font-semibold text-brand-black">
                  Rs.50,000–300,000
                </span>
              </div>
            </li>
          </ol>
        </div>

        <p className="mt-12 font-display text-2xl md:text-3xl text-brand-orange max-w-2xl mx-auto">
          "And you still have to do this EVERY collection."
        </p>
      </div>
    </section>
  );
}

/* ────────── SECTION 3 — CONTRAST ────────── */
function ContrastSection() {
  return (
    <section className="bg-brand-black text-brand-white py-20 md:py-28">
      <div className="container-x max-w-5xl">
        <div className="text-center">
          <span className="eyebrow">The FramedFast Way</span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            One phone photo.
            <br />
            48 hours.
            <br />
            <span className="text-brand-orange">Luxury brand campaign — done.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-lg p-7 bg-brand-dark">
            <h3 className="font-accent uppercase text-xs tracking-widest text-brand-neutral">
              Old Way
            </h3>
            <ul className="mt-4 space-y-3 text-brand-neutral">
              {[
                "Courier your clothes",
                "Studio booking",
                "Models & photographers",
                "2–3 week wait",
                "Rs.50,000–300,000",
                "Images that don't match your brand",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 line-through decoration-brand-neutral/60"
                >
                  <span className="text-brand-neutral">✗</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-brand-orange/40 rounded-lg p-7 bg-brand-dark">
            <h3 className="font-accent uppercase text-xs tracking-widest text-brand-orange">
              FramedFast Way
            </h3>
            <ul className="mt-4 space-y-3 text-brand-white">
              {[
                ["WhatsApp us your phone photos", true],
                ["We handle everything", false],
                ["48-hour delivery", false],
                ["Rs.4,999–64,999", false],
                ["Images matched to your brand identity", false],
                ["Luxury output, every time", false],
              ].map(([s, isWA]) => (
                <li key={s as string} className="flex items-start gap-3">
                  <span className="text-brand-orange">✓</span>
                  {isWA ? (
                    <a
                      href="https://wa.me/923120117197"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 decoration-white/20 hover:decoration-white/60"
                    >
                      WhatsApp us your phone photos
                    </a>
                  ) : (
                    <span>{s as string}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="font-display text-2xl md:text-4xl">
            Brands saved an average of{" "}
            <span className="text-brand-orange">
              Rs.
              <Counter to={87000} />
            </span>{" "}
            per collection.
          </p>
          <p className="mt-3 font-accent text-xs text-brand-neutral">
            Based on comparing our Growth Package vs. an average Karachi studio shoot.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 4 — PORTFOLIO / RESULTS ────────── */
function GallerySection() {
  const row1 = [
    { src: r16, label: "Campaign Result", w: 1792, h: 2400 },
    { src: r12, label: "Campaign Result", w: 1792, h: 2400 },
    { src: r11, label: "Campaign Result", w: 1792, h: 2400 },
    { src: r9, label: "Campaign Result", w: 1792, h: 2400 },
    { src: r8, label: "Campaign Result", w: 1792, h: 2400 },
    { src: Result1, label: "Campaign Result", w: 1190, h: 1322 },
    { src: r14, label: "Campaign Result", w: 1047, h: 1501 },
  ];
  const row2 = [
    { src: r15, label: "Campaign Result", w: 1536, h: 1024 },
    { src: r10, label: "Campaign Result", w: 1402, h: 1122 },
    { src: r13, label: "Campaign Result", w: 1402, h: 1122 },
    { src: r7, label: "Campaign Result", w: 1536, h: 1024 },
    { src: r15, label: "Campaign Result", w: 1536, h: 1024 },
    { src: r10, label: "Campaign Result", w: 1402, h: 1122 },
  ];
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Portfolio</span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
            Real results from real brands.
          </h2>
          <p className="mt-4 text-brand-neutral">
            Every image was produced from a single phone photo \u2014 no studio, no photographer, no
            model.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {/* Row 1 — auto-scroll left to right */}
          <div className="scroll-auto pb-2 -mx-5 px-5">
            <div className="scroll-track scroll-track-ltr gap-4 md:gap-5">
              {[...row1, ...row1].map((img, i) => (
                <Dialog key={`r1-${i}`}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative shrink-0 rounded-lg overflow-hidden border border-black/10 shadow-md group cursor-pointer text-left"
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="h-[300px] md:h-[460px] w-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-black/70 text-brand-white text-[10px] font-accent px-2 py-1 rounded flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        View
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-contain max-h-[90vh]"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* Row 2 — auto-scroll right to left */}
          <div className="scroll-auto pb-2 -mx-5 px-5">
            <div className="scroll-track scroll-track-rtl gap-4 md:gap-5">
              {[...row2, ...row2].map((img, i) => (
                <Dialog key={`r2-${i}`}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative shrink-0 rounded-lg overflow-hidden border border-black/10 shadow-md group cursor-pointer text-left"
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="h-[220px] md:h-[340px] w-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-black/70 text-brand-white text-[10px] font-accent px-2 py-1 rounded flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        View
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-contain max-h-[90vh]"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-brand-orange text-brand-black p-6 md:p-8 rounded-lg max-w-2xl mx-auto text-center">
          <p className="font-display text-xl md:text-2xl font-semibold">
            Every image you see was produced from a single phone photo.
          </p>
          <p className="mt-2 font-body">No studio. No photographer. No model.</p>
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 6 — PRICING ────────── */
function PricingSection() {
  return (
    <section id="packages" className="bg-brand-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Transparent Pricing</span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
            Choose the package that matches your
            <br />
            content volume and turnaround needs.
          </h2>
          <p className="mt-4 text-brand-neutral">
            All packages are optimized for brand consistency, fast delivery, and repeatable quality.
          </p>
        </div>

        {/* 3-tier pricing cards — Starter first in DOM order */}
        <div className="mt-12 grid md:grid-cols-3 gap-5 items-stretch">
          <PricingCard
            title="Starter"
            price="PKR 18,000"
            features={[
              "10 edited product photos",
              "1 UGC video (15\u201330s)",
              "3 business day delivery",
              "Rush upgrade available",
            ]}
            benefit="Professional quality, zero risk."
            cta="Book Now"
          />
          <PricingCard
            featured
            badge="Most Popular"
            title="Growth"
            price="PKR 45,000"
            features={[
              "30 edited product photos",
              "3 UGC videos",
              "5 business day delivery",
              "Rush upgrade available",
            ]}
            benefit="Our most popular \u2014 balanced output & speed."
            cta="Book Now"
          />
          <PricingCard
            title="Premium"
            price="PKR 95,000"
            features={[
              "80 edited product photos",
              "8 UGC videos",
              "14 business day delivery",
              "Rush upgrade available",
            ]}
            benefit="Full-scale production for serious brands."
            cta="Book Now"
          />
        </div>

        {/* Retainers sub-section */}
        <div className="mt-20">
          <span className="eyebrow">Monthly Retainers</span>
          <h3 className="mt-3 font-display font-bold text-2xl md:text-4xl">
            Predictable output. Priority treatment.
          </h3>
          <div className="mt-8 grid md:grid-cols-2 gap-5 max-w-3xl">
            <RetainerCard
              title="Growth Retainer"
              price="PKR 160,000/mo"
              items={["60 edited photos per month", "8 UGC videos per month", "Priority delivery"]}
            />
            <RetainerCard
              title="Premium Subscription"
              price="PKR 220,000/mo"
              featured
              items={[
                "120 edited photos per month",
                "15 videos per month",
                "Priority revisions",
                "Monthly planning call",
              ]}
            />
          </div>
        </div>

        {/* Add-ons table */}
        <div className="mt-16">
          <h3 className="font-display font-bold text-xl md:text-2xl">Add-Ons</h3>
          <div className="mt-5 overflow-hidden rounded-lg border border-black/10">
            <table className="w-full text-left">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-5 py-3 font-accent text-xs uppercase tracking-wider text-brand-neutral">
                    Add-On
                  </th>
                  <th className="px-5 py-3 font-accent text-xs uppercase tracking-wider text-brand-neutral">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {[
                  ["Rush Delivery (Starter \u2014 48h)", "+PKR 7,000"],
                  ["Rush Delivery (Growth \u2014 24\u201348h)", "+PKR 10,000"],
                  ["Extra Product Photo (any tier)", "PKR 1,500 each"],
                  ["Extra UGC Video (any tier)", "PKR 18,000 each"],
                  ["Re-Version (any tier)", "PKR 1,000 each"],
                  ["White-Label Delivery (monthly)", "+PKR 25,000/mo"],
                ].map(([a, p]) => (
                  <tr key={a}>
                    <td className="px-5 py-3 text-brand-black">{a}</td>
                    <td className="px-5 py-3 font-accent text-brand-orange">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  title,
  price,
  features,
  benefit,
  badge,
  featured,
  cta,
}: {
  title: string;
  price: string;
  features: string[];
  benefit: string;
  badge?: string;
  featured?: boolean;
  cta: string;
}) {
  return (
    <div
      className={`relative rounded-lg p-7 flex flex-col ${
        featured
          ? "bg-brand-orange text-brand-black md:scale-[1.03] shadow-xl"
          : "bg-white border border-black/10"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-5 font-accent text-[10px] uppercase tracking-widest px-2.5 py-1 rounded ${
            featured ? "bg-brand-black text-brand-orange" : "bg-brand-black text-brand-white"
          }`}
        >
          {badge}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-3 font-accent text-3xl font-bold">{price}</div>
      <p className={`mt-2 text-sm ${featured ? "text-brand-black/80" : "text-brand-neutral"}`}>
        {benefit}
      </p>
      <ul
        className={`mt-5 space-y-2 text-sm ${featured ? "text-brand-black" : "text-brand-black/80"}`}
      >
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className={featured ? "text-brand-black" : "text-brand-orange"}>{"\u2713"}</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#book"
        className={`mt-6 inline-flex justify-center font-accent font-semibold rounded px-4 py-3 ${
          featured ? "bg-brand-black text-brand-orange" : "btn-primary"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

function RetainerCard({
  title,
  price,
  items,
  featured,
}: {
  title: string;
  price: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg p-7 ${
        featured
          ? "bg-brand-black text-brand-white border border-brand-orange"
          : "bg-brand-black text-brand-white border border-white/10"
      }`}
    >
      <h4 className="font-display text-lg">{title}</h4>
      <div className="mt-2 font-accent text-2xl font-bold text-brand-orange">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-brand-neutral">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="text-brand-orange">{"\u2713"}</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <a href="#book" className="mt-6 inline-flex w-full justify-center btn-ghost">
        {"\u2192"} Choose Plan
      </a>
    </div>
  );
}

/* ────────── SECTION 7 — GUARANTEE ────────── */
function GuaranteeSection() {
  return (
    <section className="bg-brand-black text-brand-white py-24 md:py-32 text-center">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">Our Promise</span>
        <div className="mt-8 mx-auto w-28 h-28 rounded-full bg-brand-orange/10 border border-brand-orange/40 grid place-items-center shadow-[0_0_60px_-10px_rgba(250,104,10,0.7)]">
          <svg viewBox="0 0 24 24" className="w-14 h-14 text-brand-orange" fill="currentColor">
            <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
          </svg>
        </div>
        <h2 className="mt-8 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
          The Luxury Guarantee.
        </h2>
        <p className="mt-6 text-brand-white/90 text-lg leading-relaxed">
          If the images don't look premium enough for your brand — we keep refining them until they
          do.
        </p>
        <p className="mt-3 text-brand-neutral">No argument. No extra charge. No time limit.</p>
        <p className="mt-6 font-display text-xl md:text-2xl text-brand-orange">
          We don't stop until you're proud to post them.
        </p>
      </div>
    </section>
  );
}

/* ────────── SECTION 8 — HOW IT WORKS ────────── */
function HowItWorksSection() {
  const steps = [
    ["Book Your Slot", "Send us a WhatsApp or fill the booking form below."],
    ["Send Your Phone Photos", "Flat lay or hanger shots. No special setup needed."],
    ["We Produce", "Our team creates luxury campaign visuals matched to your brand."],
    ["Receive & Post", "Delivery in 48 hours. Instagram, Shopify, Daraz — all ready."],
  ];
  return (
    <section id="how" className="bg-brand-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
            Four steps. 48 hours. Done.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {steps.map(([t, d], i) => (
            <div key={t} className="relative">
              <div className="font-display text-6xl font-bold text-brand-orange/30">0{i + 1}</div>
              <h3 className="mt-3 font-display text-xl text-brand-black">{t}</h3>
              <p className="mt-2 text-brand-neutral text-sm">{d}</p>
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 text-brand-orange/60 text-2xl"
                  style={{ right: -12 }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 10 — FAQ ────────── */
function FAQSection() {
  return (
    <section id="faq" className="bg-brand-white py-20 md:py-28">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">Questions</span>
        <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
          Everything you might be wondering.
        </h2>
        <div className="mt-10">
          <FAQ />
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 11 — BOOKING ────────── */
function BookingSection() {
  return (
    <section id="book" className="bg-brand-black text-brand-white py-20 md:py-28">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <span className="eyebrow">Book Your Shoot</span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl">
            Book Your Campaign Shoot.
            <br />
            <span className="text-brand-orange">Zero commitment.</span>
          </h2>
          <p className="mt-4 text-brand-neutral">Pick a time. Fill 3 fields. We handle the rest.</p>
        </div>
        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

/* ────────── SECTION 12 — FINAL CTA ────────── */
function FinalCTA() {
  return (
    <section className="bg-brand-orange text-brand-black py-16 md:py-20">
      <div className="container-x text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
          Stop losing customers to brands with better images.
        </h2>
        <a href="#book" className="mt-8 inline-flex btn-dark text-base">
          → Book Your Shoot Now
        </a>
      </div>
    </section>
  );
}

/* ────────── SECTION 13 — FOOTER ────────── */
function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white py-14 border-t border-white/5">
      <div className="container-x grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-display text-xl font-bold">
            Frame<span className="text-brand-orange">Fast</span>
          </div>
          <p className="mt-3 text-brand-neutral text-sm">
            Premium Virtual Fashion Studio
            <br />
            Karachi, Pakistan
          </p>
        </div>
        <div className="flex md:justify-center">
          <ul className="space-y-2 font-accent text-sm text-brand-neutral">
            <li>
              <a href="#packages" className="hover:text-brand-white">
                Packages
              </a>
            </li>
            <li>
              <a href="#how" className="hover:text-brand-white">
                How It Works
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-brand-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#book" className="hover:text-brand-white">
                Book Now
              </a>
            </li>
          </ul>
        </div>
        <div className="md:text-right">
          <div className="flex md:justify-end gap-3 flex-wrap">
            <a
              href="https://www.instagram.com/framedfast/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @FramedFast
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591036976492"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              FramedFast
            </a>
            <a
              href="https://www.linkedin.com/in/framed-fast-a35045418/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              FramedFast
            </a>
          </div>
          <ul className="mt-4 space-y-2 font-accent text-sm text-brand-neutral">
            <li>
              WhatsApp:{" "}
              <a
                href="https://wa.me/923120117197"
                target="_blank"
                rel="noreferrer"
                className="text-brand-white underline underline-offset-2 decoration-white/20 hover:decoration-white/60"
              >
                0312 0117197
              </a>
            </li>
            <li>
              Email: <span className="text-brand-white">fast24support@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-white/5 font-accent text-xs text-brand-neutral text-center">
        © {new Date().getFullYear()} FramedFast. All rights reserved.
      </div>
    </footer>
  );
}
