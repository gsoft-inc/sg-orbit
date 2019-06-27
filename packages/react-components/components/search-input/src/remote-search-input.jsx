import { InvalidOperationError, cancellablePromise, defer, httpGet } from "@sharegate/react-components-shared";
import { PureComponent } from "react";
import { SearchInputController } from "./search-input-controller";
import { bool, func, number, object, string } from "prop-types";
import { debounce, isArray, isNil, merge } from "lodash";

const KEYS = {
    esc: 27,
    dummy: 28
};

function fetchResults(event, url, data, options) {
    return httpGet({ url, data, ...options });
}

function isPromise(value) {
    return !isNil(value) && !isNil(value.then);
}

export class RemoteSearchInput extends PureComponent {
    static propTypes = {
        value: string,
        defaultValue: string,
        url: string.isRequired,
        urlData: object,
        queryParameter: string,
        timeout: number,
        onValueChange: func.isRequired,
        onFetchResults: func,
        onResults: func,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        debounceDelay: number,
        loadingDelay: number,
        minCharacters: number,
        placeholder: string,
        fluid: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        onFetchResults: fetchResults,
        queryParameter: "query",
        timeout: 0,
        loadingDelay: 150,
        minCharacters: 1,
        debounceDelay: 200
    };

    state = {
        isOpen: false,
        isLoading: false,
        results: []
    };

    _fetchResultsPromise = null;

    componentWillUnmount() {
        this.cancelFetch();
        this.cancelLoading();

        this.search.cancel();
    }

    handleSearch = (event, query) => {
        this.cancelFetch();
        this.search(event, query);
    };

    handleValueChange = (event, value) => {
        const { onValueChange } = this.props;

        this.setState({ isOpen: false });

        if (isNil(value)) {
            this.handleClear(event);
        }

        onValueChange(event, value);
    };

    handleClear = () => {
        this.cancelFetch();
        this.hideLoading();
    };

    handleBlur = () => {
        this.cancelFetch();
        this.hideLoading();

        this.setState({ isOpen: false });
    };

    handleKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            this.setState({ isOpen: false });
        }
    };

    // TODO: memoizing search result could greatly improved the performance of this component:
    //  - We could save remote queries
    //  - The shallow comparison done by search-input-controller would not force a re-render when this is the same results
    search = debounce(
        async (event, query) => {
            const { onResults, minCharacters } = this.props;

            if (query.length >= minCharacters) {
                this.showLoading();

                try {
                    const response = await this.fetch(event, this.getFetchData(query));

                    if (response.ok) {
                        let results = response.content;

                        if (!isNil(onResults)) {
                            results = onResults(results, query);

                            if (!isArray(results)) {
                                throw new InvalidOperationError("Remote Search Input - onResults expect a return value of type array.");
                            }
                        }

                        this.hideLoading();
                        this.setState({ isOpen: true, results: results });
                    }
                } catch (error) {
                    // To cancel a promise it must be rejected, ignore it. If it's something else, bubble up.
                    if (error.isCancelled !== true) {
                        throw error;
                    }
                }
            } else {
                this.setState({ isOpen: false, results: [] });
            }
        },
        this.props.debounceDelay,
        { leading: true }
    );

    getFetchData(query) {
        const { urlData, queryParameter } = this.props;

        const data = { [queryParameter]: query };

        if (isNil(urlData)) {
            return data;
        }

        return merge(data, urlData);
    }

    fetch(event, data) {
        const { url, timeout, onFetchResults } = this.props;

        const promise = onFetchResults(event, url, data, { timeout });

        if (!isPromise(promise)) {
            throw new InvalidOperationError("RemoteSearchInput - onFetchResults expect a return value of type Promise.");
        }

        this._fetchResultsPromise = cancellablePromise(promise);

        return this._fetchResultsPromise.promise;
    }

    cancelFetch() {
        if (!isNil(this._fetchResultsPromise)) {
            this._fetchResultsPromise.cancel();
        }
    }

    // prettier-ignore
    showLoading = defer(() => { this.setState({ isLoading: true }) }, this.props.loadingDelay);

    hideLoading() {
        const { isLoading } = this.state;

        this.cancelLoading();

        if (isLoading) {
            this.setState({ isLoading: false });
        }
    }

    cancelLoading() {
        this.showLoading.cancel();
    }

    render() {
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, placeholder, fluid, disabled, className } = this.props;
        const { isOpen, isLoading, results } = this.state;

        return (
            <SearchInputController
                open={isOpen}
                results={results}
                value={value}
                defaultValue={defaultValue}
                onValueChange={this.handleValueChange}
                onSearch={this.handleSearch}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                resultRenderer={resultRenderer}
                clearOnSelect={clearOnSelect}
                noResultsMessage={noResultsMessage}
                minCharacters={minCharacters}
                debounceDelay={0}
                placeholder={placeholder}
                fluid={fluid}
                disabled={disabled}
                loading={isLoading}
                className={className}
            />
        );
    }
}
