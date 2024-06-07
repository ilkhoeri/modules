"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ```js
 * // usage
  function Demo() {
    const { hovered, ref } = useHover();
    return (
      <div ref={ref}>
        {hovered ? 'I am hovered' : 'Put mouse over me please'}
      </div>
    );
  }
 * ```
 * @returns 
 */
export function useHover<T extends HTMLElement = HTMLDivElement>() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onMouseEnter);
      ref.current.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ref.current?.removeEventListener("mouseenter", onMouseEnter);
        ref.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return undefined;
  }, [onMouseEnter, onMouseLeave]);

  return { ref, hovered };
}
