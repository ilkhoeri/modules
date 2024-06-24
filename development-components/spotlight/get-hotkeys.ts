"use client";

import { HotkeyItem } from "../../hooks/use-hotkeys/use-hotkeys";
import { spotlightActions, SpotlightStore } from "./spotlight.store";

export function getHotkeys(hotkeys: string | string[] | null | undefined, store: SpotlightStore): HotkeyItem[] {
  if (!hotkeys) {
    return [];
  }

  const open = () => spotlightActions.open(store);

  if (Array.isArray(hotkeys)) {
    return hotkeys.map((hotkey) => [hotkey, open]);
  }

  return [[hotkeys, open]];
}