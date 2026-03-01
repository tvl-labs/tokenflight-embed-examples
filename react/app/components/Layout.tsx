'use client';

import type { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSelect } from './LocaleSelect';

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* Navigation */}
      <nav className="nav sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="nav-title text-[15px] font-semibold tracking-tight">
              Swap
            </span>
            <span className="nav-badge rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide">
              TanStack Start
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSelect />
            <ThemeToggle />
            <appkit-button />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-120 flex justify-center items-center">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Powered by{" "}
          <a
            href="https://khalani.network"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
            style={{ color: "var(--text-tertiary)" }}
          >
            Khalani Network
          </a>
        </p>
      </footer>
    </>
  );
}
