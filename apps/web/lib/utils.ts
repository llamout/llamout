import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeUrl = (input: string): string => {
  try {
    let domain: string;

    // Detect if input is already a full URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      const parsedUrl = new URL(input);
      domain = parsedUrl.hostname;
    } else {
      domain = input;
    }

    // Remove the 'www.' prefix if present
    domain = domain.startsWith('www.') ? domain.slice(4) : domain;

    // Build the full URL
    const url = `https://${domain}`;

    return url;
  } catch (error) {
    console.error('Error al procesar el input:', error);
    return input;
  }
};
