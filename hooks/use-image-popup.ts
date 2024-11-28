"use client";
import React, { useEffect } from "react";
import {
  attachBodyProperty,
  attributeState,
  detachBodyProperty,
  useMeasureScrollbar
} from "./use-measure-scrollbar";

import "./use-image-popup.css";

type Selectors = React.ElementType | (string & {});
interface PopupOptions {
  timeRender?: number;
}

export function useImagePopup(
  selectors: Selectors = ".embeded-image",
  options: PopupOptions = {}
) {
  const { timeRender = 350 } = options;
  const [hasScrollbar, scrollbarWidth] = useMeasureScrollbar();

  useEffect(() => {
    const imgElements = document.querySelectorAll(selectors as string);
    const body = document.body;

    if (!imgElements.length) return;

    const handleImageClick = (event: Event) => {
      const clickedImage = event.currentTarget as HTMLImageElement;
      let figure = document.querySelector(".popup-figure") as HTMLElement;

      if (!figure) {
        clickedImage.style.filter = "opacity(0)";
        body.style.overflow = "hidden";

        if (hasScrollbar) attachBodyProperty(scrollbarWidth);

        const rect = clickedImage.getBoundingClientRect();

        figure = document.createElement("figure");
        figure.classList.add("popup-figure");
        figure.style.setProperty("--duration", `${timeRender - 50}ms`);
        body.appendChild(figure);

        const overlay = document.createElement("div");
        overlay.classList.add("image-popup-overlay");
        figure.appendChild(overlay);

        const imgPopup = document.createElement("img");
        imgPopup.src = clickedImage.src;

        attributeState(imgPopup, "open");

        imgPopup.classList.add("image-popup");
        imgPopup.draggable = false;
        imgPopup.oncontextmenu = e => e.preventDefault();

        imgPopup.style.position = "absolute";
        imgPopup.style.setProperty("--initial-w", `${rect.width}px`);
        imgPopup.style.setProperty("--initial-h", `${rect.height}px`);

        figure.appendChild(imgPopup);

        imgPopup.getBoundingClientRect();

        imgPopup.style.setProperty(
          "--translate-in",
          `${(window.innerWidth / 2 - rect.left - rect.width / 2) * -1}px, ${(window.innerHeight / 2 - rect.top - rect.height / 2) * -1}px`
        );

        const closePopup = () => {
          attributeState(imgPopup, "closed");
          overlay.style.opacity = "0";

          setTimeout(() => {
            clickedImage.style.removeProperty("filter");
            body.style.removeProperty("overflow");
            figure.remove();

            if (hasScrollbar) detachBodyProperty();
          }, timeRender);
        };

        overlay.addEventListener("click", closePopup);

        const handlePopstate = (event: PopStateEvent) => {
          closePopup();
          event.preventDefault();
        };

        window.history.pushState({ drawerOpen: true }, "");
        window.addEventListener("popstate", handlePopstate);

        return () => window.removeEventListener("popstate", handlePopstate);
      }
    };

    imgElements.forEach(img => img.addEventListener("click", handleImageClick));

    return () => {
      imgElements.forEach(img =>
        img.removeEventListener("click", handleImageClick)
      );
    };
  }, [selectors, hasScrollbar, scrollbarWidth, timeRender]);
}
