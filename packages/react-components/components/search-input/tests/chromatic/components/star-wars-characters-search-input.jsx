import { PureComponent } from "react";
import { RemoteSearchInput, searchInputResult, useDefaultResultsFetcher } from "@orbit-ui/react-search-input/src";
import { func } from "prop-types";

export class StarWarsCharactersSearchInput extends PureComponent {
    static propTypes = {
        onFetchResults: func,
        onResults: func
    };

    handleResults = response => {
        return response.results.map(x => searchInputResult(x.url, x.name, x));
    }

    handleFetchResults = useDefaultResultsFetcher("https://swapi.co/api/people", "search");

    render() {
        return (
            <RemoteSearchInput
                onFetchResults={this.handleFetchResults}
                onResults={this.handleResults}
                {...this.props}
            />
        );
    }
}
