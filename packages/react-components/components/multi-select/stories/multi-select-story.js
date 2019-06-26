import { storiesOf } from "@storybook/react";
import { MultiSelect, toMultiSelectItem } from "../src";

storiesOf("MultiSelect", module).add("default", () => 
    <MultiSelect                     
        items={[
            toMultiSelectItem("Created", "Group Created", "Group Lifecycle"),
            toMultiSelectItem("Restored", "Group Restored", "Group Lifecycle"),
            toMultiSelectItem("Deleted", "Group Deleted", "Collaboration"),
            toMultiSelectItem("Name Changed", "Group Name Changed", "Collaboration"),
            toMultiSelectItem("Privacy Changed", "Group Privacy Changed", "C")
        ]}
        values={["Group Created", "Group Name Changed"]}
        onValuesChange={(event, values) => {
            console.log("New values: ", values);
        }}
    />
);
