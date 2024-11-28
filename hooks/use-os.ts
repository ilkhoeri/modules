"use client";
import { useEffect, useLayoutEffect, useState } from "react";

export type OS =
  | "undetermined"
  | "old"
  | "macos"
  | "ios"
  | "windows"
  | "android"
  | "linux"
  | "UNIX";

function getOldOS(userAgent: string) {
  let osName;
  if (/Windows NT 6.2/.test(userAgent)) osName = "windows 8";
  if (/Windows NT 6.1/.test(userAgent)) osName = "windows 7";
  if (/Windows NT 6.0/.test(userAgent)) osName = "windows Vista";
  if (/Windows NT 5.1/.test(userAgent)) osName = "windows XP";
  if (/Windows NT 5.0/.test(userAgent)) osName = "windows 2000";
  return osName ? "old" : undefined;
}

export function getOS(): OS {
  if (typeof window === "undefined") {
    return "undetermined";
  }

  const { userAgent } = window.navigator;
  const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
  const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
  const iosPlatforms = /(iOS)|(iPhone)|(iPad)|(iPod)/i;

  if (macosPlatforms.test(userAgent)) return "macos";
  if (iosPlatforms.test(userAgent)) return "ios";
  if (windowsPlatforms.test(userAgent)) return "windows";
  if (/Android/i.test(userAgent)) return "android";
  if (/Linux/i.test(userAgent)) return "linux";
  if (/X11/.test(userAgent) && !/Win/.test(userAgent) && !/Mac/.test(userAgent))
    return "UNIX";
  getOldOS(userAgent);

  return "undetermined";
}

interface UseOsOptions {
  getValueInEffect: boolean;
}

export function useOS(options: UseOsOptions = { getValueInEffect: true }): OS {
  const [os, setOs] = useState<OS>(
    options.getValueInEffect ? "undetermined" : getOS()
  );
  const useIsomorphicEffect =
    typeof document !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicEffect(() => {
    if (options.getValueInEffect) {
      setOs(getOS);
    }
  }, []);

  return os;
}
