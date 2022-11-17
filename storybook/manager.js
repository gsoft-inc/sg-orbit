import { Themes } from "./styles/themes";
import { addons } from "@storybook/addons";
import { registerDevelopmentStatusAddon } from "./addons";

addons.setConfig({
    theme: Themes.manager,
    panelPosition: "right",
    enableShortcuts: false

});

registerDevelopmentStatusAddon();
