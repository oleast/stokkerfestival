'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

const COLORS = ['#8B2500', '#D4A574', '#A83000', '#E8CBA8', '#6B1D00'];

export function fireConfetti() {
  const defaults = {
    colors: COLORS,
    spread: 80,
    ticks: 100,
    gravity: 1.2,
    decay: 0.94,
    startVelocity: 30,
  };

  confetti({ ...defaults, particleCount: 50, origin: { x: 0.3, y: 0.7 } });
  confetti({ ...defaults, particleCount: 50, origin: { x: 0.7, y: 0.7 } });

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.5 } });
  }, 200);
}

export function ConfettiButton() {
  const handleClick = useCallback(() => {
    fireConfetti();
  }, []);

  return (
    <button
      onClick={handleClick}
      className="mt-4 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
    >
      🎉 Mer konfetti!
    </button>
  );
}
