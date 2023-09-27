import fs from "fs";
import path from "path";
import plugin from "../lib";

const rules = fs.readdirSync(path.resolve(__dirname, "../lib/rules")).map(x => path.parse(x).name).filter(x => x !== ".gitkeep");
const configs = fs.readdirSync(path.resolve(__dirname, "../lib/config")).map(x => path.parse(x)).filter(x => x.ext).map(x => x.name);

const exportedConfigs = Object.keys(plugin.configs ?? {});
configs.forEach(config => {
    test(`Config ${config} is exported`, () => {
        expect(exportedConfigs.includes(config)).toBeTruthy();
    });
});

const exportedRules = Object.keys(plugin.rules ?? {});
rules.forEach(rule => {
    test(`Rule ${rule} is exported`, () => {
        expect(exportedRules.includes(rule)).toBeTruthy();
    });
});
