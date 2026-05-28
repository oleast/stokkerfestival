'use client';

import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-08-22T12:00:00');

function calculateTimeLeft(): string {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

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

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  if (!timeLeft) return null;

  return (
    <p className="text-lg text-accent-light">{timeLeft}</p>
  );
}
