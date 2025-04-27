interface CacheEntry {
  coverUrl: string;
  timestamp: number;
}

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function getCoverUrl(title: string, isbn?: string): Promise<string> {
  // Check localStorage cache
  const cacheKey = isbn ? `book-cover-isbn-${isbn}` : `book-cover-${title}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const entry: CacheEntry = JSON.parse(cached);
    if (Date.now() - entry.timestamp < CACHE_DURATION) {
      return entry.coverUrl;
    }
  }

  try {
    // Use ISBN if available, otherwise fall back to title search
    const query = isbn 
      ? `isbn:${isbn}`
      : encodeURIComponent(title);
      
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`
    );
    const data = await response.json();
    
    let coverUrl = '/images/placeholder-book-cover.jpg';
    if (data.items && data.items[0]?.volumeInfo?.imageLinks?.thumbnail) {
      coverUrl = data.items[0].volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
    }

    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      coverUrl,
      timestamp: Date.now()
    }));

    return coverUrl;
  } catch (error) {
    console.error(`Error fetching cover for ${isbn || title}:`, error);
    return '/images/placeholder-book-cover.jpg';
  }
} 