export const STORAGE_KEY = "theme";
export const THEME_CHANGED_EVENT = "theme-changed";
export const DEFAULT_PRESET = "midnight";

export function applyPreset(slug: string): void {
  const oldLink = document.getElementById(
    "currentTheme"
  ) as HTMLLinkElement | null;
  const newLink = document.createElement("link");
  newLink.id = "currentTheme";
  newLink.rel = "stylesheet";
  newLink.href = `/themes/${slug}.css`;

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

  const finalize = () => {
    if (oldLink && oldLink !== newLink) oldLink.remove();
    sync();
  };

  newLink.addEventListener("load", finalize, { once: true });
  // Fallback in case load doesn't fire (cached stylesheet on some engines)
  newLink.addEventListener("error", finalize, { once: true });

  if (oldLink && oldLink.parentNode) {
    // Insert new link immediately after old to keep cascade order, then
    // remove the old one once the new sheet has applied — prevents FOUC.
    oldLink.id = "";
    oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling);
  } else {
    document.head.appendChild(newLink);
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
