import fs from "fs";
import packageJson from "../package.json";
import path from "path";

const MAPPING = {
    "shared": "components-shared"
};

const directories = fs.readdirSync(path.resolve(__dirname, "../components"), { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => x.name);

directories.forEach(x => {
    test(`${x} is listed as package dependency`, () => {
        let name = x;

        if (MAPPING[name]) {
            name = MAPPING[name];
        }

        expect(packageJson.dependencies[`@orbit-ui/react-${name}`]).not.toBeUndefined();
    });
});
