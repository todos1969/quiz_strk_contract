import "../global.css";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";

export default function App({ Component, pageProps }) {
  const connectors = [
    new InjectedConnector({ options: { id: "argentX" } }),
    new InjectedConnector({ options: { id: "braavos" } }),
  ];

  return (
    <StarknetConfig connectors={connectors} autoConnect={true}>
      <Component {...pageProps} />
    </StarknetConfig>
  );
}
