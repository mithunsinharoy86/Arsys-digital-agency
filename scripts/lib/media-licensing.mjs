/**
 * media-licensing.mjs
 * Image Source Validation & Licence Tracking for Klyro Works
 */

import fs from 'node:fs';
import path from 'node:path';

const MEDIA_REGISTRY_PATH = path.resolve('data/content-intelligence/media-registry.json');

/**
 * Load verified media registry
 */
export function loadMediaRegistry() {
  if (fs.existsSync(MEDIA_REGISTRY_PATH)) {
    try {
      const data = fs.readFileSync(MEDIA_REGISTRY_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.warn(`[media-licensing] Error loading media registry: ${e.message}`);
    }
  }
  return { images: [] };
}

/**
 * Save media registry
 */
export function saveMediaRegistry(registry) {
  fs.writeFileSync(MEDIA_REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf-8');
}

/**
 * Validate that an image complies with licensing terms
 */
export function validateImageLicence(imageEntry) {
  const allowedSources = ['Unsplash', 'Pexels', 'Pixabay', 'Wikimedia Commons', 'Original'];
  if (!imageEntry.source || !allowedSources.includes(imageEntry.source)) {
    return { valid: false, error: `Invalid image source: ${imageEntry.source}. Allowed: ${allowedSources.join(', ')}` };
  }
  if (!imageEntry.licenceUrl || !imageEntry.licenceUrl.startsWith('http')) {
    return { valid: false, error: `Invalid licence URL: ${imageEntry.licenceUrl}` };
  }
  if (!imageEntry.imageUrl || !imageEntry.imageUrl.startsWith('http')) {
    return { valid: false, error: `Invalid image URL: ${imageEntry.imageUrl}` };
  }
  if (!imageEntry.photographer || imageEntry.photographer.trim().length === 0) {
    return { valid: false, error: 'Missing photographer credit/attribution' };
  }
  return { valid: true };
}

/**
 * Select a verified royalty-free image matching the article's service and industry
 */
export function selectImageForTopic(serviceId, industry) {
  const registry = loadMediaRegistry();
  const images = registry.images || [];

  // Match by service or industry tag
  const matching = images.filter(img => {
    const tags = (img.tags || []).map(t => t.toLowerCase());
    return tags.includes(serviceId.toLowerCase()) || (industry && tags.includes(industry.toLowerCase()));
  });

  const pool = matching.length > 0 ? matching : images;
  if (pool.length === 0) {
    // Fallback verified Unsplash tech image
    return {
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
      source: 'Unsplash',
      licenceUrl: 'https://unsplash.com/license',
      photographer: 'Carlos Muza',
      credit: 'Photo by Carlos Muza on Unsplash (Free to use under Unsplash License)',
    };
  }

  // Random pick from matching pool
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return {
    imageUrl: pick.imageUrl,
    source: pick.source,
    licenceUrl: pick.licenceUrl,
    photographer: pick.photographer,
    credit: `Photo by ${pick.photographer} on ${pick.source} (${pick.licenceUrl})`,
  };
}
