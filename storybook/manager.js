import { Themes } from "./styles/themes";
import { addons } from "@storybook/addons";

addons.setConfig({
    theme: Themes.manager,
    panelPosition: "right"
});
