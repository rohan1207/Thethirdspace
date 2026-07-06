/**
 * Preload a single image URL. Resolves even on error so callers never hang.
 */
export function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, ok: true });
    img.onerror = () => resolve({ src, ok: false });
    img.src = src;
  });
}

/** Preload multiple images in parallel */
export function preloadImages(urls) {
  return Promise.all(urls.map(preloadImage));
}

/** Fire-and-forget background preload */
export function preloadImagesInBackground(urls) {
  urls.forEach((src) => {
    preloadImage(src);
  });
}
