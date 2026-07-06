import { NARRATIVE_SCROLL_IMAGES } from "./heroImages";

/**
 * Three headline lines — one word swaps per scroll step.
 * Transforming → Cinematic, Properties → Visual, Into → Narratives
 */
export const NARRATIVE_LINES = [
  {
    id: "line-1",
    initial: "Transforming",
    final: "Cinematic",
    initialStyle: "serif",
    finalStyle: "sans",
  },
  {
    id: "line-2",
    initial: "Properties",
    final: "Visual",
    initialStyle: "sans",
    finalStyle: "sans",
  },
  {
    id: "line-3",
    initial: "Into",
    final: "Narratives",
    initialStyle: "serif",
    finalStyle: "sans",
  },
];

export const NARRATIVE_IMAGES = NARRATIVE_SCROLL_IMAGES;

/** Total scroll length multiplier (× viewport height) */
export const NARRATIVE_SCROLL_VH = {
  desktop: 5.2,
  mobile: 4.6,
};
