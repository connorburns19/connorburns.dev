/**
 * Preset registry. To add a new preset:
 *  1. Drop a `:root { --bg-color: ...; ... }` file at `public/themes/<slug>.css`
 *     defining all 10 vars listed in `CSS_VAR_NAMES` (see `app/_lib/theme.ts`).
 *  2. Add an entry to `PRESETS` below with the swatch `bg` and `main` hex values.
 *
 * Palettes derived from monkeytypegame/monkeytype (GPL-3.0). Only the color
 * values are reused — color values are not copyrightable. The CSS files in
 * `public/themes/` are written from scratch in this repo's own formatting.
 */

export type ThemePreview = {
  name: string;
  displayName: string;
  bg: string;
  main: string;
};

export const PRESETS: ThemePreview[] = [
  { name: "midnight", displayName: "midnight", bg: "#09090b", main: "#fafafa" },
  { name: "serika_dark", displayName: "serika dark", bg: "#323437", main: "#e2b714" },
  { name: "nord", displayName: "nord", bg: "#242933", main: "#88c0d0" },
  { name: "catppuccin", displayName: "catppuccin", bg: "#1e1e2e", main: "#cba6f7" },
  { name: "gruvbox_dark", displayName: "gruvbox dark", bg: "#282828", main: "#d79921" },
  { name: "moonlight", displayName: "moonlight", bg: "#191f28", main: "#c69f68" },
  { name: "oblivion", displayName: "oblivion", bg: "#313231", main: "#a5a096" },
  { name: "carbon", displayName: "carbon", bg: "#313131", main: "#f66e0d" },
  { name: "paper", displayName: "paper", bg: "#eeeeee", main: "#444444" },
];
