import "./Menu.css";

import { Box } from "../../box";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
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

    const renderSection = ({
        key,
        elementType: ElementType = MenuSection,
        ref,
        props,
        items: sectionItems
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-section-${key}`}
            key={key}
            ref={ref}
        >
            {sectionItems.map(x => renderOption(x))}
        </ElementType>
    );

    const renderDivider = ({
        key,
        elementType: ElementType,
        ref,
        content,
        props
    }) => (
        <ElementType
            {...mergeProps(
                props,
                {
                    className: "o-ui-menu-divider"
                }
            )}
            key={key}
            ref={ref}
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
                {nodes.map(({ type, ...nodeProps }) => {
                    switch (type) {
                        case NodeType.item:
                            return renderOption(nodeProps);
                        case NodeType.section:
                            return renderSection(nodeProps);
                        case NodeType.divider:
                            return renderDivider(nodeProps);
                        default:
                            return null;
                    }
                })}
            </MenuContext.Provider>
        </Box>
    );
}

InnerMenu.propTypes = propTypes;

export const Menu = forwardRef((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

Menu.displayName = "Menu";
