"use client";
import React from "react";

interface UseTouchProps {
  touch?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTouch<T extends HTMLElement>(_touch: UseTouchProps) {
  const {
    touch = true,
    defaultOpen = false,
    onOpenChange,
    open: openChange
  } = _touch;
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const triggerRef = React.useRef<T>(null);
  const open = openChange !== undefined ? openChange : isOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const el = triggerRef.current;
    const onMouseEnter = () => {
      if (!isTouchDevice) setOpen(true);
    };
    const onMouseLeave = () => {
      if (!isTouchDevice) setOpen(false);
    };
    const onMouseMove = () => {
      if (isTouchDevice) setIsTouchDevice(false);
    };
    const onTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
      setOpen(true);
    };
    const onTouchEnd = () => {
      setOpen(false);
    };

    const windowTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
    };

    if (el) {
      // if touch active
      if (touch) {
        el.addEventListener("touchstart", onTouchStart);
        el.addEventListener("touchend", onTouchEnd);
      }

      window.addEventListener("touchstart", windowTouchStart);
      window.addEventListener("mousemove", onMouseMove);

      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (el) {
        // if touch active
        if (touch) {
          el.removeEventListener("touchstart", onTouchStart);
          el.removeEventListener("touchend", onTouchEnd);
        }

        window.removeEventListener("touchstart", windowTouchStart);
        window.removeEventListener("mousemove", onMouseMove);

        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [isTouchDevice, setOpen, triggerRef, touch]);

  return { touch, open, triggerRef };
}
