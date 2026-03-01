import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, base, arbitrum, optimism, polygon } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "TokenFlight Swap",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "00000000000000000000000000000000",
  chains: [mainnet, base, arbitrum, optimism, polygon],
  ssr: true,
});
