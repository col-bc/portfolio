import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: Date) {
  const dateString = timestamp.toLocaleString();
  const timeString = timestamp.toLocaleTimeString();
  return `${dateString} ${timeString}`;
}

export function formatDate(date: Date): string {
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function timeSinceTimestamp(timestamp: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  const interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  const monthInterval = Math.floor(seconds / 2592000);
  if (monthInterval > 1) {
    return `${monthInterval} months ago`;
  }
  const dayInterval = Math.floor(seconds / 86400);
  if (dayInterval > 1) {
    return `${dayInterval} days ago`;
  }
  const hourInterval = Math.floor(seconds / 3600);
  if (hourInterval > 1) {
    return `${hourInterval} hours ago`;
  }
  const minuteInterval = Math.floor(seconds / 60);
  if (minuteInterval > 1) {
    return `${minuteInterval} minutes ago`;
  }

  return `just now`;
}

export function duration(startDate: Date, endDate?: Date): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  if (years < 1) {
    return `${months} months`;
  } else if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
    return `${years - 1} years, ${12 + months} months`;
  } else {
    return `${years} years, ${months} months`;
  }
}
