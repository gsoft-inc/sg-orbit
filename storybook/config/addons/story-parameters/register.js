import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./config";
import { createPanelRenderer } from "./story-parameters-panel";
import addons, { types } from "@storybook/addons";

addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: "Parameters",
        render: createPanelRenderer(),
        paramKey: PARAM_KEY
    });
});
