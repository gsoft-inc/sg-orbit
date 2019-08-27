import { ADDON_ID, PANEL_ID } from "./config";
import { createPanelRenderer } from "./story-parameters-panel";
import addons, { types } from "@storybook/addons";

addons.register(ADDON_ID, api => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: "Parameters",
        render: createPanelRenderer(api)
    });
});
