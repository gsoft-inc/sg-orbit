import { ControlledMultiSelect } from "./components";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE } from "./data";
import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { SECTION } from "./metadata";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { logValuesChanged } from "./utils";

export default {
    title: SECTION,
    component: MultiSelect
};

export const defaultState = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        onValuesChange={logValuesChanged}
    />;
defaultState.story = {
    name: "name"
};

export const knobs = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        // Not sure why, when using a knob, the component doesn't re-render when the knob value change.
        defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
        closeOnSelect={boolean("closeOnSelect", false)}
        noResultsMessage={text("noResultsMessage", MultiSelect.defaultProps.noResultsMessage)}
        triggerText={text("triggerText", MultiSelect.defaultProps.triggerText)}
        placeholder={text("placeholder", MultiSelect.defaultProps.placeholder)}
        clearText={text("clearText", MultiSelect.defaultProps.clearText)}
        disabled={boolean("disabled", false)}
        closeOnBlur={boolean("closeOnBlur", true)}
        closeOnOutsideClick={boolean("closeOnOutsideClick", false)}
        onValuesChange={logValuesChanged}
    />;
knobs.story = {
    name: "knobs",
    decorators: [withKnobs]
};

export const categories = () =>
    <MultiSelect
        items={DEFAULT_ITEMS_WITH_CATEGORIES}
        onValuesChange={logValuesChanged}
    />;
categories.story = {
    name: "categories"
};

export const defaultValues = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
        onValuesChange={logValuesChanged}
    />;
defaultValues.story = {
    name: "default values"
};

export const closeOnSelect = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        closeOnSelect
        onValuesChange={logValuesChanged}
    />;
closeOnSelect.story = {
    name: "close on select"
};

export const customSearch = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        onSearch={(event, items, query) => {
            const surpriseItem = multiSelectItem("Surprise! (added from custom search)", "surprise");

            return [surpriseItem, ...items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()))];
        }}
        onValuesChange={logValuesChanged}
    />;
customSearch.story = {
    name: "custom search"
};

export const disabled = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
        disabled
        onValuesChange={logValuesChanged}
    />;
disabled.story = {
    name: "disabled"
};

export const dontCloseOnBlur = () =>
    <MultiSelect
        items={DEFAULT_ITEMS}
        closeOnBlur={false}
        closeOnOutsideClick
        onValuesChange={logValuesChanged}
    />;
dontCloseOnBlur.story = {
    name: "dont close on blur"
};

export const controlled = () =>
    <ControlledMultiSelect
        items={DEFAULT_ITEMS}
        values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
        onValuesChange={logValuesChanged}
    />;
controlled.story = {
    name: "controlled"
};

