import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Props { id: string; title: string; subtitle?: string; children: ReactNode; }

/** Shared wrapper: consistent spacing, max width, and an accessible heading. */
export default function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading id={`${id}-title`} title={title} subtitle={subtitle} />
        </Reveal>
        {children}
      </div>
    </section>
  );
}