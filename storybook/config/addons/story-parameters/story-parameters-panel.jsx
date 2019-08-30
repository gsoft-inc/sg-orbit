import "./story-parameters-panel.css";

import { PANEL_ID, PARAM_KEY } from "./config";
import { PureComponent } from "react";
import { STORY_CHANGED } from "@storybook/core-events";
import { isNil, isPlainObject, isString } from "lodash";

class StoryParametersPanel extends PureComponent {
    state = {
        values: null
    };

    componentDidMount() {
        const { api } = this.props;

        api.on(STORY_CHANGED, this.onStoryChange);
    }

    componentWillUnmount() {
        const { api } = this.props;

        api.off(STORY_CHANGED, this.onStoryChange);
    }

    onStoryChange = id => {
        const { api } = this.props;

        const storyParameters = api.getParameters(id, PARAM_KEY);

        this.setState({ values: storyParameters });
    };

    returnValues() {
        const { values } = this.state;

        return Object.keys(values).map(key => {
            const value = values[key];

            if (isString(value)) {
                return (
                    <div key={key} className="parameter">
                        <span className="string-key">{key}</span>
                        {value}
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
    }

    render() {
        const { values } = this.state;
        const { active } = this.props;

        if (!active || isNil(values)) {
            return null;
        }

        return (
            <div className="story-parameters">
                {this.returnValues()}
            </div>
        );
    }
}

export function createPanelRenderer(api) {
    return ({ active }) => <StoryParametersPanel key={`storybook/${PANEL_ID}`} api={api} active={active} />;
}
