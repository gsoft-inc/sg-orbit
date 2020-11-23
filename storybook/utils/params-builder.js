import { isNil, isNumber } from "lodash";

class ParamsBuilder {
    _chromatic = {}
    _sortPriority = null;
    _excludeFromDocs = false;

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

    build() {
        const params = {};

        if (!isNil(this._chromatic)) {
            params.chromatic = this._chromatic;
        }

        if (!isNil(this._sortPriority)) {
            params.sortPriority = this._sortPriority;
        }

        const options = {};

        if (Object.keys(options).length > 0) {
            params.options = options;
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
