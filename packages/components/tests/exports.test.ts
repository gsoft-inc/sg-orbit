import fs from "fs";
import path from "path";

const indexJs = fs.readFileSync(path.resolve(__dirname, "../src/index.ts"), "utf-8");

const directories = fs.readdirSync(path.resolve(__dirname, "../src"), { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => x.name);

directories.forEach(x => {
    test(`${x} components are exported`, () => {
        expect(indexJs.includes(`./${x}`)).toBeTruthy();
    });
});
