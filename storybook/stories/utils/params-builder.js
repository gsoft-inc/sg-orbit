import { isNil, isPlainObject } from "lodash";

class StoryParametersBuilder {
    _layout = {}
    _chromatic = {}
    _excludeFromDocs = false;
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

    excludeFromDocs() {
        this._excludeFromDocs = true;

        return this;
    }

    storyValues(values) {
        if (isPlainObject(values)) {
            this._storyValues = values;
        }

        return this;
    }

    build() {
        const params = {
            layout: this._layout,
            chromatic: this._chromatic
        };

        if (this._excludeFromDocs) {
            params.docs = {
                disabled: true
            };
        }

        if (!isNil(this._storyValues)) {
            params.storyValues = this._storyValues;
        }

        return params;
    }
}

export function paramsBuilder() {
    return new StoryParametersBuilder();
}
