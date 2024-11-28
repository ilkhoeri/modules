"use client";
import { useCallback, useEffect, useState } from "react";
import { useWindowEvent } from "@/hooks/use-window-event";

interface NetworkStatus {
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | "5g";
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
}

function getConnection(): NetworkStatus {
  if (typeof navigator === "undefined") return {};

  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!connection) return {};

  return {
    downlink: navigator.onLine ? connection.downlink : 0,
    downlinkMax: navigator.onLine ? connection.downlinkMax : 0,
    effectiveType: navigator.onLine ? connection.effectiveType : "none",
    rtt: navigator.onLine ? connection.rtt : 0,
    saveData: navigator.onLine ? connection.saveData : false,
    type: navigator.onLine
      ? typeof connection.type === "undefined"
        ? "unknown"
        : connection.type
      : "none"
  };
}

export function useNetwork() {
  const [status, setStatus] = useState<{ online: boolean } & NetworkStatus>({
    online: navigator.onLine,
    ...getConnection()
  });

  const updateConnectionStatus = useCallback(() => {
    setStatus({
      online: navigator.onLine,
      ...getConnection()
    });
  }, []);

  useWindowEvent("online", updateConnectionStatus);
  useWindowEvent("offline", updateConnectionStatus);

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      connection.addEventListener("change", updateConnectionStatus);
      return () =>
        connection.removeEventListener("change", updateConnectionStatus);
    }
  }, [updateConnectionStatus]);

  return status;
}
