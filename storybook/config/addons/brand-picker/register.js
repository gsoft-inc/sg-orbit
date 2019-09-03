import { ADDON_ID } from "./config";
import { renderTool } from "./brand-picker-tool";
import addons, { types } from "@storybook/addons";

// TODO: Rename everything to Tool instead of Panel

addons.register(ADDON_ID, () => {
    addons.add(ADDON_ID, {
        title: "Brand Picker",
        type: types.TOOL,
        // match: ({ viewMode }) => viewMode === "story",
        render: renderTool
    });
});
