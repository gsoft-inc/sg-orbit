import { isNil, isPlainObject } from "lodash";

class StoryParametersBuilder {
    _layout = {}
    _chromatic = {}
    _storyParameters = null

    layout(config) {
        if (!isNil(config)) {
            this._layout = {
                ...this._layout,
                ...config
            };
        }

        return this;
    }

    marginTop(value) {
        if (!isNil(value)) {
            this._layout.marginTop = value;
        }

        return this;
    }

    width(value) {
        if (!isNil(value)) {
            this._layout.width = value;
        }

        return this;
    }

    chromatic(config) {
        if (!isNil(config)) {
            this._chromatic = {
                ...this._chromatic,
                ...config
            };
        }

        return this;
    }

    chromaticDelay(delay) {
        if (!isNil(delay)) {
            this._chromatic.delay = delay;
        }

        return this;
    }

    storyParameters(parameters) {
        if (isPlainObject(parameters)) {
            this._storyParameters = parameters;
        }

        return this;
    }

    build() {
        const params = {
            options: {
                layout: this._layout
            },
            chromatic: this._chromatic
        };

        if (!isNil(this._storyParameters)) {
            params.storyParameters = this._storyParameters;
        }

        return params;
    }
}

export function paramsBuilder() {
    return new StoryParametersBuilder();
}
