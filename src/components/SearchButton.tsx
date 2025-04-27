import { isSearchOpen } from '../store/searchStore';

export default function SearchButton() {
  return (
    <button
      onClick={() => isSearchOpen.set(true)}
      className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      aria-label="Search"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
      <span className="sr-only">Search</span>
    </button>
  );
} 