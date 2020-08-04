import fs from "fs";
import path from "path";

const IGNORE_LIST = [
    "dropdown"
];

const indexJs = fs.readFileSync(path.resolve(__dirname, "../src/index.js"), "utf-8");

const directories = fs.readdirSync(path.resolve(__dirname, "../src"), { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => x.name);

directories.forEach(x => {
    if (!IGNORE_LIST.includes(x)) {
        test(`${x} components are exported`, () => {
            expect(indexJs.includes(`./${x}`)).toBeTruthy();
        });
    }
});
