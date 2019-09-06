import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { SearchInput } from "@orbit-ui/react-search-input/src";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Search-Input|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed",
         () =>
             <SearchInput
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
             />
    )
    .add("opened",
         () =>
             <SearchInput
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
             />
    )
    .add("disabled",
         () =>
             <SearchInput
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 disabled
             />
    );

stories("/selected value")
    .add("no selection",
         () =>
             <SearchInput
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
             />
    )
    .add("value selected",
         () =>
             <SearchInput
                 results={DEFAULT_RESULTS}
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
             />
    );
