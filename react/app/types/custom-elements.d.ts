import "@tokenflight/swap/custom-elements";
import type { CSSProperties } from "react";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "appkit-button": {
        style?: CSSProperties;
        class?: string;
        className?: string;
      };
    }
  }
}
