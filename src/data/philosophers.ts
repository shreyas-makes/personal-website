export interface PhilosopherDefinition {
  name: string;
  slug: string;
  aliases?: string[];
}

export const PHILOSOPHERS: PhilosopherDefinition[] = [
  {
    name: 'Michel de Montaigne',
    slug: 'michel-de-montaigne',
    aliases: ['Montaigne', 'Michel Montaigne'],
  },
  {
    name: 'Nassim Nicholas Taleb',
    slug: 'nassim-nicholas-taleb',
    aliases: ['Nassim Taleb', 'Taleb'],
  },
  {
    name: 'Friedrich Nietzsche',
    slug: 'friedrich-nietzsche',
    aliases: ['Nietzsche'],
  },
  {
    name: 'Arthur Schopenhauer',
    slug: 'arthur-schopenhauer',
    aliases: ['Schopenhauer'],
  },
  {
    name: 'Socrates',
    slug: 'socrates',
  },
  {
    name: 'Plato',
    slug: 'plato',
  },
  {
    name: 'Aristotle',
    slug: 'aristotle',
  },
  {
    name: 'David Hume',
    slug: 'david-hume',
    aliases: ['Hume'],
  },
  {
    name: 'Michel Foucault',
    slug: 'michel-foucault',
    aliases: ['Foucault'],
  },
  {
    name: 'René Descartes',
    slug: 'rene-descartes',
    aliases: ['Rene Descartes', 'Descartes'],
  },
  {
    name: 'Seneca',
    slug: 'seneca',
    aliases: ['Lucius Annaeus Seneca'],
  },
  {
    name: 'Michael Polanyi',
    slug: 'michael-polanyi',
    aliases: ['Polanyi'],
  },
  {
    name: 'David Deutsch',
    slug: 'david-deutsch',
    aliases: ['Deutsch'],
  },
  {
    name: 'Thomas Jefferson',
    slug: 'thomas-jefferson',
    aliases: ['Jefferson'],
  },
];
