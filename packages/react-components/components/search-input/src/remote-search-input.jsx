import {
    ArgumentError,
    AutoControlledPureComponent,
    InvalidOperationError,
    KEYS,
    cancellablePromise,
    defer,
    ensure,
    getAutoControlledStateFromProps,
    httpGet
} from "@orbit-ui/react-components-shared";
import { SIZES } from "./sizes";
import { SearchInputController } from "./search-input-controller";
import { bool, func, node, number, oneOf, string } from "prop-types";
import { debounce, isArray, isNil } from "lodash";

function defaultResultsFetcher(event, url, data, options) {
    return new Promise((resolve, reject) => {
        httpGet({ url, data, options })
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
 * @param {Object} [options.requestOptions.*] - Any fetch API options: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @returns {Function} - The fetcher instance
 */
export function useDefaultResultsFetcher(url, queryParameter = "query", { queryData = {}, requestOptions = {} } = {}) {
    ensure(url, "url", "useDefaultResultsFetcher").isNotNullOrEmpty();

    return (event, query) => {
        const data = {
            [queryParameter]: query,
            ...queryData
        };

        return defaultResultsFetcher(event, url, data, requestOptions);
    };
}

function isPromise(value) {
    return !isNil(value) && !isNil(value.then);
}

export class RemoteSearchInput extends AutoControlledPureComponent {
    static propTypes = {
        /**
         * A controlled value property.
         */
        value: string,
        /**
         * Initial value.
         */
        defaultValue: string,
        /**
         * Called when the value change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} value - Selected value.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onValueChange: func.isRequired,
        /**
         * Called when a fetch event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} query - Search query that triggered the search.
         * @param {Object} props - All the props.
         * @returns {Promise} - Promise resolved with the results to display or reject if the HTTP call fail.
         */
        onFetchResults: func.isRequired,
        /**
         * Called after a fetch.
         * @param {Result[]} results - Results returned by the fetch call.
         * @param {string} query - Search query that triggered the search.
         * @param {Object} props - All the props.
         * @returns {Result[]} - Results to display.
         */
        onResults: func,
        /**
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onClear: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Called when a click happens outside the search input.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onOutsideClick: func,
        /**
         * Called on keydown.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onKeyDown: func,
        /**
         * Called when the search results open / close.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {boolean} isVisible - Indicate if the search input results are visible.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onVisibilityChange: func,
        /**
         * Render a result.
         * @param {Object} result - Result to render.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - React element to render.
         */
        resultRenderer: func,
        /**
         * Whether or not the query should be cleared when a result is selected.
         */
        clearOnSelect: bool,
        /**
         * Message to display when there are no results matching the query.
         */
        noResultsMessage: string,
        /**
         * Delay before initiating a search when the query change.
         */
        debounceDelay: number,
        /**
         * Delay before displaying the loading indicator.
         */
        loadingDelay: number,
        /**
         * Minimum characters to query for results.
         */
        minCharacters: number,
        /**
         * The search input placeholder text.
         */
        placeholder: string,
        /**
         * A controlled open value that determined whether or not the search results are displayed.
         */
        open: bool,
        /**
         * The initial value of open.
         */
        defaultOpen: bool,
        /**
         * A custom React SVG component displayed before the prompt.
         */
        icon: node,
        /**
         * A custom React SVG component for the clear button.
         */
        clearIcon: node,
        /**
         * A disabled search input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the search input should autofocus on render.
         */
        autofocus: bool,
        /**
         * Delay before trying to autofocus.
         */
        autofocusDelay: number,
        /**
         * Whether or not the search results should close when the search input loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the search results should close when a click happens outside the search input.
         * Requires `closeOnBlur` to be `false`.
         */
        closeOnOutsideClick: bool,
        /**
         * A date picker can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * Whether or not the search input take up the width of its container.
         */
        fluid: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        loadingDelay: 150,
        minCharacters: 1,
        debounceDelay: 200,
        closeOnBlur: true,
        closeOnOutsideClick: false
    };

    static autoControlledProps = ["open"];

    state = {
        open: false,
        isLoading: false,
        results: []
    };

    _fetchResultsPromise = null;

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, RemoteSearchInput.autoControlledProps);
    }

    componentDidUpdate() {
        const { closeOnBlur, closeOnOutsideClick } = this.props;

        if (closeOnBlur && closeOnOutsideClick) {
            throw new ArgumentError("RemoteSearchInput - The \"closeOnBlur\" and \"closeOnOutsideClick\" props cannot be both \"true\".");
        }
    }

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

        this.close(event);

        onValueChange(event, value, this.props);
    };

    handleClear = event => {
        const { onClear, closeOnBlur } = this.props;

        this.cancelFetch();
        this.hideLoading();

        if (!closeOnBlur) {
            this.close(event);
        }

        if (!isNil(onClear)) {
            onClear(event, this.props);
        }
    };

    // Closing the search input on blur will:
    // - close on outside click
    // - close on blur
    // - close on value select
    handleBlur = event => {
        const { onBlur, closeOnBlur } = this.props;

        if (closeOnBlur) {
            this.cancelFetch();
            this.hideLoading();
            this.close(event);
        }

        if (!isNil(onBlur)) {
            onBlur(event, this.props);
        }
    };

    handleOutsideClick = event => {
        const { onOutsideClick, closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            this.cancelFetch();
            this.hideLoading();
            this.close(event);
        }

        if (!isNil(onOutsideClick)) {
            onOutsideClick(event, this.props);
        }
    };

    handleKeyDown = event => {
        const { onKeyDown } = this.props;

        // Since we fully control the open / close of the <Search /> component, we must handle close on "esc" ourself.
        if (event.keyCode === KEYS.esc) {
            this.close(event);
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    };

    // TODO: memoizing search result could greatly improved the performance of this component:
    //  - We could save remote queries
    //  - The shallow comparison done by search-input-controller would not force a re-render when this is the same results
    search = debounce(
        async (event, query) => {
            const { onResults, minCharacters } = this.props;

            const showResults = results => {
                this.hideLoading();
                this.open(event);

                this.setState({ results: results });
            };

            if (query.length >= minCharacters) {
                this.showLoading();

                try {
                    let results = await this.fetch(event, query);

                    if (!isNil(onResults)) {
                        results = onResults(results, query, this.props);

                        if (!isArray(results)) {
                            throw new InvalidOperationError("Remote Search Input - onResults expect a return value of type array.");
                        }
                    }

                    showResults(results);
                } catch (error) {
                    if (!isNil(error)) {
                        // To cancel a promise it must be rejected, ignore it. If it's something else, show no results.
                        if (error.isCancelled !== true) {
                            showResults([]);
                        }
                    } else {
                        showResults([]);
                    }
                }
            } else {
                this.close(event);
                this.setState({ results: [] });
            }
        },
        this.props.debounceDelay,
        { leading: true }
    );

    fetch(event, query) {
        const { onFetchResults } = this.props;

        const promise = onFetchResults(event, query, this.props);

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

    open(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true, this.props);
        }
    }

    close(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false, this.props);
        }
    }

    showLoading = defer(() => { this.setState({ isLoading: true }); }, this.props.loadingDelay);

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
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, placeholder, icon, clearIcon, disabled, autofocus, autofocusDelay, size, fluid, className } = this.props;
        const { open, isLoading, results } = this.state;

        return (
            <SearchInputController
                open={open}
                results={results}
                value={value}
                defaultValue={defaultValue}
                onValueChange={this.handleValueChange}
                onSearch={this.handleSearch}
                onClear={this.handleClear}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onOutsideClick={this.handleOutsideClick}
                resultRenderer={resultRenderer}
                clearOnSelect={clearOnSelect}
                noResultsMessage={noResultsMessage}
                minCharacters={minCharacters}
                debounceDelay={0}
                placeholder={placeholder}
                loading={isLoading}
                icon={icon}
                clearIcon={clearIcon}
                disabled={disabled}
                autofocus={autofocus}
                autofocusDelay={autofocusDelay}
                size={size}
                fluid={fluid}
                className={className}
            />
        );
    }
}
