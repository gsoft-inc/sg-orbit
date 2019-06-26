import { storiesOf } from "@storybook/react";
import { SearchInput, searchInputResult } from "../src";

storiesOf("SearchInput", module).add("default", () => 
    <SearchInput
        results={[
            searchInputResult("1", "George"),
            searchInputResult("2", "Laurie"),
            searchInputResult("3", "Clara"),
            searchInputResult("4", "Felix"),
            searchInputResult("5", "Audrey"),
        ]}
        onValueChange={(event, value) => {
            console.log("New value: ", value);
        }}
    />
);
