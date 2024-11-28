"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { getOS, type OS } from "./use-os";

export interface DeviceInfo {
  os: OS;
  userAgent: string;
  language: string;
  orientation: string;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  isTouchDevice: boolean;
  publicIp: string | undefined;
  deviceMemory: number | undefined;
  hardwareConcurrency: number | undefined;
}

export function useDeviceInfo(): DeviceInfo {
  const useIsomorphicEffect =
    typeof document !== "undefined" ? useLayoutEffect : useEffect;
  const [info, setInfo] = useState<DeviceInfo>({
    os: "undetermined",
    userAgent: "",
    language: "",
    orientation: "landscape-primary",
    screenWidth: 0,
    screenHeight: 0,
    devicePixelRatio: 1,
    isTouchDevice: false,
    publicIp: undefined,
    deviceMemory: undefined,
    hardwareConcurrency: undefined
  });

  useIsomorphicEffect(() => {
    async function fetchPublicIp() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setInfo(prev => ({
          ...prev,
          publicIp: data.ip
        }));
      } catch (err) {
        console.error("Error fetching public IP:", err);
      }
    }

    const updates = (event?: Event) => {
      const target = event?.currentTarget as ScreenOrientation;
      setInfo(prev => ({
        ...prev,
        os: getOS(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        devicePixelRatio: window.devicePixelRatio,
        orientation: target?.type || "landscape-primary",
        isTouchDevice: "ontouchstart" in window || navigator.maxTouchPoints > 0,
        deviceMemory: (navigator as any).deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency
      }));
    };

    fetchPublicIp();
    updates();

    window.addEventListener("resize", updates);
    window.screen.orientation?.addEventListener("change", updates);
    return () => {
      window.removeEventListener("resize", updates);
      window.screen.orientation?.removeEventListener("change", updates);
    };
  }, []);

  return info;
}
