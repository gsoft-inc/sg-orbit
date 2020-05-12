import { ArgumentError, LARGE, MEDIUM, MINI, SMALL, TINY, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Dropdown } from "../../dropdown";
import { Label } from "semantic-ui-react";
import { MonkeyPatchSemanticDropdown } from "./monkey-patch-semantic-dropdown";
import { SelectItem, createSelectItem } from "./item";
import { any, arrayOf, bool, element, func, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef } from "react";
import { isArray, isNil } from "lodash";
import { renderAvatar } from "./render-avatar";
import { renderIcons } from "./render-icons";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "basic",
    "button",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
    "direction",
    "floating",
    "header",
    "labeled",
    "item",
    "openOnFocus",
    "pointing",
    "selection",
    "selectOnBlur",
    "selectOnNavigation",
    "simple",
    "wrapSelection"
];

const ACTION_SHAPE = {
    content: element,
    className: string
};

const LABEL_SIZE = {
    [SMALL]: MINI,
    [MEDIUM]: TINY,
    [LARGE]: SMALL
};

const propTypes = {
    /**
     * An array of items object shorthands.
     */
    options: arrayOf(any).isRequired,
    /**
     * A select can have a list of actions after his items.
     */
    actions: arrayOf(shape(ACTION_SHAPE)),
    /**
     * A select can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * A transparent select has no background.
     */
    transparent: bool,
    /**
     * @ignore
     */
    inline: bool,
    /**
     * @ignore
     */
    multiple: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE,
    transparent: false,
    inline: false,
    multiple: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ inline, size }) {
    if (inline && size !== DEFAULT_SIZE) {
        throw new ArgumentError("@orbit-ui/react-components/select you cannot specify a size for an inline select.");
    }
}

function throwWhenMultipleAndValuesIsNotAnArray({ multiple, defaultValue, value }) {
    if (multiple) {
        if (!isNil(defaultValue) && !isArray(defaultValue)) {
            throw new ArgumentError("@orbit-ui/react-components/select defaultValues must be an array when multiple is true.");
        }

        if (!isNil(value) && !isArray(value)) {
            throw new ArgumentError("@orbit-ui/react-components/select values must be an array when multiple is true.");
        }
    }
}

function useMultipleValuesLabelRenderer({ size }) {
    return ({ text, avatar, icons, iconsPosition }, index, { className, ...rest }) => {
        let content = text;
        let additionalClasses = "";

        if (!isNil(avatar)) {
            content = (
                <>
                    {renderAvatar(avatar)}
                    {text}
                </>
            );

            additionalClasses = "with-avatar";
        } else if (!isNil(icons)) {
            let left = null;
            let right = null;

            if (iconsPosition === "right") {
                right = renderIcons(icons, size);
            } else {
                left = renderIcons(icons, size);
            }

            content = (
                <>
                    {!isNil(left) && left}
                    <span className="mr1">{text}</span>
                    {!isNil(right) && right}
                </>
            );

            additionalClasses = mergeClasses(
                "with-icons",
                iconsPosition === "right" ? "with-icons-right" : "with-icons-left"
            );
        }

        const classes = mergeClasses(
            additionalClasses,
            className
        );

        return (
            <Label
                {...rest}
                content={content}
                size={LABEL_SIZE[size]}
                className={classes}
            />
        );
    };
}

function useActionRenderer() {
    return ({ content, key, className, ...otherProps }, index) => {
        const classes = mergeClasses(
            className,
            "action bg-white o-100"
        );

        return { content, className: classes, disabled: true, key: key || index, ...otherProps };
    };
}

function useOptionsRenderer({ options, actions }) {
    const renderAction = useActionRenderer();

    return () => {
        const selectOptions = options.map(x => {
            return {
                ...x,
                factory: createSelectItem
            };
        });

        if (!isNil(actions)) {
            return [...selectOptions, ...actions.map(renderAction)];
        }

        return selectOptions;
    };
}

function useRenderer({ size, transparent, inline, forwardedRef, rest }, options) {
    const renderMultipleValuesLabel = useMultipleValuesLabelRenderer({ size });

    return () => {
        const classes = mergeClasses(
            transparent && "transparent"
        );

        return (
            <Dropdown
                {...rest}
                options={options}
                selectOnBlur={false}
                selectOnNavigation={false}
                selection={!inline}
                inline={inline}
                size={size}
                renderLabel={renderMultipleValuesLabel}
                ref={forwardedRef}
                __dropdownClasses={classes}
                __semanticDropdown={MonkeyPatchSemanticDropdown}
            />
        );
    };
}

export function InnerSelect(props) {
    const { options, actions, size, transparent, inline, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/select");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenMultipleAndValuesIsNotAnArray(props);

    // A select doesn't support children.
    // eslint-disable-next-line react/destructuring-assignment
    delete props["children"];

    const renderOptions = useOptionsRenderer({ options, actions });
    const render = useRenderer({ size, transparent, inline, forwardedRef, rest }, renderOptions());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerSelect.propTypes = propTypes;
InnerSelect.defaultProps = defaultProps;

export const Select = forwardRef((props, ref) => (
    <InnerSelect { ...props } forwardedRef={ref} />
));

// Select.Divider, Select.Header, Select.Menu and Select.SearchInput are not supported.
[InnerSelect, Select].forEach(x => {
    x.Item = SelectItem;
});
