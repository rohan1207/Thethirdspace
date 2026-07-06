/** Hero slideshow images — served from Vite public/ root (slide1–slide12) */
export const HERO_IMAGES = [
  "/slide1.webp",
  "/slide2.jpg",
  "/slide3.jpeg",
  "/slide4.jpg",
  "/slide5.webp",
  "/slide6.jpg",
  "/slide7.jpg",
  "/slide8.jpg",
  "/slide9.jpg",
  "/slide10.jpg",
  "/slide11.gif",
  "/slide12.jpg",
];

/** First N slides shown immediately on hero mount */
export const HERO_PRIORITY_COUNT = 6;

export const HERO_PRIORITY_IMAGES = HERO_IMAGES.slice(0, HERO_PRIORITY_COUNT);

export const HERO_BACKGROUND_IMAGES = HERO_IMAGES.slice(HERO_PRIORITY_COUNT);

/** Curated hero-slide picks for homepage sections — indices into HERO_IMAGES only */
export const PRACTICE_CATEGORY_IMAGES = {
  educational: HERO_IMAGES[11],
  architecture: HERO_IMAGES[0],
  interiors: HERO_IMAGES[2],
  urbanism: HERO_IMAGES[8],
};

export const FEATURED_PROJECT_IMAGES = [
  HERO_IMAGES[0],
  HERO_IMAGES[8],
  HERO_IMAGES[3],
  HERO_IMAGES[11],
  HERO_IMAGES[9],
];

export const GALLERY_DOMAIN_IMAGES = {
  education: HERO_IMAGES[11],
  architecture: HERO_IMAGES[1],
  interiors: HERO_IMAGES[5],
  urbanism: HERO_IMAGES[7],
  research: HERO_IMAGES[10],
};

export const TERRITORY_SERVICE_IMAGES = [
  HERO_IMAGES[0],
  HERO_IMAGES[5],
  HERO_IMAGES[6],
  HERO_IMAGES[11],
  HERO_IMAGES[9],
];
