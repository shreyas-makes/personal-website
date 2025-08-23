import React, { useState, useEffect, useRef } from 'react';
import { getCoverUrl } from '../utils/bookCovers';
import type { ImageMetadata } from 'astro';

interface Book {
  title: string;
  slug: string;
  cover?: string;
  spineColor: string;
  isbn?: string;
}

interface BooksProps {
  books: {
    title: string;
    slug: string;
    isbn?: string;
    cover?: string;
  }[];
}

export default function Books({ books }: BooksProps) {
  const [booksWithCovers, setBooksWithCovers] = useState<Book[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [scroll, setScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  
  // Adjust dimensions to ensure perfect alignment
  const width = 40;  // Base spine width
  const height = 220;  // Fixed height
  const spineWidth = `${width}px`;
  const coverWidth = `${width * 3}px`;  // Cover is 3x spine width
  const bookWidth = `${width * 4}px`;   // Total width should match spine + cover
  
  // Add this state to track the maximum scroll value
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Create infinite repeating books array
  const createInfiniteBooks = (books: Book[]) => {
    // Repeat the books array 3 times to create an infinite effect
    return [...books, ...books, ...books];
  };

  const getRandomSpineColor = () => {
    const colors = [
      'bg-red-900', 'bg-blue-900', 'bg-green-900', 
      'bg-purple-900', 'bg-indigo-900', 'bg-yellow-900'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const booksWithStyles = books.map(book => ({
      ...book,
      spineColor: getRandomSpineColor()
    }));
    const infiniteBooks = createInfiniteBooks(booksWithStyles);
    setBooksWithCovers(infiniteBooks);
  }, [books]);

  // Add this useEffect to calculate maxScroll when books or viewport changes
  useEffect(() => {
    const calculateMaxScroll = () => {
      if (!viewportRef.current) return;
      
      // Calculate total width of all books (spines only)
      const totalBooksWidth = booksWithCovers.length * width;
      const viewportWidth = viewportRef.current.clientWidth;
      
      // Set max scroll to ensure we can see all books
      const newMaxScroll = Math.max(0, totalBooksWidth - viewportWidth + 100); // Add padding
      setMaxScroll(newMaxScroll);
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, [booksWithCovers, width]);

  const handleScroll = (direction: 'left' | 'right') => {
    setIsScrolling(true);
    
    if (selectedIndex !== -1) {
      // If a book is selected, move to next/previous book
      const originalBooksLength = books.length;
      let newIndex;
      
      if (direction === 'left') {
        newIndex = selectedIndex - 1;
        // If we go below 0, wrap to the end of the middle section
        if (newIndex < originalBooksLength) {
          newIndex = originalBooksLength * 2 - 1;
        }
      } else {
        newIndex = selectedIndex + 1;
        // If we go above the end, wrap to the beginning of the middle section
        if (newIndex >= originalBooksLength * 2) {
          newIndex = originalBooksLength;
        }
      }
      
      setSelectedIndex(newIndex);
      
      // Calculate scroll position to center the selected book
      if (viewportRef.current) {
        const viewportWidth = viewportRef.current.clientWidth;
        const bookPosition = newIndex * width;
        const expandedBookWidth = width * 4 + 48; // spine + cover + margin
        
        // Calculate the center position for infinite scroll
        const targetScroll = bookPosition - (viewportWidth / 2) + (expandedBookWidth / 2);
        setScroll(targetScroll);
      }
    } else {
      // If no book is selected, just scroll
      const scrollAmount = width * 4;
      setScroll(prevScroll => {
        const newScroll = direction === 'left' 
          ? prevScroll - scrollAmount
          : prevScroll + scrollAmount;
        return newScroll;
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

  // Add effect to handle scroll position when selecting/deselecting books
  useEffect(() => {
    if (!viewportRef.current) return;
    
    if (selectedIndex !== -1) {
      // Center the selected book in the viewport
      const bookPosition = selectedIndex * width;
      const viewportWidth = viewportRef.current.clientWidth;
      const expandedBookWidth = width * 4 + 48; // spine + cover + margin
      
      // Calculate the center position for infinite scroll
      const targetScroll = bookPosition - (viewportWidth / 2) + (expandedBookWidth / 2);
      
      // For infinite scroll, we don't need to worry about boundaries
      // The books repeat, so we can always center any book
      setScroll(targetScroll);
    }
  }, [selectedIndex]);

  const handleBookClick = (index: number, slug: string) => {
    if (index === selectedIndex) {
      // If clicking the same book again, navigate to its page
      // For infinite scroll, we need to get the original slug from the middle section
      const originalBooksLength = books.length;
      const originalIndex = index % originalBooksLength;
      const originalSlug = books[originalIndex].slug;
      window.location.href = `/books/${originalSlug.replace('booknotes/', '')}`;
    } else {
      // If clicking a different book, expand it in the bookshelf
      setSelectedIndex(index);
      
      // Add a delay to ensure the expansion animation completes, then scroll to center both
      setTimeout(() => {
        // First, ensure the bookshelf is positioned correctly
        if (viewportRef.current) {
          const viewportWidth = viewportRef.current.clientWidth;
          const bookPosition = index * width;
          const expandedBookWidth = width * 4 + 48;
          
          // Calculate the center position for infinite scroll
          const targetScroll = bookPosition - (viewportWidth / 2) + (expandedBookWidth / 2);
          setScroll(targetScroll);
        }
        
        // Then scroll to the detailed section below, but keep the bookshelf visible and centered
        // For infinite scroll, we need to get the original slug from the middle section
        const originalBooksLength = books.length;
        const originalIndex = index % originalBooksLength;
        const originalSlug = books[originalIndex].slug;
        const element = document.getElementById(originalSlug);
        if (element) {
          // Calculate position to show both bookshelf and details
          const bookshelfHeight = 250; // Approximate height of bookshelf
          const elementTop = element.offsetTop;
          
          // Scroll to position the details section below the bookshelf
          // This keeps the bookshelf visible at the top with the expanded book centered
          window.scrollTo({
            top: Math.max(0, elementTop - bookshelfHeight - 100), // More buffer to keep bookshelf visible
            behavior: 'smooth'
          });
        }
      }, 600);
    }
  };

  return (
    <div className={`relative w-full ${selectedIndex !== -1 ? 'ring-2 ring-blue-500 ring-opacity-25 p-2' : ''}`}>
      <div 
        ref={viewportRef}
        className="overflow-hidden"
      >
        <div 
          className="flex"
          style={{ 
            transform: `translateX(-${scroll}px)`,
            transition: isScrolling ? 'transform 300ms ease-in-out' : 'none',
            gap: '0px',
            width: 'fit-content',
            padding: '8px 0'
          }}
        >
          {booksWithCovers.map((book, index) => (
            <button
              key={book.title}
              onClick={() => handleBookClick(index, book.slug)}
              className="flex-shrink-0 flex items-center relative"
              style={{
                width: index === selectedIndex ? `calc(${bookWidth} + 48px)` : spineWidth,
                height: `${height}px`,
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
                marginRight: '0px',
                perspective: '1000px',
                padding: index === selectedIndex ? '8px 0' : '0',
                zIndex: index === selectedIndex ? 10 : 1,
              }}
            >
              {/* Book spine */}
              <div
                className={`h-full flex items-start justify-center ${book.spineColor} ${index === selectedIndex ? 'ring-2 ring-blue-500 ring-opacity-75' : ''}`}
                style={{
                  width: spineWidth,
                  transformOrigin: 'right',
                  transform: `rotateY(${index === selectedIndex ? '-60deg' : '0deg'})`,
                  transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: index === selectedIndex 
                    ? '-2px 0 4px rgba(0,0,0,0.2)' 
                    : 'none',
                  position: 'absolute',
                  left: '0',
                  zIndex: 2,
                  backgroundColor: index === selectedIndex ? 'rgba(59, 130, 246, 0.1)' : undefined,
                }}
              >
                <span 
                  className="writing-vertical-rl whitespace-nowrap overflow-hidden text-sm font-medium text-white mt-3 px-2"
                  style={{ 
                    transform: 'rotate(180deg)',
                    maxHeight: '180px',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {book.title}
                </span>
              </div>

              {/* Book cover */}
              <div
                style={{
                  width: coverWidth,
                  height: '100%',
                  position: 'absolute',
                  left: width + 'px',
                  transformOrigin: 'left',
                  transform: index === selectedIndex ? 'rotateY(0deg)' : 'rotateY(90deg)',
                  transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  borderRadius: '0',
                  boxShadow: index === selectedIndex 
                    ? '4px 4px 8px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.1)' 
                    : 'none',
                  zIndex: 1,
                  marginRight: index === selectedIndex ? '48px' : '0',
                }}
              >
                <img
                  src={book.cover || '/images/placeholder-book-cover.jpg'}
                  alt={book.title}
                  className="w-full h-full"
                  style={{
                    objectFit: 'fill',
                    backfaceVisibility: 'hidden',
                    borderRadius: '0',
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Show right scroll button if there are more books to show or if we're not at the last book */}
      {(scroll < maxScroll || (selectedIndex !== -1 && selectedIndex < booksWithCovers.length - 1)) && (
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 dark:bg-gray-800/80 rounded-l-lg p-2
                     hover:bg-white dark:hover:bg-gray-800"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Show left scroll button if we can scroll left or if we're not at the first book */}
      {(scroll > 0 || (selectedIndex !== -1 && selectedIndex > 0)) && (
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 dark:bg-gray-800/80 rounded-r-lg p-2
                     hover:bg-white dark:hover:bg-gray-800"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
} 