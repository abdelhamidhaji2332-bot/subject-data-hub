// Files live in /public/data/<subject>/<folder>/. Register each file here.
export type SubjectId = "math" | "physique" | "chimie" | "informatique" | "si" | "cat";
export type FolderId = "cours" | "td" | "exercices" | "ds" | "summaries" | "cnc" | "cf";

export interface Subject {
  id: SubjectId;
  name: string;
  topics: string;
  glyph: string;
  gradient: string; // token class
}

export const SUBJECTS: Subject[] = [
  { id: "math", name: "Mathématiques", topics: "Algèbre, Analyse, Géométrie, Probas", glyph: "∫", gradient: "bg-subject-math" },
  { id: "physique", name: "Physique", topics: "Électromagnétisme, Mécanique, Thermo, Optique", glyph: "⚛", gradient: "bg-subject-physique" },
  { id: "chimie", name: "Chimie", topics: "Thermochimie, Solutions aqueuses, Cristallo", glyph: "⚗", gradient: "bg-subject-chimie" },
  { id: "informatique", name: "Informatique", topics: "Python, SQL, Graphes", glyph: "</>", gradient: "bg-subject-info" },
  { id: "si", name: "Sciences de l'Ingénieur", topics: "SLCI, Mécatronique, Dynamique", glyph: "⚙", gradient: "bg-subject-si" },
  { id: "cat", name: "Culture & Anglais", topics: "Français, Anglais, TIPE", glyph: "Aa", gradient: "bg-subject-cat" },
];

export const FOLDERS: { id: FolderId; label: string; desc: string }[] = [
  { id: "cours", label: "COURS", desc: "Lecture notes & references" },
  { id: "td", label: "TD", desc: "Travaux Dirigés with solutions" },
  { id: "exercices", label: "EXERCICES", desc: "Targeted drills & problem sets" },
  { id: "ds", label: "DS", desc: "Devoirs Surveillés" },
  { id: "summaries", label: "SUMMARIES", desc: "Formula & synthesis sheets" },
  { id: "cnc", label: "CNC", desc: "Concours National Commun" },
  { id: "cf", label: "CF", desc: "Concours Français" },
];

export interface ResourceFile {
  subject: SubjectId;
  folder: FolderId;
  name: string; // file name inside /public/data/<subject>/<folder>/
  year?: number;
}

// Add your files here, e.g.
// { subject: "math", folder: "cnc", name: "CNC 2023 - Math 1.pdf", year: 2023 },
export const FILES: ResourceFile[] = [];

export const fileUrl = (f: ResourceFile) =>
  `/data/${f.subject}/${f.folder}/${encodeURIComponent(f.name)}`;

export const getSubject = (id: string) => SUBJECTS.find((s) => s.id === id);
export const getFolder = (id: string) => FOLDERS.find((f) => f.id === id);
export const filesFor = (s: string, f?: string) =>
  FILES.filter((x) => x.subject === s && (!f || x.folder === f));
