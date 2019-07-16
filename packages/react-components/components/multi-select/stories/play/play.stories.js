import { ControlledMultiSelect } from "./components/controlled-multi-select";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "../shared";
import { MultiSelect, multiSelectItem } from "../../src";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Multi-Select|play")
        .segment(segment)
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onValuesChange={logValuesChanged}
        />
    )
    .add("knobs", () =>
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
            onValuesChange={logValuesChanged}
        />,
        { decorators: [withKnobs] }
    )
    .add("categories", () =>
        <MultiSelect
            items={DEFAULT_ITEMS_WITH_CATEGORIES}
            onValuesChange={logValuesChanged}
        />
    )
    .add("default values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("close on select", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            closeOnSelect
            onValuesChange={logValuesChanged}
        />
    )
    .add("custom search", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onSearch={(event, items, query) => {
                const surpriseItem = multiSelectItem("Surprise! (added from custom search)", "surprise");

                return [surpriseItem, ...items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()))];
            }}
            onValuesChange={logValuesChanged}
        />
    )
    .add("disabled", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
            disabled
            onValuesChange={logValuesChanged}
        />
    );

stories("/controlled")
    .add("stateful", () =>
        <ControlledMultiSelect
            values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    );

