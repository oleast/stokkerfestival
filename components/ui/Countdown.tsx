'use client';

import { useMemo, useSyncExternalStore } from 'react';

function calculateTimeLeft(targetDate: Date): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return 'Festen var fantastisk!';

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (totalDays === 0) return 'I dag!';
  if (totalDays === 1) return '1 dag igjen';

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  if (months === 0) return `${totalDays} dager igjen`;
  if (months === 1 && days === 0) return '1 måned igjen';
  if (months === 1) return `1 måned og ${days} ${days === 1 ? 'dag' : 'dager'} igjen`;
  if (days === 0) return `${months} måneder igjen`;
  return `${months} måneder og ${days} ${days === 1 ? 'dag' : 'dager'} igjen`;
}

interface CountdownProps {
  festivalDate?: string;
  className?: string;
}

const subscribe = (onStoreChange: () => void) => {
  const intervalId = window.setInterval(onStoreChange, 60 * 1000);
  return () => window.clearInterval(intervalId);
};

const getSnapshot = () => Math.floor(Date.now() / (60 * 1000));
const getServerSnapshot = () => null;

export default function Countdown({ festivalDate, className = '' }: CountdownProps) {
  const currentMinute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const targetDate = useMemo(() => (festivalDate ? new Date(festivalDate) : null), [festivalDate]);
  const timeLeft = targetDate && currentMinute !== null ? calculateTimeLeft(targetDate) : null;

  if (!timeLeft) return null;

  return (
    <p className={`min-h-6 text-sm font-medium ${className}`}>{timeLeft}</p>
  );
}
