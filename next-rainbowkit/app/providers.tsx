"use client";

import { type ReactNode, useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/lib/wagmi";
import { ThemeProvider, useTheme } from "./context/theme";
import { LocaleProvider } from "./context/locale";

import "@rainbow-me/rainbowkit/styles.css";

const themeConfig = {
  accentColor: "#6366f1",
  accentColorForeground: "#fafafa",
  borderRadius: "medium" as const,
  overlayBlur: "small" as const,
};

function RainbowKitThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = useTheme();
  const rkTheme = theme === "light" ? lightTheme(themeConfig) : darkTheme(themeConfig);

  return (
    <RainbowKitProvider theme={rkTheme}>
      {children}
    </RainbowKitProvider>
  );
}

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <ThemeProvider>
      <LocaleProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitThemeProvider>
              {children}
            </RainbowKitThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
