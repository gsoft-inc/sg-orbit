# Migrate Apricot to Orbit UI

## Installation

Install the following npm packages:

```bash
npm install @orbit-ui/css-normalize @orbit-ui/fonts @orbit-ui/icons @orbit-ui/foundation @orbit-ui/tachyons
```

```bash
npm install react-spring styled-jsx moment lodash @orbit-ui/semantic-ui-theme semantic-ui-react @orbit-ui/react-components
```

Remove the following npm packages:

- `@sharegate/semantic-ui-sg`
- `@sharegate/tachyons-sg`
- `react-dates`

## Fonts

Add the following to the file `src/app/styles/main.css`:

```css
@import "~@orbit-ui/fonts";
```

And remove:

```css
@import "./fonts/calibre/calibre.css";
```

Delete the folder `src/app/styles/fonts`

## Normalizer

Add the following to the file `src/app/styles/main.css`:

```css
@import "~@orbit-ui/css-normalize";
```

Remove the following code from the file `src/app/styles/elements.css`:

```css
::before,
::after {
    box-sizing: border-box;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
```

## Foundation

Add the following to the file `src/app/styles/main.css`:

```css
@import "~@orbit-ui/foundation/apricot.css";
```

## Tachyons

In the file `src/app/styles/main.css`, replace:

```css
@import "~@sharegate/tachyons-sg/css/tachyons.min.css";
```

By:

```css
@import "~@orbit-ui/tachyons/apricot.css";
```

## Semantic UI theme

In the file `src/app/styles/main.css`, replace:

```css
@import "~@sharegate/semantic-ui-sg/button.css";
@import "~@sharegate/semantic-ui-sg/divider.css";
@import "~@sharegate/semantic-ui-sg/dropdown.css";
@import "~@sharegate/semantic-ui-sg/item.css";
@import "~@sharegate/semantic-ui-sg/menu.css";
@import "~@sharegate/semantic-ui-sg/transition.css";
@import "~@sharegate/semantic-ui-sg/input.css";
@import "~@sharegate/semantic-ui-sg/checkbox.css";
@import "~@sharegate/semantic-ui-sg/search.css";
@import "~@sharegate/semantic-ui-sg/loader.css";
@import "~@sharegate/semantic-ui-sg/icon.css";
@import "~@sharegate/semantic-ui-sg/popup.css";
@import "~@sharegate/semantic-ui-sg/placeholder.css";
@import "~@sharegate/semantic-ui-sg/progress.css";
@import "~@sharegate/semantic-ui-sg/label.css";
```

By:

```css
@import "~@orbit-ui/semantic-ui-theme/button.css";
@import "~@orbit-ui/semantic-ui-theme/divider.css";
@import "~@orbit-ui/semantic-ui-theme/dropdown.css";
@import "~@orbit-ui/semantic-ui-theme/item.css";
@import "~@orbit-ui/semantic-ui-theme/menu.css";
@import "~@orbit-ui/semantic-ui-theme/transition.css";
@import "~@orbit-ui/semantic-ui-theme/input.css";
@import "~@orbit-ui/semantic-ui-theme/checkbox.css";
@import "~@orbit-ui/semantic-ui-theme/search.css";
@import "~@orbit-ui/semantic-ui-theme/loader.css";
@import "~@orbit-ui/semantic-ui-theme/icon.css";
@import "~@orbit-ui/semantic-ui-theme/popup.css";
@import "~@orbit-ui/semantic-ui-theme/placeholder.css";
@import "~@orbit-ui/semantic-ui-theme/progress.css";
@import "~@orbit-ui/semantic-ui-theme/label.css";
```

## React components

The following in-solution components can be replaced by Orbit UI custom React components:

- DateRangePicker
- MultiSelect
- SearchInput
- RemoteSearchInput

Update all the import of the components for something that match the following template:

```javascript
import { DateRangePicker } from "@orbit-ui/react-components";
```
Delete the following components folders:

- `src/app/components/auto-controlled-state`
- `src/app/components/date-range-picker`
- `src/app/components/multi-select`
- `src/app/components/popup`
- `src/app/components/search-input`

Delete the following playground folders:

- `src/app/playground/components/date-range-pickers`
- `src/app/playground/components/multi-select`
- `src/app/playground/components/search-input`

### RemoteSearchInput

The RemoteSearchInput has been developed on top of the http stack of Apricot. Therefore, the usage must be changed. Fortunatelly, only the PeoplePicker
is using this control...

The following properties has been deprecated:

- `url`
- `urlData`
- `queryParameter`

The following properties has been renamed:

- `autoFocus` -> `autofocus`

The following properties are now required:

- `onFetchResults`

The following utilities has been added:

- `useDefaultResultsFetcher`

The following utilities has been renamed:

- `toMultiSelectItem` -> `multiSelectItem`

In the file `src/app/features/components/people-picker/people-picker.jsx`, update:

```javascript
render() {
    const { defaultValue, url, autoFocus, queryParameter, urlData, onValueChange, clearOnSelect, resultRenderer, noResultsMessage, placeholder, disabled, loadingDelay, className } = this.props;

    // prettier-ignore
    return (
        <RemoteSearchInput
            defaultValue={defaultValue}
            url={url}
            urlData={urlData}
            queryParameter={queryParameter}
            onValueChange={onValueChange}
            onResults={this.handleResults}
            clearOnSelect={clearOnSelect}
            resultRenderer={resultRenderer}
            noResultsMessage={noResultsMessage}
            placeholder={placeholder}
            disabled={disabled}
            loadingDelay={loadingDelay}
            autoFocus={autoFocus}
            className={className}
        />
    );
}
```

For:

```javascript
import { RemoteSearchInput, useDefaultResultsFetcher } from "@orbit-ui/react-components";

// ....

handleFetchResults = useDefaultResultsFetcher(this.props.url, this.props.queryParameter, {
    queryData: this.props.urlData
});

// ....

render() {
    const { defaultValue, autoFocus, onValueChange, clearOnSelect, resultRenderer, noResultsMessage, placeholder, disabled, loadingDelay, className } = this.props;

    // prettier-ignore
    return (
        <RemoteSearchInput
            defaultValue={defaultValue}
            onFetchResults={this.handleFetchResults}
            onValueChange={onValueChange}
            onResults={this.handleResults}
            clearOnSelect={clearOnSelect}
            resultRenderer={resultRenderer}
            noResultsMessage={noResultsMessage}
            placeholder={placeholder}
            disabled={disabled}
            loadingDelay={loadingDelay}
            autofocus={autoFocus}
            className={className}
        />
    );
}
```

In the file `src/app/features/activity/activity-feed-page/active/activity-type-filter.jsx`:

Rename all `toMultiSelectItem` to `multiSelectItem`



