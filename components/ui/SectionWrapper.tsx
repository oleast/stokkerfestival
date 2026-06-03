import FadeIn from '@/components/ui/FadeIn';
import type { ReactNode } from 'react';

type SectionWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type SectionSpacing = 'compact' | 'normal' | 'loose';
type SectionTone = 'plain' | 'paper' | 'warm' | 'field';
type SectionAlign = 'left' | 'center';

const widthClasses: Record<SectionWidth, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

const spacingClasses: Record<SectionSpacing, string> = {
  compact: 'py-14 md:py-20',
  normal: 'py-20 md:py-28',
  loose: 'py-24 md:py-36',
};

const toneClasses: Record<SectionTone, string> = {
  plain: 'bg-paper',
  paper: 'bg-background',
  warm: 'bg-paper-soft',
  field: 'bg-field-soft',
};

const alignClasses: Record<SectionAlign, string> = {
  left: 'text-left',
  center: 'text-center',
};

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  animate?: boolean;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  align?: SectionAlign;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  innerClassName = '',
  animate = true,
  width = 'md',
  spacing = 'normal',
  tone = 'plain',
  align = 'left',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`px-6 ${spacingClasses[spacing]} ${toneClasses[tone]} ${className}`}>
      <div className={`mx-auto ${widthClasses[width]} ${alignClasses[align]} ${innerClassName}`}>
        {animate ? <FadeIn>{children}</FadeIn> : children}
      </div>
    </section>
  );
}
