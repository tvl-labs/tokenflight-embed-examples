"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface LocaleContextValue {
  readonly locale: string;
  readonly setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocaleState] = useState("en-US");

  const setLocale = useCallback((next: string) => {
    setLocaleState(next);
  }, []);

  return (
    <LocaleContext value={{ locale, setLocale }}>
      {children}
    </LocaleContext>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx === null) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
