import "./development-status-addon.css";
import { addons } from "@storybook/addons";
import React from "react";

const STATUS_PARAMETER_KEY = "status";
const DEVELOPMENT_STATUS = {
    Beta: "beta"
};

export function registerDevelopmentStatusAddon() {
    addons.register("status", api => {
        addons.setConfig({
            sidebar: {
                renderLabel: item => {
                    if (!item.isComponent || item.children === undefined || item.children.length === 0 || item.children[0] === undefined) {
                        return item.name;
                    }

                    // parameters are only available on stories, so we fetch the parameters of the first child
                    const status = api.getParameters(item.children[0], STATUS_PARAMETER_KEY);

                    if (status === DEVELOPMENT_STATUS.Beta) {
                        return <span>{item.name} <span className="sbdocs-beta-tag">Beta</span></span>;
                    }

                    return item.name;
                }
            }
        });
    });
}

