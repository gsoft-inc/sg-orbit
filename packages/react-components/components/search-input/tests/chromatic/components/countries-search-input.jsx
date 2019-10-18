import { PureComponent } from "react";
import { RemoteSearchInput, searchInputResult, useDefaultResultsFetcher } from "@orbit-ui/react-search-input/src";

export class CountriesSearchInput extends PureComponent {
    handleResults = response => {
        return response.data.map(x => searchInputResult(x.code, x.name));
    }

    handleFetchResults = useDefaultResultsFetcher("http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=5", "namePrefix");

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
