import { ADDON_ID } from "./config";
import { isChromatic } from "../../utils";
import { renderTool } from "./brand-picker-tool";
import addons, { types } from "@storybook/addons";

addons.register(ADDON_ID, () => {
    if (!isChromatic) {
        addons.add(ADDON_ID, {
            title: "Brand Picker",
            type: types.TOOL,
            render: renderTool
        });
    }
});
