import type { PhilosopherDefinition } from '../data/philosophers';
import { PHILOSOPHERS } from '../data/philosophers';

export interface CompiledPhilosopher extends PhilosopherDefinition {
  regex: RegExp | null;
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildVariantPattern = (variant: string) => {
  return variant
    .trim()
    .split(/\s+/)
    .map((part) => escapeRegex(part))
    .join('\\s+');
};

const buildMatchRegex = (variants: string[]) => {
  const pattern = variants
    .filter((variant) => !!variant?.trim())
    .map((variant) => buildVariantPattern(variant))
    .sort((a, b) => b.length - a.length)
    .join('|');

  return pattern ? new RegExp(`\\b(?:${pattern})\\b`, 'gi') : null;
};

export const countMatches = (text: string, regex: RegExp) => {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

export const compilePhilosophers = (
  philosophers: PhilosopherDefinition[] = PHILOSOPHERS
): CompiledPhilosopher[] =>
  philosophers.map((philosopher) => ({
    ...philosopher,
    regex: buildMatchRegex([philosopher.name, ...(philosopher.aliases ?? [])]),
  }));

export const compiledPhilosophers = compilePhilosophers();
