import { LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { StarWarsCharactersSearchInput } from "@stories/react-components/search-input/components";
import { storiesBuilder } from "@utils/stories-builder";

function RemoteSearchInput(props) {
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
             <RemoteSearchInput />
    )
    .add("opened",
         () =>
             <RemoteSearchInput
                 open
             />
    )
    .add("disabled",
         () =>
             <RemoteSearchInput
                 disabled
             />
    );

stories("/selected value")
    .add("no selection",
         () =>
             <RemoteSearchInput />
    )
    .add("value selected",
         () =>
             <RemoteSearchInput
                 defaultValue={LAURIE_VALUE}
             />
    );
