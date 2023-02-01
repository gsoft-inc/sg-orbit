import { create } from "@storybook/theming";

export const Themes = {
    manager: create({
        base: "light",
        brandTitle: "ShareGate Orbit",
        brandUrl: "https://sharegate.com",
        brandImage: "https://raw.githubusercontent.com/gsoft-inc/sg-orbit/master/assets/orbit-full.svg?sanitize=true"
    }),
    docs: create({
        base: "light",
        fontBase: "TT Interphases Variable, Arial, Helvetica, sans-serif",
        textColor: "#04091A"
    })
};
