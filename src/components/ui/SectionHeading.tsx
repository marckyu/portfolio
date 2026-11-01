interface Props { title: string; subtitle?: string; id?: string; }

export default function SectionHeading({ title, subtitle, id }: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
