import { css } from "docz-plugin-css";

export default {
    src: "./src",
    title: "Sharegate Orbit",
    description: "Sharegate Orbit components documentation",
    menu: [
        { name: "Introduction", menu: [] },
        { name: "Foundations", menu: ["Colours", "Typography", "Shadows"] },
        { name: "Components", menu: [] }
    ],
    notUseSpecifiers: true,
    filterComponents: files => files.filter(filepath => /w*.(jsx)$/.test(filepath)),
    plugins: [
        css({
            preprocessor: "postcss"
        })
    ]
};
