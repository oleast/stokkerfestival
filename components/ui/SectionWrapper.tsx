import FadeIn from '@/components/ui/FadeIn';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function SectionWrapper({ id, children, className = '', animate = true }: SectionWrapperProps) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {animate ? <FadeIn>{children}</FadeIn> : children}
      </div>
    </section>
  );
}
