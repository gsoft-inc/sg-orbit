import { CrossIcon } from "../../icons";
import { IconButton } from "../../button";
import { PureComponent } from "react";
import { SIZE, mergeClasses } from "../../shared";
import { Tag } from "../../tag";
import { arrayOf, func, oneOf, shape, string } from "prop-types";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["sm", "md", "lg"];

function defaultItemRenderer(item, { disabled, size, onRemove }) {
    return (
        <Tag
            variant="outline"
            size={size}
            button={!disabled ? <IconButton onClick={onRemove} aria-label="Clear value"><CrossIcon /></IconButton> : undefined}
            data-testid={`tags-picker-selected-item-${item.value}`}
        >
            {item.text}
        </Tag>
    );
}

class TagsPickerSelectedItem extends PureComponent {
    static propTypes = {
        item: shape(ITEM_SHAPE).isRequired,
        itemRenderer: func,
        onRemove: func.isRequired,
        size: oneOf([SIZE.sm, SIZE.md, SIZE.lg]),
        className: string
    };

    handleRemove = event => {
        const { item, onRemove } = this.props;

        onRemove(event, item);
    };

    render() {
        const { item, itemRenderer, disabled, size, className } = this.props;

        const classes = mergeClasses(
            "mr2 mb2",
            className
        );

        return (
            <div className={classes}>
                {itemRenderer(item, { disabled, size, onRemove: this.handleRemove })}
            </div>
        );
    }
}

export class TagsPickerSelectedItems extends PureComponent {
    static propTypes = {
        /**
         * Items to display.
         */
        items: arrayOf(shape(ITEM_SHAPE)),
        /**
         * Render an item.
         * @param {Item} item - Item to render.
         * @param {{ disabled: boolean, onRemove: function }} options - Rendering options.
         * @returns {ReactElement} - React element to render.
         */
        itemRenderer: func,
        /**
         * Called when an item is removed.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Item} item - Removed item.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onRemoveSelectedItem: func,
        /**
         * A selected item can have different sizes.
         */
        size: oneOf(SIZES)
    };

    static defaultProps ={
        itemRenderer: defaultItemRenderer
    }

    handleRemoveSelectedItem = (event, item) => {
        const { onRemoveSelectedItem } = this.props;

        onRemoveSelectedItem(event, item);
    };

    renderItems() {
        const { items, itemRenderer, disabled, size, className } = this.props;

        return items.map(x => {
            return <TagsPickerSelectedItem
                item={x}
                itemRenderer={itemRenderer}
                onRemove={this.handleRemoveSelectedItem}
                key={x.value}
                disabled={disabled}
                size={size}
                className={className}
            />;
        });
    }

    render() {
        const { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return <>{this.renderItems()}</>;
    }
}
