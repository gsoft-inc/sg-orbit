import { ReactComponent as CustomClearIcon } from "./assets/icon-custom-clear.svg";
import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "../shared";
import { SearchInputController } from "../../src";
import { noop } from "lodash";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Search-Input-Ctrl|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("opened",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/loading/closed")
    .add("value selected",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 loading
             />
    )
    .add("no selection",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 loading
             />
    );

stories("/loading/opened")
    .add("value selected",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 loading
             />
    )
    .add("no selection",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 loading
             />
    );

stories("/disabled")
    .add("value selected",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 disabled
             />
    )
    .add("no selection",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 disabled
             />
    )
    .add("cannot be opened",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 disabled
             />
    )
    .add("cannot show loading spinner",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 loading
                 disabled
             />
    );

stories("/results")
    .add("with results",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("no results",
         () =>
             <SearchInputController
                 open
                 results={[]}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/selected value/closed")
    .add("no selection",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("value selected",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/selected value/closed/clear button")
    .add("cannot clear when no selection",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("can clear when value selected",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/selected value/opened")
    .add("no selection",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("value selected",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/selected value/opened/clear button")
    .add("cannot clear when no selection",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    )
    .add("can clear when value selected",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/default value/closed")
    .add("value selected",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/default value/opened")
    .add("value selected",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
             />
    );

stories("/customization")
    .add("no results message",
         () =>
             <SearchInputController
                 open
                 results={[]}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 noResultsMessage="Custom no results message"
             />
    )
    .add("placeholder",
         () =>
             <SearchInputController
                 results={[]}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 placeholder="Custom placeholder"
             />
    )
    .add("clear icon",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 clearIcon={<CustomClearIcon />}
             />
    )
    .add("result renderer",
         () =>
             <SearchInputController
                 open
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 resultRenderer={({ text }) => {
                     return <div className="bg-red">{text}</div>;
                 }}
             />
    )
    .add("class name",
         () =>
             <SearchInputController
                 results={DEFAULT_RESULTS}
                 onValueChange={logValueChanged}
                 onSearch={noop}
                 className="bg-red-inner"
             />
    );

