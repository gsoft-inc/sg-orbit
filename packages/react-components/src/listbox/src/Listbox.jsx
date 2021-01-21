import "./Listbox.css";

import { ListboxBase } from "./ListboxBase";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useControllableState, useEventCallback } from "../../shared";
import { useCollection } from "../../collection";

const propTypes = {
    /**
     * A controlled array holding the currently selected key(s).
     */
    selectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {String | String[]} key - The selected key(s).
     * @returns {void}
     */
    onChange: func,
    /**
     * The type of selection that is allowed.
     */
    selectionMode: oneOf(["single", "multiple"]),
    /**
     * Whether or not the listbox should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Autofocus target to use when no value is selected.
     */
    autoFocusTarget: string,
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid: bool,
    /**
     * A label providing an accessible name to the listbox. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerListbox({
    selectedKey: controlledKey,
    defaultSelectedKey,
    selectionMode = "single",
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKey, setSelectedKey] = useControllableState(controlledKey, defaultSelectedKey, []);

    const nodes = useCollection(children);

    const handleChange = useEventCallback((event, newKey) => {
        setSelectedKey(newKey);
    });

    return (
        <ListboxBase
            {...mergeProps(
                rest,
                {
                    nodes,
                    selectedKey,
                    onChange: handleChange,
                    selectionMode,
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

InnerListbox.propTypes = propTypes;

export const Listbox = forwardRef((props, ref) => (
    <InnerListbox {...props} forwardedRef={ref} />
));

Listbox.displayName = "Listbox";
