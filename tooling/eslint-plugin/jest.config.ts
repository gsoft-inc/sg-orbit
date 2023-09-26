import type { Config } from "jest";
import { swcConfig } from "./swc.jest";

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|ts)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    }
};

export default config;
