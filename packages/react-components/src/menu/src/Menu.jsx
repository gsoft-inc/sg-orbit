import "./Menu.css";

import { Box } from "../../box";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { NodeType, useCollection } from "../../collection";
import { forwardRef } from "react";
import { mergeProps, useId } from "../../shared";

/*
TODO:
    - orientation
    - aria-label | aria-labelledby
*/

const propTypes = {

};

export function InnerMenu({
    id,
    onSelect,
    as = "ul",
    children,
    forwardedRef,
    ...rest
}) {
    const nodes = useCollection(children);

    const rootId = useId(id, id ? undefined : "o-ui-menu");

    const renderSection = (
        <div>Section</div>
    );

    const renderOption = ({
        key,
        elementType: ElementType = MenuItem,
        ref,
        content,
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-item-${key}`}
            key={key}
            ref={ref}
            item={{ key: key }}
        >
            {content}
        </ElementType>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: rootId,
                    className: "o-ui-menu",
                    role: "menu",
                    // tabIndex: "-1",
                    "aria-orientation": "vertical",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <MenuContext.Provider
                value={{
                    onSelect
                }}
            >
                {nodes.map(({ type, ...nodeProps }) =>
                    type === NodeType.section ? renderSection(nodeProps) : renderOption(nodeProps)
                )}
            </MenuContext.Provider>
        </Box>
    );
}

InnerMenu.propTypes = propTypes;

export const Menu = forwardRef((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

Menu.displayName = "Menu";
