import styles from "./icon-item.module.css";

import { CONTEXT_SHAPE } from "./context";
import { Children, cloneElement } from "react";
import { any, shape, string } from "prop-types";

// styled-jsx

function renderVariant(variant, context) {
    return cloneElement(variant, {
        context
    });
}

export function IconItem({ name, context, children }) {
    const { getDisplayName, inferIconSize } = context;

    const displayName = getDisplayName({ itemName: name });
    const variants = Children.toArray(children);
    const maxRenderingSize = inferIconSize ? Math.max(...variants.map(x => x.props.size)) : null;

    return (
        <div className={`${styles.item} sbdocs sbdocs-ig-item`}>
            <div className={`${styles.name} sbdocs sbdocs-ig-name`}>{displayName}</div>
            <div className={`${styles.variants} sbdocs sbdocs-ig-variants`}>
                {variants.map(x => renderVariant(x, { ...context, name, renderingSize: maxRenderingSize }))}
            </div>
        </div>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    context: shape(CONTEXT_SHAPE),
    children: any.isRequired
};
