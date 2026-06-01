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

// Positions order: lte lt lg c rg rt rte qb lhb fb rhb
export const DEMO_PAGES: PageData[] = [
  {
    image: "/images/hailmaryout.png",
    title: "Hail Mary Out",
    videoLink: "https://youtu.be/qyqCTMirNWg?t=289",
    moves: [
      "straight-deep", "mid-90-left", "none", "none", "none",
      "mid-90-right", "straight-deep", "pass-qb", "none", "hole-four-fb", "none",
    ],
  },
  {
    image: "/images/lbhandoff.png",
    title: "Left Handoff FB",
    moves: [
      "none", "none", "none", "none", "none", "none", "none",
      "hand-off-left-qb", "hole-one-lhb", "hole-two-fb", "hole-five-rhb",
    ],
  },
];
