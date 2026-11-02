import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 scroll-mt-32 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-16">
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-400 max-w-2xl text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}