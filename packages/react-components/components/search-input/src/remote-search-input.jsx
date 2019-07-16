import { InvalidOperationError, cancellablePromise, defer, ensure, httpGet } from "@sharegate/react-components-shared";
import { PureComponent } from "react";
import { SearchInputController } from "./search-input-controller";
import { bool, func, number, string } from "prop-types";
import { debounce, isArray, isNil } from "lodash";

const KEYS = {
    esc: 27
};

function defaultResultsFetcher(event, url, data, options) {
    return new Promise((resolve, reject) => {
        httpGet({ url, data, ...options })
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(new InvalidOperationError(`Remote Search Input - The request failed with response: "${response.statusText}"`));
                }
            })
            .catch(error => {
                if (error.isTimeout) {
                    reject(new InvalidOperationError("Remote Search Input - The request timed out."));
                } else {
                    reject(error);
                }
            });
    });
}

/**
 * Create an instance of the default results fetcher
 * @param {string} url - The query url.
 * @param {string} [queryParameter="query"] - The query parameter.
 * @param {Object} [options]
 * @param {Object} [options.queryData] - Additional query data.
 * @param {Object} [options.requestOptions]
 * @param {number} [options.requestOptions.timeout] - Query timeout value in milliseconds.
 * @param {Object} [options.requestOptions.*] - Any fetch API options.
 * @returns {Function} - The fetcher instance
 */
export function useDefaultResultsFetcher(url, queryParameter = "query", { queryData = {}, requestOptions } = {}) {
    ensure(url, "url", "useDefaultResultsFetcher").isNotNullOrEmpty();

    return (event, query) => {
        const data = {
            [queryParameter]: query,
            ...queryData
        };

        return defaultResultsFetcher(event, url, data, requestOptions);
    }
}

function isPromise(value) {
    return !isNil(value) && !isNil(value.then);
}

export class RemoteSearchInput extends PureComponent {
    static propTypes = {
        value: string,
        defaultValue: string,
        onValueChange: func.isRequired,
        onFetchResults: func.isRequired,
        onResults: func,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        debounceDelay: number,
        loadingDelay: number,
        minCharacters: number,
        placeholder: string,
        disabled: bool,
        className: string
    };

    static defaultProps = {
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
                    let results = await this.fetch(event, query);

                    if (!isNil(onResults)) {
                        results = onResults(results, query);

                        if (!isArray(results)) {
                            throw new InvalidOperationError("Remote Search Input - onResults expect a return value of type array.");
                        }
                    }

                    this.hideLoading();
                    this.setState({ isOpen: true, results: results });
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

    fetch(event, query) {
        const { onFetchResults } = this.props;

        const promise = onFetchResults(event, query);

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
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, placeholder, disabled, className } = this.props;
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
                disabled={disabled}
                loading={isLoading}
                className={className}
            />
        );
    }
}
