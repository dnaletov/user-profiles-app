export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  
  return new Date(date)
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');
}

export function formatDateForInput(date: string | Date): string {
  if (!date) return '';
  
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  
  return date.toISOString().split('T')[0];
}

export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}
