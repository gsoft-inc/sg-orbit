import { ADDON_ID } from "./config";
import { isChromatic } from "../../env";
import { renderTool } from "./brand-picker-tool";
import addons, { types } from "@storybook/addons";

// TODO: Test if the chromatic flag is now available in the manager ui

addons.register(ADDON_ID, () => {
    if (!isChromatic) {
        addons.add(ADDON_ID, {
            title: "Brand Picker",
            type: types.TOOL,
            render: renderTool
        });
    }
});
