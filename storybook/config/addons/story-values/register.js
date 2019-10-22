import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./config";
import { createPanelRenderer } from "./story-values-panel";
import addons, { types } from "@storybook/addons";

addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: "Values",
        render: createPanelRenderer(),
        paramKey: PARAM_KEY
    });
});
