import { DocsContainer } from "@storybook/addon-docs/blocks";
import { cloneElement } from "react";
import { isNil, isNumber, isPlainObject } from "lodash";

class ParamsConfigurationBuilder {
    _layout = {}
    _chromatic = {}
    _storyValues = null;
    _sortPriority = null;
    _excludeFromDocs = false;
    _docsContainer = null;

    // TODO: rename to canvasLayout
    layout(config) {
        if (!isNil(config)) {
            this._layout = {
                ...this._layout,
                ...config
            };
        }

        return this;
    }

    // TODO: rename to canvasMarginTop
    marginTop(value) {
        if (!isNil(value)) {
            this._layout.marginTop = value;
        }

        return this;
    }

    // TODO: rename to canvasWidth
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

    storyValues(values) {
        if (isPlainObject(values)) {
            this._storyValues = values;
        }

        return this;
    }

    sortPriority(priority) {
        if (isNumber(priority)) {
            this._sortPriority = priority;
        }

        return this;
    }

    excludeFromDocs() {
        this._excludeFromDocs = true;

        return this;
    }

    docsContainer(container) {
        if (!isNil(container)) {
            this._docsContainer = container;
        }

        return this;
    }

    build() {
        const params = {};

        if (!isNil(this._layout)) {
            params.layout = this._layout;
        }

        if (!isNil(this._chromatic)) {
            params.chromatic = this._chromatic;
        }

        if (!isNil(this._storyValues)) {
            params.storyValues = this._storyValues;
        }

        if (!isNil(this._sortPriority)) {
            params.sortPriority = this._sortPriority;
        }

        const docs = {};

        if (this._excludeFromDocs) {
            docs.disable = true;
        }

        if (!isNil(this._docsContainer)) {
            docs.container = ({ children, context }) => {
                return (
                    <DocsContainer context={context}>
                        {cloneElement(this._docsContainer, { context: context, children: children })}
                    </DocsContainer>
                );
            };
        }

        if (Object.keys(docs).length > 0) {
            params.docs = docs;
        }

        return params;
    }
}

export function paramsBuilder() {
    return new ParamsConfigurationBuilder();
}
