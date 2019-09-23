import { ClearIcon } from "@orbit-ui/icons";
import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { SearchInputController } from "@orbit-ui/react-search-input/src";
import { noop } from "lodash";
import { storiesBuilder } from "@utils/stories-builder";

function createSearchInputController({ results = DEFAULT_RESULTS, ...otherProps } = {}) {
    return <SearchInputController
        results={results}
        onValueChange={logValueChanged}
        onSearch={noop}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesBuilder(module, "Search-Input-Ctrl|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed",
         () =>
             createSearchInputController()
    )
    .add("opened",
         () =>
             createSearchInputController({
                 open: true
             })
    )
    .add("autofocus",
         () =>
             createSearchInputController({
                 autofocus: true
             })
    );

stories("/loading/closed")
    .add("value selected",
         () =>
             createSearchInputController({
                 value: LAURIE_VALUE,
                 loading: true
             })
    )
    .add("no selection",
         () =>
             createSearchInputController({
                 loading: true
             })
    );

stories("/loading/opened")
    .add("value selected",
         () =>
             createSearchInputController({
                 open: true,
                 value: LAURIE_VALUE,
                 loading: true
             })
    )
    .add("no selection",
         () =>
             createSearchInputController({
                 open: true,
                 loading: true
             })
    );

stories("/disabled")
    .add("value selected",
         () =>
             createSearchInputController({
                 value: LAURIE_VALUE,
                 disabled: true
             })
    )
    .add("no selection",
         () =>
             createSearchInputController({
                 disabled: true
             })
    )
    .add("cannot be opened",
         () =>
             createSearchInputController({
                 open: true,
                 disabled: true
             })
    )
    .add("cannot show loading spinner",
         () =>
             createSearchInputController({
                 loading: true,
                 disabled: true
             })
    );

stories("/results")
    .add("with results",
         () =>
             createSearchInputController({
                 open: true
             })
    )
    .add("no results",
         () =>
             createSearchInputController({
                 open: true,
                 results: []
             })
    );

stories("/selected value/closed")
    .add("no selection",
         () =>
             createSearchInputController()
    )
    .add("value selected",
         () =>
             createSearchInputController({
                 value: LAURIE_VALUE
             })
    );

stories("/selected value/closed/clear button")
    .add("cannot clear when no selection",
         () =>
             createSearchInputController()
    )
    .add("can clear when value selected",
         () =>
             createSearchInputController({
                 value: LAURIE_VALUE
             })
    );

stories("/selected value/opened")
    .add("no selection",
         () =>
             createSearchInputController({
                 open: true
             })
    )
    .add("value selected",
         () =>
             createSearchInputController({
                 open: true,
                 value: LAURIE_VALUE
             })
    );

stories("/selected value/opened/clear button")
    .add("cannot clear when no selection",
         () =>
             createSearchInputController({
                 open: true
             })
    )
    .add("can clear when value selected",
         () =>
             createSearchInputController({
                 open: true,
                 value: LAURIE_VALUE
             })
    );

stories("/default value/closed")
    .add("value selected",
         () =>
             createSearchInputController({
                 defaultValue: LAURIE_VALUE
             })
    );

stories("/default value/opened")
    .add("value selected",
         () =>
             createSearchInputController({
                 open: true,
                 defaultValue: LAURIE_VALUE
             })
    );

stories("/customization")
    .add("no results message",
         () =>
             createSearchInputController({
                 open: true,
                 results: [],
                 noResultsMessage: "Custom no results message"
             })
    )
    .add("placeholder",
         () =>
             createSearchInputController({
                 results: [],
                 placeholder: "Custom placeholder"
             })
    )
    .add("clear icon",
         () =>
             createSearchInputController({
                 defaultValue: LAURIE_VALUE,
                 clearIcon: <ClearIcon className="h3 w3 fill-red" />
             })
    )
    .add("result renderer",
         () =>
             createSearchInputController({
                 open: true,
                 resultRenderer: ({ text }) => {
                     return <div className="bg-red">{text}</div>;
                 }
             })
    )
    .add("class name",
         () =>
             createSearchInputController({
                 className: "bg-red-inner"
             })
    );

