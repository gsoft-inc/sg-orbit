import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";
import { any, elementType, func, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses } from "../../shared";
import { forwardRef } from "react";
import { useCollection } from "./useCollection";

/*
QUESTIONS:
- does it support wrapping?
- does it support if children is a rendering function or any other complex rendering?

TODO:
- renderer (like in partial nodes aka Tab component)
- test if this useMemo is really usefull? First guest is that children will always be change: }, [builder, props.children, props.items, context, ...invalidators]);
- test performance (re-rendering on mount, on update, etc..)
*/

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

function renderItem({ key, props, ref }, ElementType) {
    return (
        <ElementType
            {...props}
            key={key}
            ref={ref}
        />
    );
}

export function InnerTabs({
    as: ElementType = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const collection = [...useCollection(children)];

    const tabs = collection.filter(x => x.type === "tab");
    const panels = collection.filter(x => x.type === "panel");

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tabs"
                ),
                className
            )}
            ref={forwardedRef}
        >
            <TabList>{tabs.map(x => renderItem(x, Tab))}</TabList>
            <div>
                {panels.map(x => renderItem(x, TabPanel))}
            </div>
        </ElementType>
    );
}

InnerTabs.propTypes = propTypes;

export const Tabs = forwardRef((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));


