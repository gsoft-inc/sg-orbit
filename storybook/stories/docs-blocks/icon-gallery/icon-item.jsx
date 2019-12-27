import { CONTEXT_SHAPE } from "./context";
import { Children, cloneElement } from "react";
import { any, shape, string } from "prop-types";
import css from "styled-jsx/css";

const styles = css` /* stylelint-disable-line */
    .item {
        flex-direction: column;
        flex: 0 1 calc(20% - 10px);
        margin: 0 10px 30px 0;
    }

    .name {
        padding-bottom: .75rem;
        text-align: center;
    }

    .variants {
        display: flex;
        justify-content: center;
    }
`;

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
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="variants sbdocs sbdocs-ig-variants">
                {variants.map(x => renderVariant(x, { ...context, name, renderingSize: maxRenderingSize }))}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    context: shape(CONTEXT_SHAPE),
    children: any.isRequired
};
