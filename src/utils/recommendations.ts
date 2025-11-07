import type { CollectionEntry } from 'astro:content';

const EXCLUDED_TAGS = new Set(['books', 'projects', 'curiosities', 'rough-notes']);
const EXCLUDED_SLUGS = new Set(['about', 'now', 'vibes']);

const hashStringToSeed = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = Math.imul(31, hash) + text.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
};

const createSeededRandom = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6D2b79f5;
    let result = Math.imul(t ^ (t >>> 15), 1 | t);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleWithSeed = <T>(items: T[], seedKey: string) => {
  const random = createSeededRandom(hashStringToSeed(seedKey));
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

type RecommendationOptions = {
  posts: CollectionEntry<'posts'>[];
  currentSlug?: string;
  currentId?: string;
  limit?: number;
};

export const getEssayRecommendations = ({
  posts,
  currentSlug,
  currentId,
  limit = 10,
}: RecommendationOptions) => {
  if (!posts?.length) return [];

  const candidates = posts.filter((post) => {
    if (currentId && post.id === currentId) return false;
    if (currentSlug && post.slug === currentSlug) return false;
    if (EXCLUDED_SLUGS.has(post.slug)) return false;
    if (post.data.tags?.some((tag) => EXCLUDED_TAGS.has(tag))) return false;
    return true;
  });

  const seedKey = currentSlug ?? currentId ?? 'essays';
  return shuffleWithSeed(candidates, seedKey).slice(0, limit);
};
