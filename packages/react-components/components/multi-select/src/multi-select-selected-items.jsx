import { ITEM_SHAPE } from "./items";
import { PureComponent } from "react";
import { arrayOf, bool, func, shape } from "prop-types";

class MultiSelectSelectedItem extends PureComponent {
    static propTypes = {
        item: shape(ITEM_SHAPE).isRequired,
        selectedItemRenderer: func.isRequired,
        onRemove: func.isRequired,
        disabled: bool
    };

    handleRemove = event => {
        const { item, onRemove } = this.props;

        onRemove(event, item);
    };

    render() {
        const { item, selectedItemRenderer, disabled } = this.props;

        return <div className="mr2 mb2">{selectedItemRenderer(item, { disabled: disabled, onRemove: this.handleRemove })}</div>;
    }
}

export class MultiSelectSelectedItems extends PureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)),
        selectedItemRenderer: func,
        onRemoveSelectedItem: func,
        disabled: bool
    };

    handleRemoveSelectedItem = (event, item) => {
        const { onRemoveSelectedItem } = this.props;

        onRemoveSelectedItem(event, item);
    };

    renderItems() {
        const { items, selectedItemRenderer, disabled } = this.props;

        return items.map(x => {
            // prettier-ignore
            return <MultiSelectSelectedItem
                item={x}
                selectedItemRenderer={selectedItemRenderer}
                onRemove={this.handleRemoveSelectedItem}
                key={x.value}
                disabled={disabled}
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
