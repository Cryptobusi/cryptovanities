export function PaperShell({
  folio,
  title,
  abstract,
  children,
}: {
  folio: string;
  title: string;
  abstract: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-2xl px-5 py-12 font-serif sm:px-8 lg:py-16">
      <p className="font-sans text-xs tracking-widest text-subtle uppercase">
        Egonomic Anonymous · {folio}
      </p>
      <h1 className="mt-6 text-3xl leading-snug text-fg sm:text-4xl">{title}</h1>
      <p className="mt-6 text-[1.05rem] leading-7 text-muted">{abstract}</p>
      <div className="mt-12 space-y-12 text-[1.05rem] leading-7 text-muted">{children}</div>
    </article>
  );
}
