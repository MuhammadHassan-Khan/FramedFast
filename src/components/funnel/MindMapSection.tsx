import mindMapImg from "@/assets/MindMap.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

const branches = [
  {
    title: "Model / People",
    description:
      "Incorporate human presence to create connection, scale, and lifestyle context. Model shots transform a product from an object into an aspirational experience.",
    tags: [
      "Model holding near face",
      "Perfume spray mist",
      "Lifestyle application",
      "Wrist/neck close-up",
      "Silhouette with product",
    ],
  },
  {
    title: "Product Shoot Styles",
    description:
      "Each product category demands a distinct visual language. Studio minimalism highlights detail, while editorial storytelling and UGC authenticity each communicate a different brand personality.",
    tags: [
      "Studio professional",
      "Lumi\u00e8re aesthetic",
      "Eau de Parfum mood",
      "UGC authentic style",
    ],
  },
  {
    title: "Location / Environment",
    description:
      "The setting defines the story. A bathroom counter suggests daily ritual, golden hour window light evokes warmth, and travel destinations position your product within a broader lifestyle narrative.",
    tags: [
      "Bathroom counter",
      "Outdoor natural light",
      "Window golden hour",
      "Night ambiance",
      "Travel destination",
      "Seasonal setting",
    ],
  },
  {
    title: "Angles & Perspective",
    description:
      "Camera angle dramatically changes how a product is perceived. Top-down flat lays organize information, low angles create heroism, and Dutch tilts add edgy dynamism to the frame.",
    tags: [
      "Top-down flat lay",
      "Eye level",
      "Low angle hero",
      "High angle",
      "Macro close-up",
      "Dutch tilted angle",
    ],
  },
  {
    title: "UGC Style",
    description:
      "User-generated content builds trust through authenticity. Hand-held POV shots and unboxing moments feel real and relatable \u2014 perfect for social proof on Instagram and TikTok.",
    tags: ["Hand holding POV", "Unboxing moment"],
  },
  {
    title: "Backgrounds",
    description:
      "The background sets the mood and directs focus. From clean white seamless for e-commerce to textured marble or branded color for lifestyle, the right background elevates the product without competing with it.",
    tags: [
      "White seamless",
      "Gradient",
      "Colored gel lighting",
      "Moody dark studio",
      "Marble/wood texture",
      "Abstract artistic",
      "Branded color",
      "Glass transparent",
    ],
  },
  {
    title: "Post-Production",
    description:
      "The final polish defines the feel. Clean editorial looks professional and trustworthy, film grain adds nostalgia, and high contrast feels bold and modern \u2014 each finish communicates a different brand message.",
    tags: [
      "Clean editorial",
      "Film grain vintage",
      "High contrast modern",
      "Soft dreamy",
      "Sharp commercial",
      "Vanity flat lay",
      "Shelfie",
    ],
  },
];

export function MindMapSection() {
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <span className="eyebrow">Product Photography Guide</span>
            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              A mind map of every way
              <br />
              to shoot your product.
            </h2>
            <p className="mt-4 text-brand-neutral">
              One product. Infinite possibilities. From studio precision to raw UGC authenticity
              \u2014 the right style depends on your brand, platform, and story. This mind map
              breaks down every creative direction at your disposal.
            </p>

            <div className="mt-8 space-y-5">
              {branches.map((branch) => (
                <div key={branch.title} className="border-l-2 border-brand-orange pl-4">
                  <h4 className="font-display font-semibold text-brand-black">{branch.title}</h4>
                  <p className="mt-1 text-sm text-brand-neutral leading-relaxed">
                    {branch.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-accent text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:sticky md:top-24">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="relative w-full rounded-lg overflow-hidden border border-black/10 shadow-lg group cursor-pointer text-left"
                >
                  <img
                    src={mindMapImg}
                    alt="Product photography styles mind map showing 7 categories: Model/People, Product Shoot Styles, Location/Environment, Angles & Perspective, UGC Style, Backgrounds, and Post-Production"
                    className="w-full h-auto block"
                    width={1920}
                    height={1920}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-brand-black/70 text-brand-white text-xs font-accent px-2.5 py-1.5 rounded opacity-70 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Click to zoom
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10">
                <img
                  src={mindMapImg}
                  alt="Product photography styles mind map"
                  className="w-full h-full object-contain max-h-[90vh]"
                />
              </DialogContent>
            </Dialog>

            <p className="mt-3 font-accent text-xs text-brand-neutral text-center">
              Click the mind map to inspect every branch in detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
