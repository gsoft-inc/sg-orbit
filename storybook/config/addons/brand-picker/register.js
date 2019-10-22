import { ADDON_ID, PARAM_KEY } from "./config";
import { createBrandPickerRenderer } from "./brand-picker-tool";
import { isChromatic } from "../../env";
import addons, { types } from "@storybook/addons";

// TODO: Test if the chromatic flag is now available in the manager ui

addons.register(ADDON_ID, () => {
    if (!isChromatic) {
        addons.add(ADDON_ID, {
            title: "Brand Picker",
            type: types.TOOL,
            render: createBrandPickerRenderer(),
            paramKey: PARAM_KEY
        });
    }
});
