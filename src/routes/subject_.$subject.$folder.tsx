import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { fileUrl, filesFor, getFolder, getSubject } from "@/data/resources";

export const Route = createFileRoute("/subject_/$subject/$folder")({
  loader: ({ params }) => {
    const subject = getSubject(params.subject);
    const folder = getFolder(params.folder);
    if (!subject || !folder) throw notFound();
    return { subject, folder };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.folder.label} ${loaderData.subject.name}` : "Folder";
    return {
      meta: [
        { title: `${t} — CPGE PSI Maroc` },
        { name: "description", content: `${t} files for CPGE PSI students in Morocco.` },
        { property: "og:title", content: `${t} — CPGE PSI Maroc` },
        { property: "og:description", content: `Download ${t} documents.` },
      ],
    };
  },
  component: FolderPage,
});

function FolderPage() {
  const { subject, folder } = Route.useLoaderData();
  const files = filesFor(subject.id, folder.id).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return (
    <Shell>
      <Link to="/subject/$subject" params={{ subject: subject.id }} className="text-sm text-muted-foreground hover:text-primary">
        ← {subject.name}
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
        <span className="font-mono text-gradient-primary">{folder.label}</span> · {subject.name}
      </h1>
      <p className="text-sm text-muted-foreground">{folder.desc}</p>
      {files.length === 0 ? (
        <div className="resource-card mt-8 cursor-default text-center text-sm text-muted-foreground">
          No files yet in this folder.
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {files.map((f) => (
            <li key={f.name}>
              <a href={fileUrl(f)} target="_blank" rel="noreferrer" className="resource-card flex items-center justify-between">
                <span className="font-medium text-foreground">📄 {f.name}</span>
                {f.year && <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">{f.year}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
