# Lists Data Management

This directory contains data files for the Lists page. Each list is stored in its own TypeScript file with a defined interface.

## How to Add New Entries

### Adding a New TV Show

To add a new TV show to the list, edit the `tvshows.ts` file and add a new object to the `tvShows` array following this format:

```typescript
{
  title: "Show Title",
  creator: "Creator Name",
  year: "YYYY-YYYY", // Use a range for shows that span multiple years
  rating: 9.0, // Your rating out of 10
  description: "A brief description of the show.",
  tags: ["genre1", "genre2"], // Optional array of genres/tags
  notes: "Any personal notes about the show." // Optional
}
```

### Adding a New Movie

To add a new movie to the list, edit the `movies.ts` file and add a new object to the `movies` array following this format:

```typescript
{
  title: "Movie Title",
  director: "Director Name",
  year: 2023, // Release year as a number
  rating: 8.5, // Your rating out of 10
  description: "A brief description of the movie.",
  tags: ["genre1", "genre2"], // Optional array of genres/tags
  notes: "Any personal notes about the movie." // Optional
}
```

## Adding a New List Type

If you want to add a completely new list type (e.g., Books, Games, etc.):

1. Create a new TypeScript file in this directory (e.g., `books.ts`)
2. Define an interface for your list items
3. Export an array of items
4. Update the `src/pages/lists.astro` file to import and display the new list

Example for a new list type:

```typescript
// books.ts
export interface Book {
  title: string;
  author: string;
  year: number;
  rating: number;
  description: string;
  tags?: string[];
  notes?: string;
}

export const books: Book[] = [
  // Add your book entries here
];
```

Then update the Lists page to include the new section. 