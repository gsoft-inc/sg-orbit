import { Children, forwardRef } from "react";
import { Dropdown } from "../../dropdown";
import { DropdownMenuHeader } from "./header";
import { DropdownMenuItem } from "./item";
import { func, object, oneOf, oneOfType, string } from "prop-types";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "basic",
    "button",
    "clearable",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
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
     * A dropdown menu can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * Additional CSS classes to render on the dropdown wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the dropdown wrapper element.
     */
    wrapperStyle: object,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

function useRenderer({ className, forwardedRef, children, rest }) {
    return () => {
        const hasChildren = Children.count(children) > 0;

        const classes = mergeClasses(
            "dropdown-menu",
            className
        );

        return (
            <Dropdown
                {...rest}
                className={classes}
                ref={forwardedRef}
            >
                <Choose>
                    <When condition={hasChildren}>
                        <Dropdown.Menu tabindex="0">{children}</Dropdown.Menu>
                    </When>
                    <Otherwise>
                        {children}
                    </Otherwise>
                </Choose>
            </Dropdown>
        );
    };
}

export function InnerDropdownMenu(props) {
    const { className, forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu");

    const render = useRenderer({ className, forwardedRef, children, rest });

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownMenu.propTypes = propTypes;
InnerDropdownMenu.defaultProps = defaultProps;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu { ...props } forwardedRef={ref} />
));

// DropdownMenu.Menu and DropdownMenu.SearchInput are not supported.
[InnerDropdownMenu, DropdownMenu].forEach(x => {
    x.Divider = Dropdown.Divider;
    x.Header = DropdownMenuHeader;
    x.Item = DropdownMenuItem;
});
