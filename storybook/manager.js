import { Themes } from "./styles/themes";
import { addons } from "@storybook/addons";
import { addonsColorScheme } from "./addons/colorScheme";

addons.setConfig({
    theme: Themes.manager,
    panelPosition: "right",
    enableShortcuts: false
});

addonsColorScheme();
