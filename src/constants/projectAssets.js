/** Image paths under public/ — one folder per project with main.webp + gallery*.webp */

export const PROJECT_GALLERY_FILES = {
  "pavilion-pool": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery8.webp",
    "gallery9.webp",
    "gallery10.webp",
    "gallery11.webp",
    "gallery27.webp",
  ],
  "formist-treehouse": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.webp",
    "gallery8.webp",
    "gallery9.webp",
    "gallery10.webp",
    "gallery11.webp",
  ],
  "hover-space": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery8.webp",
    "gallery9.webp",
    "gallery10.webp",
    "gallery11.webp",
  ],
  "solid-semi-void": [
    "gallery.webp",
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.webp",
    "gallery8.webp",
    "gallery9.webp",
    "gallery10.webp",
    "gallery11.webp",
  ],
  "figured-ground": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.webp",
    "gallery8.webp",
    "gallery9.webp",
    "gallery10.webp",
    "gallery11.webp",
  ],
  "kle-centenary": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.webp",
  ],
  "stacked-student": [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.webp",
  ],
  skylights: [
    "gallery1.webp",
    "gallery2.webp",
    "gallery3.webp",
    "gallery4.webp",
  ],
};

export function buildProjectAssets(folder) {
  const base = `/${folder}`;
  const files = PROJECT_GALLERY_FILES[folder] ?? [];
  const gallery = files.map((file) => `${base}/${file}`);
  const image = `${base}/main.webp`;
  return {
    folder,
    image,
    gallery,
    slideshow: [image, ...gallery],
    allImages: [image, ...gallery],
  };
}
