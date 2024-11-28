"use client";
import { useMediaQuery, UseMediaQueryOptions } from "@/hooks/use-media-query";

export function useReducedMotion(
  initialValue?: boolean,
  options?: UseMediaQueryOptions
) {
  return useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    initialValue,
    options
  );
}
