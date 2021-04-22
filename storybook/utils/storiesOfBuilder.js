import { isNil, isPlainObject } from "@react-components/shared";
import { storiesOf } from "@storybook/react";

class StoriesOfConfigurationBuilder {
    _module;
    _section;
    _segment;
    _parameters;

    constructor(storiesModule, section) {
        if (!storiesModule) {
            throw new Error(`${StoriesOfConfigurationBuilder.name} - module is required.`);
        }

        if (!section) {
            throw new Error(`${StoriesOfConfigurationBuilder.name} - section is required.`);
        }

        this._module = storiesModule;
        this._section = section;
    }

    segment(segment) {
        if (!isNil(segment)) {
            this._segment = segment;
        }

        return this;
    }

    parameters(parameters) {
        if (isPlainObject(parameters)) {
            this._parameters = parameters;
        }

        return this;
    }

    build() {
        let name = this._section;

        if (!isNil(this._segment)) {
            name += this._segment;
        }

        let storiesConfig = storiesOf(name, this._module);

        if (!isNil(this._parameters)) {
            storiesConfig = storiesConfig.addParameters(this._parameters);
        }

        return storiesConfig;
    }
}

export function storiesOfBuilder(storiesModule, section) {
    return new StoriesOfConfigurationBuilder(storiesModule, section);
}
