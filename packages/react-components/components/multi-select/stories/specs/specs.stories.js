import { DEFAULT_ITEMS, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "../shared";
import { MultiSelect } from "../../src";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Multi-Select|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories("/selected values")
    .add("no values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onValuesChange={logValuesChanged}
        />
    )
    .add("some values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("all values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can clear when all values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    )
    .add("cannot clear when no values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can add when no values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can add when all values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    );

stories("/default values")
    .add("no values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onValuesChange={logValuesChanged}
        />
    )
    .add("some values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("all values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    );

stories("/disabled")
    .add("without values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            disabled
            onValuesChange={logValuesChanged}
        />
    )
    .add("with values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
            disabled
            onValuesChange={logValuesChanged}
        />
    );

