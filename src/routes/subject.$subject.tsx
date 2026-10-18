import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { FOLDERS, filesFor, getSubject } from "@/data/resources";

export const Route = createFileRoute("/subject/$subject")({
  loader: ({ params }) => {
    const subject = getSubject(params.subject);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => {
    const n = loaderData?.subject.name ?? "Subject";
    return {
      meta: [
        { title: `${n} — CPGE PSI Maroc` },
        { name: "description", content: `${n}: Cours, TD, Exercices, DS, Summaries, CNC & CF for PSI.` },
        { property: "og:title", content: `${n} — CPGE PSI Maroc` },
        { property: "og:description", content: `All ${n} folders for CPGE PSI students.` },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();
  return (
    <Shell>
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← All subjects</Link>
      <div className="mt-4 flex items-center gap-4">
        <div className={`subject-icon ${subject.gradient}`}>{subject.glyph}</div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{subject.name}</h1>
          <p className="text-sm text-muted-foreground">{subject.topics}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FOLDERS.map((f) => (
          <Link key={f.id} to="/subject/$subject/$folder" params={{ subject: subject.id, folder: f.id }} className="resource-card group">
            <span className="absolute right-3 top-2.5 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {filesFor(subject.id, f.id).length} files
            </span>
            <div className="flex items-center gap-4">
              <div className="folder-icon">📁</div>
              <div>
                <h2 className="font-mono text-base font-bold text-foreground group-hover:text-primary">{f.label}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
