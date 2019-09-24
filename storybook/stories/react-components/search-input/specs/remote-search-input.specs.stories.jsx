import { LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { StarWarsCharactersSearchInput } from "@stories/react-components/search-input/components";
import { storiesBuilder } from "@utils/stories-builder";

function createRemoteSearchInput(props = {}) {
    return <StarWarsCharactersSearchInput
        onValueChange={logValueChanged}
        {...props}
    />;
}

function stories(segment) {
    return storiesBuilder(module, "Remote-Search-Input|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed",
         () =>
             createRemoteSearchInput()
    )
    .add("opened",
         () =>
             createRemoteSearchInput({
                 open: true
             })
    )
    .add("disabled",
         () =>
             createRemoteSearchInput({
                 disabled: true
             })
    );

stories("/selected value")
    .add("no selection",
         () =>
             createRemoteSearchInput()
    )
    .add("value selected",
         () =>
             createRemoteSearchInput({
                 defaultValue: LAURIE_VALUE
             })
    );
