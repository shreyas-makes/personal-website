/**
 * Format a date string or Date object to "DD MMM, YYYY" format (e.g., "02 Feb, 2025")
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const day = dateObj.getDate().toString().padStart(2, '0'); // Pad with leading zero
    const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });
    const year = dateObj.getFullYear();
    
    return `${day} ${month}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}; 