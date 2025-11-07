export interface PhilosopherDefinition {
  name: string;
  slug: string;
  aliases?: string[];
}

// Manually curated list—extend this whenever you cite a new thinker.
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
    name: 'Karl Popper',
    slug: 'karl-popper',
    aliases: ['Popper'],
  },
  {
    name: 'Friedrich Nietzsche',
    slug: 'friedrich-nietzsche',
    aliases: ['Nietzsche', 'nietzsche'],
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
    name: 'Terresa Torres',
    slug: 'terresa-torres',
    aliases: ['Terresa Torres', 'Terresa'],
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
    name: 'Richard Feynman',
    slug: 'richard-feynman',
    aliases: ['Feynman'],
  },
  {
    name: 'Alexey Guzey',
    slug: 'alexey-guzey',
    aliases: ['Guzey'],
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
  {
    name: 'Richard Feynman',
    slug: 'richard-feynman',
    aliases: ['Feynman'],
  }
];
