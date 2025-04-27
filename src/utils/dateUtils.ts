/**
 * Format a date into a human-readable string
 * @param date - The date to format (string or Date object)
 * @returns Formatted date string in DD MMM YYYY format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, ' '); // Replace regular spaces with non-breaking spaces
} 