import { css } from "docz-plugin-css";

export default {
    src: "./src",
    title: "Sharegate Orbit",
    themeConfig: {
        colors: {
            primary: "#566077"
        }
    },
    description: "Sharegate Orbit components documentation",
    menu: [
        { name: "Introduction", menu: [] },
        { name: "Materials", menu: ["Colours", "Typography", "Spacing", "Border Radius", "Shadows"] },
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
