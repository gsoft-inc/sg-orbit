import "./Menu.css";

import { Box } from "../../box";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { NodeType, useCollection } from "../../collection";
import { cssModule, mergeProps, useEventCallback, useId } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {

};

export function InnerMenu({
    id,
    onSelect,
    fluid,
    as = "ul",
    children,
    forwardedRef,
    ...rest
}) {
    const nodes = useCollection(children);
    const items = nodes.filter(x => x.type === NodeType.item);

    const handleSelect = useEventCallback(event => {
        if (!isNil(onSelect)) {
            onSelect(event);
        }
    });

    const rootId = useId(id, id ? undefined : "o-ui-menu");

    const renderOption = ({
        key,
        index,
        elementType: ElementType = MenuItem,
        ref,
        content,
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-item-${index}`}
            key={key}
            ref={ref}
            item={{ key: key }}
        >
            {content}
        </ElementType>
    );

    const renderSection = ({
        key,
        index,
        elementType: ElementType = MenuSection,
        ref,
        props,
        items: sectionItems
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-section-${index}`}
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
                    className: "o-ui-menu-divider",
                    as: "li"
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
                    className: cssModule(
                        "o-ui-menu",
                        fluid && "fluid"
                    ),
                    role: "menu",
                    "aria-orientation": "vertical",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <MenuContext.Provider
                value={{
                    onSelect: handleSelect
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
