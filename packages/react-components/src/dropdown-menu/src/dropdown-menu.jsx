import { ArgumentError, LARGE, MEDIUM, MINI, SMALL, TINY, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Dropdown } from "../../dropdown";
import { any, arrayOf, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "as",
    "basic",
    "button",
    "clearable",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
    "direction",
    "floating",
    "inline",
    "labeled",
    "item",
    "minCharacters",
    "multiple",
    "noResultsMessage",
    "onAddItem",
    "onChange",
    "onLabelClick",
    "onSearchChange",
    "openOnFocus",
    "pointing",
    "renderLabel",
    "search",
    "searchInput",
    "searchQuery",
    "selectOnBlur",
    "selectOnNavigation",
    "selectedLabel",
    "selection",
    "simple",
    "wrapSelection"
];

const propTypes = {
    /**
     * An array of items object shorthands.
     */
    options: arrayOf(any),
    /**
     * A dropdown menu can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

export function PureDropdownMenu(props) {
    const { forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu");

    return (
        <Dropdown
            ref={forwardedRef}
            {...rest}
        />
    );
}

PureDropdownMenu.propTypes = propTypes;
PureDropdownMenu.defaultProps = defaultProps;

export const DropdownMenu = forwardRef((props, ref) => (
    <PureDropdownMenu { ...props } forwardedRef={ref} />
));
