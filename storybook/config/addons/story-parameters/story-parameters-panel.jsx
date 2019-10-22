import "./story-parameters-panel.css";

import { PARAM_KEY } from "./config";
import { STORY_RENDERED } from "@storybook/core-events";
import { isNil, isPlainObject, isString } from "lodash";
import { useChannel, useParameter } from "@storybook/api";
import { useState } from "react";

function StoryParametersPanel({ active }) {
    const [values, setValues] = useState(null);
    const storyValues = useParameter(PARAM_KEY, null);

    useChannel({
        [STORY_RENDERED]: () => {
            setValues(storyValues);
        }
    });

    const renderValues = () => {
        return Object.keys(values).map(key => {
            const value = values[key];

            if (isString(value)) {
                return (
                    <div key={key} className="parameter">
                        <span className="string-key">{key}</span>&nbsp;&nbsp;{value}
                    </div>
                );
            }
            else if (isPlainObject(value)) {
                return (
                    <div key={key} className="parameter">
                        <div className="object-key">{key}</div>
                        <pre>{JSON.stringify(value, null, 2)}</pre>
                    </div>
                );
            }
            else {
                throw new Error(`${StoryParametersPanel.name} - Story parameters addons only support string or plain object values.`);
            }
        });
    };

    if (!active || isNil(values)) {
        return null;
    }

    return (
        <div className="story-parameters">
            {renderValues()}
        </div>
    );
}

export function createPanelRenderer() {
    return ({ active, key }) => <StoryParametersPanel key={key} active={active} />;
}
