"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_PRESET,
  STORAGE_KEY,
  THEME_CHANGED_EVENT,
  applyPreset,
} from "./theme";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGED_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGED_EVENT, callback);
}

function getSnapshot(): string {
  const link = document.getElementById(
    "currentTheme"
  ) as HTMLLinkElement | null;
  const href = link?.getAttribute("href") ?? "";
  const match = href.match(/\/themes\/([^/.]+)\.css$/);
  return match ? match[1] : DEFAULT_PRESET;
}

function getServerSnapshot(): string {
  return DEFAULT_PRESET;
}

export function useTheme() {
  const preset = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setPreset = useCallback((slug: string) => {
    applyPreset(slug);
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {}
  }, []);

  return { preset, setPreset };
}
