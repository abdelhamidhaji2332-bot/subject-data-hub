import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="page-bg relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="zellige zellige-left" />
      <div className="zellige zellige-right" />
      <header className="relative z-30 flex w-full items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card p-1.5 shadow-sm">
            <svg viewBox="0 0 100 100" className="h-full w-full text-primary" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
              <polygon points="50,6 64,36 94,50 64,64 50,94 36,64 6,50 36,36" />
              <rect x="26" y="26" width="48" height="48" rx="6" transform="rotate(45 50 50)" />
              <line x1="50" y1="40" x2="50" y2="65" strokeWidth="4" />
            </svg>
          </div>
          <span className="text-lg font-extrabold uppercase tracking-tight text-foreground md:text-xl">CPGE PSI MAROC</span>
        </Link>
        <span className="hidden rounded-full border border-border bg-card/90 px-4 py-1 text-xs text-muted-foreground shadow-sm sm:inline">
          Created by <b className="text-foreground">Abdelhamid Haji</b> — CID Supervisor
        </span>
      </header>
      <main className="relative z-20 mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8">{children}</main>
      <footer className="relative z-20 flex flex-col items-center gap-2 px-6 py-6 text-xs text-muted-foreground">
        <span className="font-mono uppercase tracking-wider">Created by Abdelhamid Haji — CID Supervisor</span>
        <a href="https://wa.me/212601898477" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-medium text-foreground hover:border-primary">
          🇲🇦 WhatsApp +212 601 898 477
        </a>
      </footer>
    </div>
  );
}
