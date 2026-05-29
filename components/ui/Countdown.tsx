'use client';

import { useSyncExternalStore } from 'react';

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

const subscribe = () => () => {};
const getServerSnapshot = () => null;

interface CountdownProps {
  festivalDate?: string;
}

export default function Countdown({ festivalDate }: CountdownProps) {
  const targetDate = festivalDate ? new Date(festivalDate) : null;

  const timeLeft = useSyncExternalStore(
    subscribe,
    () => (targetDate ? calculateTimeLeft(targetDate) : null),
    getServerSnapshot,
  );

  if (!timeLeft) return null;

  return (
    <p className="min-h-7 text-lg text-accent-light">{timeLeft}</p>
  );
}
