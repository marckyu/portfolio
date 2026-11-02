const KEY = "intro-seen";

/** True on the first visit of a session, unless the visitor prefers reduced motion. */
export function shouldPlayIntro(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage can be blocked; the intro just plays again next time */
  }
}