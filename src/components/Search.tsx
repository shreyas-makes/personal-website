import { useState, useEffect, useRef } from 'react';
import type { CollectionEntry } from 'astro:content';
import { useStore } from '@nanostores/react';
import { isSearchOpen } from '../store/searchStore';

interface SearchProps {
  posts: CollectionEntry<'posts'>[];
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  tags?: string[];
  type: string;
}

export default function Search({ posts }: { posts: CollectionEntry<'posts'>[] }) {
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
    setQuery(searchQuery); // Set query first
    
    // Clear results if search is empty
    if (!searchQuery.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    // Check cache
    if (searchCache.current[searchQuery]) {
      setResults(searchCache.current[searchQuery]);
      return;
    }

    const searchResults = posts
      .filter(post => {
        const searchContent = [
          post.data.title,
          post.data.tags?.join(' ') || '',
          post.body,
        ].join(' ').toLowerCase();
        
        return searchContent.includes(searchQuery.toLowerCase());
      })
      .map(post => {
        // Find the position of the search term in the content
        const searchIndex = post.body.toLowerCase().indexOf(searchQuery.toLowerCase());
        let excerpt = '';
        
        if (searchIndex >= 0) {
          // Get some context around where the search term appears
          const start = Math.max(0, searchIndex - 60);
          const end = Math.min(post.body.length, searchIndex + 100);
          excerpt = post.body.slice(start, end);
          
          // Add ellipsis if we're not at the start/end
          if (start > 0) excerpt = '...' + excerpt;
          if (end < post.body.length) excerpt = excerpt + '...';
        } else {
          // If search term is not in content, show beginning of post
          excerpt = post.body.slice(0, 150) + '...';
        }

        return {
          title: post.data.title,
          slug: post.slug,
          excerpt,
          tags: post.data.tags,
          type: post.data.tags?.includes('books') ? 'book' : 'post'
        };
      });

    setResults(searchResults);
    searchCache.current[searchQuery] = searchResults;
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

      // Get current theme before navigation
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          // Preserve the current theme state
          localStorage.setItem('theme', currentTheme);
          document.cookie = `theme=${currentTheme};path=/;max-age=31536000`;
          window.location.href = url;
        });
      } else {
        localStorage.setItem('theme', currentTheme);
        document.cookie = `theme=${currentTheme};path=/;max-age=31536000`;
        window.location.href = url;
      }
    }
  };

  const handleResultClick = (e: React.MouseEvent, result: SearchResult) => {
    e.preventDefault();
    const url = getUrl(result);
    isSearchOpen.set(false);
    
    // Get current theme before navigation
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        // Preserve the current theme state
        localStorage.setItem('theme', currentTheme);
        document.cookie = `theme=${currentTheme};path=/;max-age=31536000`;
        window.location.href = url;
      });
    } else {
      localStorage.setItem('theme', currentTheme);
      document.cookie = `theme=${currentTheme};path=/;max-age=31536000`;
      window.location.href = url;
    }
  };

  if (!$isSearchOpen) return null;

  return (
    <div className={`fixed inset-0 ${$isSearchOpen ? 'block' : 'hidden'} z-[100] px-4 sm:px-6 md:px-8`}>
      {/* Overlay - update background color to match theme */}
      <div 
        className="fixed inset-0 bg-[#FFFFFF] dark:bg-gray-900/75 transition-opacity"
        onClick={() => isSearchOpen.set(false)}
      />
      
      {/* Search modal */}
      <div className="relative mx-auto max-w-3xl transform divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden rounded-lg bg-[#FFFFFF] dark:bg-[#161618] shadow-2xl ring-2 ring-black dark:ring-white transition-all mt-16">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            className="block w-full border-0 bg-transparent py-4 pl-6 pr-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:border-black dark:focus:border-white sm:text-sm"
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
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {results.map((result, index) => (
                    <li key={result.slug}>
                      <a 
                        href={getUrl(result)}
                        className="block px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 -mx-6 transition-colors duration-150"
                        onClick={(e) => handleResultClick(e, result)}
                        data-astro-prefetch="viewport"
                      >
                        <h3 className="text-base font-normal text-gray-900 dark:text-gray-100">
                          {result.title}
                        </h3>
                        {result.tags && (
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {result.tags.join(', ')}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-12">
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