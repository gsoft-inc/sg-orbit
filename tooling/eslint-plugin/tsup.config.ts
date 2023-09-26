import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["./lib"],
    format: "cjs",
    platform: "node"
});
