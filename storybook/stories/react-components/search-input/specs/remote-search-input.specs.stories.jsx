import { LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { StarWarsCharactersSearchInput } from "@stories/react-components/search-input/components";
import { storiesBuilder } from "@utils/stories-builder";

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
             <StarWarsCharactersSearchInput
                 onValueChange={logValueChanged}
             />
    )
    .add("opened",
         () =>
             <StarWarsCharactersSearchInput
                 open
                 onValueChange={logValueChanged}
             />
    )
    .add("disabled",
         () =>
             <StarWarsCharactersSearchInput
                 onValueChange={logValueChanged}
                 disabled
             />
    );

stories("/selected value")
    .add("no selection",
         () =>
             <StarWarsCharactersSearchInput
                 onValueChange={logValueChanged}
             />
    )
    .add("value selected",
         () =>
             <StarWarsCharactersSearchInput
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
             />
    );
