import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isSearchOpen } from '../store/searchStore';

interface SearchEntry {
  title: string;
  slug: string;
  excerpt: string;
  tags?: string[];
  type: string;
  searchableText: string;
}

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  tags?: string[];
  type: string;
}

export default function Search({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const $isSearchOpen = useStore(isSearchOpen);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Add cache for search results
  const searchCache = useRef<Record<string, SearchResult[]>>({});

  useEffect(() => {
    if ($isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [$isSearchOpen]);

  // Close search when ESC is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        isSearchOpen.set(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    // Clear results if search is empty
    if (!normalizedQuery) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    // Check cache
    if (searchCache.current[normalizedQuery]) {
      setResults(searchCache.current[normalizedQuery]);
      return;
    }

    const searchResults = searchIndex
      .filter((entry) => entry.searchableText.includes(normalizedQuery))
      .map((entry) => {
        return {
          title: entry.title,
          slug: entry.slug,
          excerpt: entry.excerpt,
          tags: entry.tags,
          type: entry.type
        };
      });

    setResults(searchResults);
    searchCache.current[normalizedQuery] = searchResults;
    setSelectedIndex(0);
  };

  const getUrl = (result: SearchResult) => {
    if (result.type === 'book') {
      // Always remove 'booknotes/' from the slug for books
      return `/books/${result.slug.replace('booknotes/', '')}`;
    }
    return `/${result.slug}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      const url = getUrl(results[selectedIndex]);
      isSearchOpen.set(false);

      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          window.location.href = url;
        });
      } else {
        window.location.href = url;
      }
    }
  };

  const handleResultClick = (e: React.MouseEvent, result: SearchResult) => {
    e.preventDefault();
    const url = getUrl(result);
    isSearchOpen.set(false);

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        window.location.href = url;
      });
    } else {
      window.location.href = url;
    }
  };

  if (!$isSearchOpen) return null;

  return (
    <div className={`fixed inset-0 ${$isSearchOpen ? 'block' : 'hidden'} z-[100] px-4 sm:px-6 md:px-8`}>
      {/* Overlay - update background color to match theme */}
      <div 
        className="fixed inset-0 bg-[#FFFFFF] transition-opacity"
        onClick={() => isSearchOpen.set(false)}
      />
      
      {/* Search modal */}
      <div className="relative mx-auto max-w-3xl transform divide-y divide-gray-200 overflow-hidden rounded-lg bg-[#FFFFFF] shadow-2xl ring-2 ring-black transition-all mt-16">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            className="block w-full border-0 bg-transparent py-4 pl-6 pr-12 text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-none focus:border-black sm:text-sm"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Results */}
        <div 
          ref={resultsContainerRef}
          className="max-h-[60vh] overflow-y-auto"
        >
          {query && (
            <div className="px-6 py-3">
              {results.length > 0 ? (
                <ul className="divide-y divide-gray-100 ">
                  {results.map((result, index) => (
                    <li key={result.slug}>
                      <a 
                        href={getUrl(result)}
                        className="block px-6 py-4 hover:bg-gray-100 -mx-6 transition-colors duration-150"
                        onClick={(e) => handleResultClick(e, result)}
                        data-astro-prefetch="viewport"
                      >
                        <h3 className="text-base font-normal text-gray-900 ">
                          {result.title}
                        </h3>
                        {result.tags && (
                          <div className="mt-1 text-sm text-gray-500 ">
                            {result.tags.join(', ')}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-12">
                  No results found for "{query}"
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
