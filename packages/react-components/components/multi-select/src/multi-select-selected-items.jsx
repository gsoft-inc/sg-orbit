import { ITEM_SHAPE } from "./items";
import { PureComponent } from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";
import { isNil } from "lodash";

class MultiSelectSelectedItem extends PureComponent {
    static propTypes = {
        item: shape(ITEM_SHAPE).isRequired,
        selectedItemRenderer: func.isRequired,
        onRemove: func.isRequired,
        disabled: bool,
        className: string
    };

    handleRemove = event => {
        const { item, onRemove } = this.props;

        onRemove(event, item);
    };

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "mr2 mb2";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { item, selectedItemRenderer, disabled } = this.props;

        return <div className={this.getClasses()}>{selectedItemRenderer(item, { disabled: disabled, onRemove: this.handleRemove })}</div>;
    }
}

export class MultiSelectSelectedItems extends PureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)),
        selectedItemRenderer: func,
        onRemoveSelectedItem: func,
        disabled: bool,
        className: string
    };

    handleRemoveSelectedItem = (event, item) => {
        const { onRemoveSelectedItem } = this.props;

        onRemoveSelectedItem(event, item);
    };

    renderItems() {
        const { items, selectedItemRenderer, disabled, className } = this.props;

        return items.map(x => {
            // prettier-ignore
            return <MultiSelectSelectedItem
                item={x}
                selectedItemRenderer={selectedItemRenderer}
                onRemove={this.handleRemoveSelectedItem}
                key={x.value}
                disabled={disabled}
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
