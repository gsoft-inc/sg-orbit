import { RemoteSearchInput, searchInputResult, useDefaultResultsFetcher } from "../../../src";
import React, { PureComponent } from "react";

export class StarWarsCharactersSearchInput extends PureComponent {
    handleResults = response => {
        return response.results.map(x => searchInputResult(x.url, x.name, x));
    }

    handleFetchResults = useDefaultResultsFetcher("https://swapi.co/api/people", "search");

    render() {
        const { onValueChange } = this.props;

        return (
            <RemoteSearchInput
                onFetchResults={this.handleFetchResults}
                onValueChange={onValueChange}
                onResults={this.handleResults}
            />
        )
    }
}
