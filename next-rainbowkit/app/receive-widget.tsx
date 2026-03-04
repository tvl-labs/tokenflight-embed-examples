"use client";

import { useEffect, useRef } from "react";
import { useConfig } from "wagmi";
import { useTheme } from "./context/theme";
import { useLocale } from "./context/locale";

export function ReceiveWidget() {
  const config = useConfig();
  const { theme } = useTheme();
  const { locale } = useLocale();
  const registeredRef = useRef(false);

  useEffect(() => {
    if (registeredRef.current) return;

    Promise.all([
      import("@tokenflight/embed"),
      import("@tokenflight/adapter-wagmi"),
    ]).then(([{ registerElements }, { WagmiWalletAdapter }]) => {
      if (registeredRef.current) return;
      registeredRef.current = true;

      registerElements({
        walletAdapter: new WagmiWalletAdapter(config),
        customColors: {
          "--tf-font-family": "var(--font-inter), sans-serif",
          "--tf-font-family-mono": "var(--font-jetbrains-mono), monospace",
        },
      });
    });
  }, [config]);

  return (
    <tokenflight-receive
      theme={theme}
      locale={locale}
      style={{ display: "block", minHeight: 560, width: "100%" }}
    />
  );
}
