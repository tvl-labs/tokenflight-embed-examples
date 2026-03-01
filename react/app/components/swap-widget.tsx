'use client';

import { useEffect, useRef } from 'react';

export function SwapWidget() {
  const registeredRef = useRef(false);

  useEffect(() => {
    if (registeredRef.current) return;

    Promise.all([
      import('@tokenflight/swap'),
      import('@tokenflight/adapter-appkit'),
      import('@solana/web3.js'),
      import('~/lib/wagmi'),
    ]).then(([{ registerElements }, { AppKitWalletAdapter }, { VersionedTransaction }, { appkit }]) => {
      if (registeredRef.current) return;
      registeredRef.current = true;

      registerElements({
        walletAdapter: new AppKitWalletAdapter(appkit, {
          VersionedTransaction,
        }),
        customColors: {
          '--tf-font-family': "'Inter', sans-serif",
          '--tf-font-family-mono': "'JetBrains Mono', monospace",
        },
      });
    });
  }, []);

  return (
    <tokenflight-swap
      id="swap-widget"
      theme="dark"
      style={{ display: 'block', minHeight: 560, width: '100%' }}
    />
  );
}
