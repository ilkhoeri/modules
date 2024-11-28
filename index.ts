export * from "./components/web";
export * from "./types";
export * from "./icons";
export * from "./utility";

// hooks
export { useClickOutside } from "./hooks/use-click-outside";
export { useDidUpdate } from "./hooks/use-did-update";
export { useDisclosure } from "./hooks/use-disclosure";
export { useFullscreen } from "./hooks/use-fullscreen";
export {
  useMeasureScrollbar,
  applyStateEffect,
  attachBodyProperty,
  detachBodyProperty,
  attributeState
} from "./hooks/use-measure-scrollbar";
export {
  useHotkeys,
  getHotkeyHandler,
  getHotkeyMatcher,
  parseHotkey
} from "./hooks/use-hotkeys";
export { useHover } from "./hooks/use-hover";
export { useIntersection } from "./hooks/use-intersection";
export { useInterval } from "./hooks/use-interval";
export { useLocalStorage } from "./hooks/use-local-storage";
export { useMediaQuery } from "./hooks/use-media-query";
export {
  assignRef,
  createRefs,
  mergeRefs,
  useMergedRef
} from "./hooks/use-merged-ref";
export { clampUseMovePosition, useMove } from "./hooks/use-move";
export { useMouse } from "./hooks/use-mouse";
export {
  useOpenState,
  DataOrigin,
  DataTrigger,
  DataAlign,
  DataSide
} from "./hooks/use-open-state";
export {
  createSafeContext,
  Portal,
  hasSpecificChildren,
  modifyChildren
} from "./hooks/open-state-context";
export { DOTS, range, usePagination } from "./hooks/use-pagination";
export { getRandomColor, useRandomColors } from "./hooks/use-random-colors";
export { useReducedMotion } from "./hooks/use-reduced-motion";
export { useElementSize, useResizeObserver } from "./hooks/use-resize-observer";
export {
  useScrollIntoView,
  easeInOutQuad,
  getRelativePosition,
  getScrollStart,
  setScrollParam
} from "./hooks/use-scroll-into-view";
export { useUncontrolled } from "./hooks/use-uncontrolled";
export { useViewportSize } from "./hooks/use-viewport-size";
export { useWindowEvent } from "./hooks/use-window-event";
export { useWindowScroll } from "./hooks/use-window-scroll";
export { useId, useReactId } from "./hooks/use-id";
export { useImagePopup } from "./hooks/use-image-popup";
export { useIsomorphicEffect } from "./hooks/use-isomorphic-effect";
export { getInputOnChange, useInputState } from "./hooks/use-input-state";
export { useStateHistory } from "./hooks/use-state-history";
export { useValidatedState } from "./hooks/use-validated-state";
export { useClipboard } from "./hooks/use-clipboard";
export { useDocumentTitle } from "./hooks/use-document-title";
export { useDocumentVisibility } from "./hooks/use-document-visibility";
export {
  useEyeDropper,
  type EyeDropperOpenReturnType
} from "./hooks/use-eye-dropper";
export { useFetch, type UseFetchOptions } from "./hooks/use-fetch";
export { useNetwork } from "./hooks/use-network";
export { useOS, type OS } from "./hooks/use-os";
export { useDeviceInfo, type DeviceInfo } from "./hooks/use-device-info";
export { useTrigger, useRender } from "./hooks/use-trigger";
export { useOrientation } from "./hooks/use-orientation";
export { useReload } from "./hooks/use-reload";
export { usePWAInstaller } from "./hooks/use-pwa-installer";
export { useElementInfo } from "./hooks/use-element-info";
export {
  useGeoLocation,
  type CoordinateLocations
} from "./hooks/use-geo-location";

export type {
  HotkeyItem,
  Hotkey,
  HotkeyItemOptions,
  KeyboardModifiers
} from "./hooks/use-hotkeys";
export type {
  InitialInfo,
  RectElement,
  RectInfo
} from "./hooks/use-element-info";
export type { UseMediaQueryOptions } from "./hooks/use-media-query";
export type { UseMovePosition } from "./hooks/use-move";
export type {
  OpenStateOptions,
  ClickOpenOptions,
  HoverOpenOptions
} from "./hooks/use-open-state";
export type { PaginationParams } from "./hooks/use-pagination";
export type {
  StateHistory,
  UseStateHistoryHandlers
} from "./hooks/use-state-history";
