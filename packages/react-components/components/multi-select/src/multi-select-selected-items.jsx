import { Button } from "@orbit-ui/react-button";
import { CloseIcon24 } from "@orbit-ui/icons";
import { Label } from "@orbit-ui/react-label";
import { PureComponent } from "react";
import { SIZES } from "./sizes";
import { arrayOf, bool, func, oneOf, shape, string } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";
import cx from "classnames";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

function defaultItemRenderer(item, { disabled, size, onRemove }) {
    return (
        <Label
            basic
            size={size}
            className={cx({ icon: !disabled })}
            disabled={disabled}
            data-testid={`multi-select-selected-item-${item.value}`}
        >
            {item.text}
            <If condition={!disabled}>
                <Button
                    circular
                    ghost
                    secondary
                    icon
                    size="tiny"
                    onClick={onRemove}
                    type="button"
                >
                    <CloseIcon24 />
                </Button>
            </If>
        </Label>
    );
}

class MultiSelectSelectedItem extends PureComponent {
    static propTypes = {
        item: shape(ITEM_SHAPE).isRequired,
        itemRenderer: func,
        onRemove: func.isRequired,
        disabled: bool,
        size: oneOf(SIZES),
        className: string
    };

    handleRemove = event => {
        const { item, onRemove } = this.props;

        onRemove(event, item, this.props);
    };

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "mr2 mb2",
            className
        );
    }

    render() {
        const { item, itemRenderer, disabled, size } = this.props;

        return <div className={this.getClasses()}>{itemRenderer(item, { disabled, size, onRemove: this.handleRemove })}</div>;
    }
}

export class MultiSelectSelectedItems extends PureComponent {
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
         * A disabled selected items does not allow user interaction.
         */
        disabled: bool,
        /**
         * A selected item can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps ={
        itemRenderer: defaultItemRenderer
    }

    handleRemoveSelectedItem = (event, item) => {
        const { onRemoveSelectedItem } = this.props;

        onRemoveSelectedItem(event, item, this.props);
    };

    renderItems() {
        const { items, itemRenderer, disabled, size, className } = this.props;

        return items.map(x => {
            return <MultiSelectSelectedItem
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
