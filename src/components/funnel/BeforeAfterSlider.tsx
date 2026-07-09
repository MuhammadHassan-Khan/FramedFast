import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  before: string;
  after: string;
  label: string;
  alt?: string;
}

export function BeforeAfterSlider({ before, after, label, alt = "" }: Props) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div className="select-none">
      <div
        ref={wrap}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-brand-black cursor-ew-resize"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          updateFromClientX(e.touches[0].clientX);
        }}
      >
        <img
          src={after}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={before}
            alt={alt}
            className="absolute inset-0 h-full object-cover"
            style={{ width: wrap.current?.offsetWidth ?? "100%", maxWidth: "none" }}
            loading="lazy"
          />
        </div>
        {/* divider */}
        <div
          className="absolute inset-y-0 w-[2px] bg-brand-orange pointer-events-none"
          style={{ left: `calc(${pos}% - 1px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-brand-orange grid place-items-center shadow-lg">
            <span className="text-brand-black font-bold text-sm">⇆</span>
          </div>
        </div>
        {/* labels */}
        <span className="absolute top-3 left-3 font-accent text-[10px] uppercase tracking-widest bg-brand-black/70 text-brand-white px-2 py-1 rounded">
          Before
        </span>
        <span className="absolute top-3 right-3 font-accent text-[10px] uppercase tracking-widest bg-brand-orange text-brand-black px-2 py-1 rounded">
          After
        </span>
      </div>
      <p className="mt-3 font-accent text-sm text-brand-neutral">{label}</p>
    </div>
  );
}
