export function calculateReadingTime(content: string): string {
  // Average reading speed (words per minute)
  const WORDS_PER_MINUTE = 200;
  
  // Count words by splitting on whitespace
  const words = content.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  
  // Format the output
  if (minutes === 1) {
    return '1 minute read';
  }
  return `${minutes} minutes read`;
} 