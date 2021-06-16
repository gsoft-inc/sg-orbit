import { isNil, isNumber } from "@react-components/shared";

class ParamsBuilder {
    _canvasLayout = {}
    _chromatic = {}
    _sortPriority = null;
    _excludeFromDocs = false;
    _component = null;
    _a11y = null;

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

    chromaticPauseAnimationAtEnd() {
        this._chromatic.pauseAnimationAtEnd = true;

        return this;
    }

    chromaticIgnore() {
        this._chromatic.disable = true;

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

    component(component) {
        this._component = component;

        return this;
    }

    a11y(config) {
        this._a11y = config;

        return this;
    }

    build() {
        const params = {};

        if (!isNil(this._canvasLayout)) {
            params.canvasLayout = this._canvasLayout;
        }

        if (!isNil(this._chromatic)) {
            params.chromatic = this._chromatic;
        }

        if (!isNil(this._sortPriority)) {
            params.sortPriority = this._sortPriority;
        }

        if (!isNil(this._component)) {
            params.component = this._component;
        }

        if (!isNil(this._a11y)) {
            params.a11y = this._a11y;
        }

        const docs = {};

        if (this._excludeFromDocs) {
            docs.disable = true;
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
