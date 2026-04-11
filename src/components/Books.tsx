import React, { useState, useEffect, useRef } from 'react';

interface Book {
  title: string;
  slug: string;
  cover?: string;
  spineStyle: {
    background: string;
    border: string;
    shadow: string;
  };
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
  
  const width = 56;
  const height = 300;
  const selectedSpacing = 64;
  const spineWidth = `${width}px`;
  const coverWidth = `${width * 3}px`;
  const bookWidth = `${width * 4}px`;
  
  const createInfiniteBooks = (books: Book[]) => {
    return [...books, ...books, ...books];
  };

  const getLoopWidth = () => books.length * width;

  const normalizeScroll = (value: number) => {
    const loopWidth = getLoopWidth();

    if (loopWidth === 0) return 0;

    if (value < loopWidth) {
      return value + loopWidth;
    }

    if (value >= loopWidth * 2) {
      return value - loopWidth;
    }

    return value;
  };

  const getRandomSpineStyle = () => {
    const styles = [
      {
        background:
          'linear-gradient(180deg, hsl(12 70% 52%) 0%, hsl(6 64% 34%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 22%, transparent)',
        shadow: 'hsla(12 70% 40% / 0.24)',
      },
      {
        background:
          'linear-gradient(180deg, hsl(218 58% 45%) 0%, hsl(228 52% 28%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 20%, transparent)',
        shadow: 'hsla(222 60% 28% / 0.24)',
      },
      {
        background:
          'linear-gradient(180deg, hsl(146 46% 40%) 0%, hsl(154 42% 24%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 22%, transparent)',
        shadow: 'hsla(150 42% 22% / 0.24)',
      },
      {
        background:
          'linear-gradient(180deg, hsl(278 48% 46%) 0%, hsl(286 42% 29%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 14%, transparent)',
        shadow: 'hsla(282 42% 26% / 0.24)',
      },
      {
        background:
          'linear-gradient(180deg, hsl(42 76% 56%) 0%, hsl(31 72% 36%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 18%, transparent)',
        shadow: 'hsla(34 72% 34% / 0.24)',
      },
      {
        background:
          'linear-gradient(180deg, hsl(342 62% 54%) 0%, hsl(334 54% 34%) 100%)',
        border: 'color-mix(in srgb, var(--color-bg-body) 18%, transparent)',
        shadow: 'hsla(336 56% 32% / 0.24)',
      },
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  };

  useEffect(() => {
    const booksWithStyles = books.map(book => ({
      ...book,
      spineStyle: getRandomSpineStyle()
    }));
    const infiniteBooks = createInfiniteBooks(booksWithStyles);
    setBooksWithCovers(infiniteBooks);
    setSelectedIndex(-1);
    setScroll(getLoopWidth());
  }, [books]);

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
        const expandedBookWidth = width * 4 + selectedSpacing;
        
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
        return normalizeScroll(newScroll);
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
      const expandedBookWidth = width * 4 + selectedSpacing;
      
      // Calculate the center position for infinite scroll
      const targetScroll = bookPosition - (viewportWidth / 2) + (expandedBookWidth / 2);
      
      // For infinite scroll, we don't need to worry about boundaries
      // The books repeat, so we can always center any book
      setScroll(normalizeScroll(targetScroll));
    }
  }, [selectedIndex, books.length]);

  const handleBookClick = (index: number) => {
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
          const expandedBookWidth = width * 4 + selectedSpacing;
          
          // Calculate the center position for infinite scroll
          const targetScroll = bookPosition - (viewportWidth / 2) + (expandedBookWidth / 2);
          setScroll(normalizeScroll(targetScroll));
        }
        
        // Then scroll to the detailed section below, but keep the bookshelf visible and centered
        // For infinite scroll, we need to get the original slug from the middle section
        const originalBooksLength = books.length;
        const originalIndex = index % originalBooksLength;
        const originalSlug = books[originalIndex].slug;
        const element = document.getElementById(originalSlug);
        if (element) {
          // Calculate position to show both bookshelf and details
          const bookshelfHeight = height + 72;
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
    <div
      className="relative w-full"
      style={{
        padding: 'var(--space-100) 0 var(--space-150)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-4"
        style={{
          height: '18px',
          marginInline: 'var(--space-400)',
          borderRadius: 'var(--radius-pill)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-text-primary) 10%, var(--color-bg-body) 90%) 0%, color-mix(in srgb, var(--color-text-primary) 18%, var(--color-bg-body) 82%) 100%)',
          boxShadow: '0 10px 22px color-mix(in srgb, var(--color-text-primary) 12%, transparent)',
        }}
      />
      <div 
        ref={viewportRef}
        className="overflow-hidden relative"
        style={{ padding: 'var(--space-150) var(--space-400) var(--space-300)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: '56px',
            background: 'linear-gradient(90deg, var(--color-bg-body) 0%, color-mix(in srgb, var(--color-bg-body) 55%, transparent) 52%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: '56px',
            background: 'linear-gradient(270deg, var(--color-bg-body) 0%, color-mix(in srgb, var(--color-bg-body) 55%, transparent) 52%, transparent 100%)',
          }}
        />
        <div 
          className="flex"
          style={{ 
            transform: `translateX(-${scroll}px)`,
            transition: isScrolling ? 'transform 300ms ease-in-out' : 'none',
            gap: '0px',
            width: 'fit-content',
            padding: '12px 0 20px',
            minHeight: `${height + 36}px`,
            alignItems: 'flex-end'
          }}
        >
          {booksWithCovers.map((book, index) => (
            <button
              key={`${book.slug}-${index}`}
              onClick={() => handleBookClick(index)}
              className="flex-shrink-0 flex items-center relative"
              aria-label={`Open ${book.title}`}
              style={{
                width: index === selectedIndex ? `calc(${bookWidth} + ${selectedSpacing}px)` : spineWidth,
                height: `${height}px`,
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
                marginRight: '0px',
                perspective: '1000px',
                padding: index === selectedIndex ? '10px 0' : '0',
                zIndex: index === selectedIndex ? 10 : 1,
                transform: index === selectedIndex ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              <div
                className="h-full flex items-start justify-center"
                style={{
                  width: spineWidth,
                  transformOrigin: 'right',
                  transform: `rotateY(${index === selectedIndex ? '-60deg' : '0deg'})`,
                  transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: index === selectedIndex
                    ? `-10px 10px 22px ${book.spineStyle.shadow}`
                    : `0 8px 18px ${book.spineStyle.shadow}`,
                  position: 'absolute',
                  left: '0',
                  zIndex: 2,
                  background: book.spineStyle.background,
                  borderTopLeftRadius: 'var(--radius-md)',
                  borderBottomLeftRadius: 'var(--radius-md)',
                  borderTop: `1px solid ${book.spineStyle.border}`,
                  borderLeft: `1px solid ${book.spineStyle.border}`,
                  borderBottom: `1px solid color-mix(in srgb, ${book.spineStyle.border} 75%, transparent)`,
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '0',
                    background:
                      'linear-gradient(90deg, color-mix(in srgb, var(--color-bg-body) 20%, transparent) 0%, transparent 24%, transparent 76%, color-mix(in srgb, var(--color-text-primary) 14%, transparent) 100%)',
                  }}
                />
                <span 
                  className="writing-vertical-rl whitespace-nowrap overflow-hidden mt-4 px-2"
                  style={{ 
                    transform: 'rotate(180deg)',
                    maxHeight: '240px',
                    textOverflow: 'ellipsis',
                    color: 'var(--color-bg-body)',
                    fontSize: 'calc(var(--font-size-ui-sm) + 2px)',
                    fontWeight: 'var(--font-weight-strong)',
                    letterSpacing: '0.08em',
                    lineHeight: 1.1,
                    textShadow: '0 1px 2px color-mix(in srgb, var(--color-text-primary) 35%, transparent)',
                  }}
                >
                  {book.title}
                </span>
              </div>

              <div
                style={{
                  width: coverWidth,
                  height: '100%',
                  position: 'absolute',
                  left: width + 'px',
                  transformOrigin: 'left',
                  transform: index === selectedIndex ? 'rotateY(0deg)' : 'rotateY(90deg)',
                  transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'var(--color-bg-body)',
                  overflow: 'hidden',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  boxShadow: index === selectedIndex
                    ? '18px 20px 36px color-mix(in srgb, var(--color-text-primary) 24%, transparent), 0 0 0 1px color-mix(in srgb, var(--color-text-primary) 8%, transparent)'
                    : 'none',
                  zIndex: 1,
                  marginRight: index === selectedIndex ? `${selectedSpacing}px` : '0',
                }}
              >
                <img
                  src={book.cover || '/images/placeholder-book-cover.jpg'}
                  alt={book.title}
                  className="w-full h-full"
                  style={{
                    objectFit: 'cover',
                    backfaceVisibility: 'hidden',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '0',
                    background:
                      'linear-gradient(180deg, color-mix(in srgb, var(--color-bg-body) 16%, transparent) 0%, transparent 22%, transparent 76%, color-mix(in srgb, var(--color-text-primary) 18%, transparent) 100%)',
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Show right scroll button if there are more books to show or if we're not at the last book */}
      {books.length > 1 && (
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20"
          style={{
            background: 'color-mix(in srgb, var(--color-bg-body) 82%, transparent)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-pill)',
            padding: 'var(--space-150)',
            boxShadow: '0 10px 24px color-mix(in srgb, var(--color-text-primary) 14%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-border-default) 72%, transparent)',
          }}
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Show left scroll button if we can scroll left or if we're not at the first book */}
      {books.length > 1 && (
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20"
          style={{
            background: 'color-mix(in srgb, var(--color-bg-body) 82%, transparent)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-pill)',
            padding: 'var(--space-150)',
            boxShadow: '0 10px 24px color-mix(in srgb, var(--color-text-primary) 14%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-border-default) 72%, transparent)',
          }}
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
