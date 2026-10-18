import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { SUBJECTS, filesFor } from "@/data/resources";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CPGE PSI Maroc — Resources Hub" },
      { name: "description", content: "Cours, TD, DS, CNC and Concours Français resources for Moroccan CPGE PSI students." },
      { property: "og:title", content: "CPGE PSI Maroc — Resources Hub" },
      { property: "og:description", content: "Premium academic materials, past exams and courses for the PSI track." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell>
      <div className="math-bg" />
      <section className="relative flex flex-col items-center pt-6">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          CPGE PSI Morocco <span className="text-gradient-primary">Resources</span>
        </h1>
        <p className="mt-2 max-w-xl text-center text-sm text-muted-foreground md:text-base">
          Access premium academic materials, past exams, and courses for the PSI track.
        </p>
        <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {SUBJECTS.map((s) => (
            <Link key={s.id} to="/subject/$subject" params={{ subject: s.id }} className="resource-card group">
              <span className="absolute right-3 top-2.5 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {filesFor(s.id).length} files
              </span>
              <div className="flex items-center gap-4">
                <div className={`subject-icon ${s.gradient}`}>{s.glyph}</div>
                <div>
                  <h2 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">{s.name}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.topics}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
