"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ 
  from = 0, 
  to, 
  duration = 2,
  includePlus = false 
}: { 
  from?: number; 
  to: number; 
  duration?: number;
  includePlus?: boolean;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count}{includePlus && "+"}
    </span>
  );
}
