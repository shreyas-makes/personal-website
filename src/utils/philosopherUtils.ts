import type { CollectionEntry } from 'astro:content';
import type { PhilosopherDefinition } from '../data/philosophers';
import { PHILOSOPHERS } from '../data/philosophers';
import { compiledPhilosophers, countMatches } from './philosopherMatcher';

export interface PhilosopherInfluence {
  name: string;
  slug: string;
  count: number;
}

export interface PhilosopherMention {
  post: CollectionEntry<'posts'>;
  count: number;
}

const getSearchableText = (post: CollectionEntry<'posts'>) => {
  return [
    post.data.title ?? '',
    post.data.summary ?? '',
    post.data.description ?? '',
    post.body ?? '',
  ].join(' ');
};

const getCompiledPhilosopherBySlug = (slug: string) =>
  compiledPhilosophers.find((philosopher) => philosopher.slug === slug);

export const getInfluenceStats = (
  posts: CollectionEntry<'posts'>[],
  limit = 10
): PhilosopherInfluence[] => {
  const searchablePosts = posts.map((post) => ({
    ref: post,
    text: getSearchableText(post),
  }));

  const influences: PhilosopherInfluence[] = [];

  compiledPhilosophers.forEach(({ name, slug, regex }) => {
    if (!regex) return;

    const total = searchablePosts.reduce((acc, { text }) => acc + countMatches(text, regex), 0);

    if (total > 0) {
      influences.push({ name, slug, count: total });
    }
  });

  return influences
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getPhilosopherMentions = (
  posts: CollectionEntry<'posts'>[],
  slug: string
): {
  philosopher: PhilosopherDefinition | null;
  mentions: PhilosopherMention[];
} => {
  const compiled = getCompiledPhilosopherBySlug(slug);

  if (!compiled || !compiled.regex) {
    return { philosopher: null, mentions: [] };
  }

  const searchablePosts = posts.map((post) => ({
    ref: post,
    text: getSearchableText(post),
  }));

  const mentions: PhilosopherMention[] = [];

  searchablePosts.forEach(({ ref, text }) => {
    const mentionCount = countMatches(text, compiled.regex!);
    if (mentionCount > 0) {
      mentions.push({ post: ref, count: mentionCount });
    }
  });

  mentions.sort((a, b) => {
    const dateA = a.post.data.date ? new Date(a.post.data.date).getTime() : 0;
    const dateB = b.post.data.date ? new Date(b.post.data.date).getTime() : 0;
    return dateB - dateA;
  });

  const { regex: _regex, ...philosopher } = compiled;

  return {
    philosopher,
    mentions,
  };
};
