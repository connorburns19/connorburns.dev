import type { PageData } from "@connorburns/playbook";

export const SLOT_IDS = {
  heroWrap: "pb-hero-wrap",
  heroSuffix: "hero",
  demoField: "pb-demo-field",
  demoSetmove: "pb-demo-setmove",
  demoSbField: "pb-demo-sb-field",
  demoSbControls: "pb-demo-sb-controls",
  demoSbDemo: "pb-demo-sb-demo",
  demoBfDemo: "pb-demo-bf-demo",
  demoBfField: "pb-demo-bf-field",
  demoBfBook: "pb-demo-bf-book",
  cloneWrap: "pb-clone-wrap",
  cloneSuffix: "clone",
} as const;

// Moves use the partial { position: move } map form — unlisted positions
// default to 'none'. (The library also accepts an 11-entry positional array.)
export const DEMO_PAGES: PageData[] = [
  {
    image: "/images/hailmaryout.png",
    title: "Hail Mary Out",
    videoLink: "https://youtu.be/qyqCTMirNWg?t=289",
    moves: {
      lte: "straight-deep", lt: "mid-90-left",
      rt: "mid-90-right", rte: "straight-deep",
      qb: "pass-qb", fb: "hole-four-fb",
    },
  },
  {
    image: "/images/lbhandoff.png",
    title: "Left Handoff FB",
    moves: {
      qb: "hand-off-left-qb", lhb: "hole-one-lhb",
      fb: "hole-two-fb", rhb: "hole-five-rhb",
    },
  },
];
