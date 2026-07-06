import { PROJECT_GALLERY_FILES } from "./projectAssets";

export const PROJECT_FOLDERS = [
  "pavilion-pool",
  "formist-treehouse",
  "hover-space",
  "solid-semi-void",
  "figured-ground",
  "kle-centenary",
  "stacked-student",
  "skylights",
];

export function projectImage(folder, file = "main.webp") {
  return `/${folder}/${file}`;
}

export function projectGalleryPick(folder, index = 0) {
  const files = PROJECT_GALLERY_FILES[folder];
  if (!files?.length) return projectImage(folder);
  return projectImage(folder, files[Math.min(index, files.length - 1)]);
}

/** All project hero images */
export const PROJECT_MAIN_IMAGES = PROJECT_FOLDERS.map((folder) => projectImage(folder));

/** Extra gallery picks when more hero variety is needed */
export const HERO_GALLERY_EXTRAS = PROJECT_FOLDERS.map((folder, i) =>
  projectGalleryPick(folder, i % 2)
);

/** Homepage hero slideshow — mains first, then gallery picks */
export const HERO_IMAGES = [...PROJECT_MAIN_IMAGES, ...HERO_GALLERY_EXTRAS];

export const HERO_PRIORITY_COUNT = 6;
export const HERO_PRIORITY_IMAGES = HERO_IMAGES.slice(0, HERO_PRIORITY_COUNT);
export const HERO_BACKGROUND_IMAGES = HERO_IMAGES.slice(HERO_PRIORITY_COUNT);

/** Inner page heroes and section images */
export const PAGE_HERO_IMAGES = {
  work: projectImage("hover-space"),
  about: projectImage("figured-ground"),
  aboutStory: projectGalleryPick("kle-centenary", 1),
  aboutStudios: projectImage("stacked-student"),
  contact: projectImage("pavilion-pool"),
  contactSide: projectImage("formist-treehouse"),
  capabilities: projectImage("solid-semi-void"),
  insights: projectGalleryPick("figured-ground", 3),
};

export const PRACTICE_CATEGORY_IMAGES = {
  educational: projectImage("figured-ground"),
  architecture: projectImage("hover-space"),
  interiors: projectImage("pavilion-pool"),
  urbanism: projectImage("formist-treehouse"),
};

export const FEATURED_PROJECT_IMAGES = PROJECT_MAIN_IMAGES.slice(0, 5);

export const GALLERY_DOMAIN_IMAGES = {
  education: projectImage("stacked-student"),
  architecture: projectImage("hover-space"),
  interiors: projectImage("pavilion-pool"),
  urbanism: projectImage("formist-treehouse"),
  research: projectImage("solid-semi-void"),
};

export const TERRITORY_SERVICE_IMAGES = [
  projectImage("hover-space"),
  projectImage("pavilion-pool"),
  projectImage("formist-treehouse"),
  projectImage("figured-ground"),
  projectImage("kle-centenary"),
];

export const NARRATIVE_SCROLL_IMAGES = [
  projectImage("pavilion-pool"),
  projectImage("formist-treehouse"),
  projectImage("hover-space"),
  projectImage("solid-semi-void"),
  projectImage("figured-ground"),
];

export const INSIGHT_IMAGES = {
  featured: projectImage("hover-space"),
  education: projectImage("stacked-student"),
  studio: projectImage("formist-treehouse"),
  material: projectGalleryPick("solid-semi-void", 2),
  urbanism: projectGalleryPick("formist-treehouse", 4),
  research: projectGalleryPick("kle-centenary", 0),
};
