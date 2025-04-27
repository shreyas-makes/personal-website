/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return '';
  }
  
  // Convert string to Date object if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  // Format date as "Month DD, YYYY"
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date in a shorter format like "02 Jan, 2025"
 * @param date - Date string or Date object to format
 * @returns Formatted date string
 */
export function formatShortDate(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, ' ');
} 