import { DocsContainer } from "@storybook/addon-docs/blocks";
import { cloneElement } from "react";
import { isNil, isNumber, isPlainObject, isString } from "lodash";

function DefaultDocsLayout({ children }) {
    return <div>{children}</div>;
}

class ParamsBuilder {
    _canvasLayout = {}
    _chromatic = {}
    _storyValues = null;
    _sortPriority = null;
    _showPanel = null;
    _selectedPanel = null;
    _excludeFromDocs = false;
    _docsLayout = <DefaultDocsLayout />;

    canvasLayout(config) {
        if (!isNil(config)) {
            this._canvasLayout = {
                ...this._canvasLayout,
                ...config
            };
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

    showPanel() {
        this._showPanel = true;

        return this;
    }

    selectedPanel(panelId) {
        if (isString(panelId)) {
            this._selectedPanel = panelId;
        }

        return this;
    }

    excludeFromDocs() {
        this._excludeFromDocs = true;

        return this;
    }

    docsLayout(layout) {
        if (!isNil(layout)) {
            this._docsLayout = layout;
        }

        return this;
    }

    build() {
        const params = {};

        if (!isNil(this._canvasLayout)) {
            params.layout = this._canvasLayout;
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

        const options = {};

        if (!isNil(this._showPanel)) {
            options.showPanel = true;
        }

        if (!isNil(this._selectedPanel)) {
            options.selectedPanel = this._selectedPanel;
        }

        if (Object.keys(options).length > 0) {
            params.options = options;
        }

        const docs = {};

        if (this._excludeFromDocs) {
            docs.disable = true;
        }

        if (!isNil(this._docsLayout)) {
            docs.container = ({ children, context }) => {
                return (
                    <DocsContainer context={context}>
                        {cloneElement(this._docsLayout, { context: context, children: children })}
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
    return new ParamsBuilder();
}
