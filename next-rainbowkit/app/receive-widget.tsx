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
      import("@tokenflight/swap/widget"),
      import("@tokenflight/adapter-wagmi"),
    ]).then(([{ registerWidgetElement }, { WagmiWalletAdapter }]) => {
      if (registeredRef.current) return;
      registeredRef.current = true;

      registerWidgetElement({
        walletAdapter: new WagmiWalletAdapter(config),
        customColors: {
          "--tf-font-family": "var(--font-inter), sans-serif",
          "--tf-font-family-mono": "var(--font-jetbrains-mono), monospace",
        },
      });
    });
  }, [config]);

  return (
    <tokenflight-widget
      theme={theme}
      locale={locale}
      trade-type="EXACT_OUTPUT"
      to-token='{"chainId":8453,"address":"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"}'
      amount="1"
      style={{ display: "block", minHeight: 560, width: "100%" }}
    />
  );
}
