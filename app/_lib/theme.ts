export const STORAGE_KEY = "theme";
export const THEME_CHANGED_EVENT = "theme-changed";
export const DEFAULT_PRESET = "midnight";

export function applyPreset(slug: string): void {
  const link = document.getElementById("currentTheme") as HTMLLinkElement | null;
  if (!link) return;
  link.setAttribute("href", `/themes/${slug}.css`);
  const sync = () => {
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-color")
      .trim();
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (meta && bg) meta.setAttribute("content", bg);
    window.dispatchEvent(new Event(THEME_CHANGED_EVENT));
  };
  if (link.sheet) {
    requestAnimationFrame(sync);
  } else {
    link.addEventListener("load", sync, { once: true });
  }
}

export const BOOT_SCRIPT = `(function(){
var p="${DEFAULT_PRESET}";
try{
var s=localStorage.getItem("${STORAGE_KEY}");
if(s&&/^[a-z0-9_]+$/i.test(s))p=s;
}catch(e){}
document.write('<link id="currentTheme" rel="stylesheet" href="/themes/'+p+'.css">');
})();`;
