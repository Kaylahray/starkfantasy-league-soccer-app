import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 

import App from "./App.tsx";

// Dojo related imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
import type { SchemaType } from "./typescript/models.gen.ts";
import { setupWorld } from "./typescript/contracts.gen.ts";

import "./index.css";
import { dojoConfig } from "../dojoConfig.ts";
import StarknetProvider from "./starknet-provider.tsx";

/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * @throws {Error} If initialization fails
 */
async function main() {
    const sdk = await init<SchemaType>({
        client: {
            worldAddress: dojoConfig.manifest.world.address,
        },
        domain: {
            name: "WORLD_NAME",
            version: "1.0",
            chainId: "KATANA",
            revision: "1",
        },
    });

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <BrowserRouter> {/* ✅ Wrapping routing context */}
                <DojoSdkProvider
                    sdk={sdk}
                    dojoConfig={dojoConfig}
                    clientFn={setupWorld}
                >
                    <StarknetProvider>
                        <App />
                    </StarknetProvider>
                </DojoSdkProvider>
            </BrowserRouter>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
