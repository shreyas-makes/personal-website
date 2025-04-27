export interface MediaItem {
  title: string;
  rating: number;
  notes?: string;
  type: 'Movie' | 'TV Show' | 'Podcast' | string;
}

export const mediaList: MediaItem[] = [
  {
    title: "The Shawshank Redemption",
    rating: 9.3,
    notes: "Based on a Stephen King novella, this film is celebrated for its themes of hope and redemption.",
    type: "Movie"
  },
  {
    title: "The Godfather",
    rating: 9.2,
    notes: "Considered one of the greatest films ever made, with Marlon Brando's iconic performance as Vito Corleone.",
    type: "TV Show"
  },
  {
    title: "Parasite",
    rating: 8.5,
    notes: "The first non-English language film to win the Academy Award for Best Picture, praised for its social commentary and direction.",
    type: "Movie"
  },
  {
    title: "The Dark Knight",
    rating: 9,
    notes: "I still remember the hospital explosion scene. It's one of the most iconic scenes in cinema history.",
    type: "Movie"
  },
  {
    title: "Man in the High Castle",
    rating: 8,
    notes: "The last season was unpredictable. I did enjoy the alternate history woven by the director, and the fictitious ability to move across the universes",
    type: "TV Show"
  }
]; 