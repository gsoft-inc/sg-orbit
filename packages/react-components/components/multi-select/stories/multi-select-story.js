import { storiesOf } from "@storybook/react";
import { MultiSelect, multiSelectItem } from "../src";

storiesOf("MultiSelect", module).add("default", () => 
    <MultiSelect                     
        items={[
            multiSelectItem("Created", "Group Created", "Group Lifecycle"),
            multiSelectItem("Restored", "Group Restored", "Group Lifecycle"),
            multiSelectItem("Deleted", "Group Deleted", "Collaboration"),
            multiSelectItem("Name Changed", "Group Name Changed", "Collaboration"),
            multiSelectItem("Privacy Changed", "Group Privacy Changed", "C")
        ]}
        values={["Group Created", "Group Name Changed"]}
        onValuesChange={(event, values) => {
            console.log("New values: ", values);
        }}
    />
);
