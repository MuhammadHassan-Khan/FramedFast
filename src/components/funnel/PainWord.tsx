import { useEffect, useRef, useState, type ReactNode } from "react";

export function PainWord({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`pain-underline ${visible ? "is-visible" : ""}`}>
      {children}
    </span>
  );
}
