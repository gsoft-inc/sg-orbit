import { Dropdown } from "semantic-ui-react";
import { PureComponent, cloneElement } from "react";
import { arrayOf, func, node, shape, string } from "prop-types";
import { groupBy, isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

export class MultiSelectDropdownMenu extends PureComponent {
    static propTypes = {
        /**
         * Items to display.
         */
        items: arrayOf(shape(ITEM_SHAPE)),
        /**
         * Called on item click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {{ text: string, value: string }} data - Menu item data.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onItemClick: func,
        /**
         * Render an item.
         * @param {Item} item - Item to render.
         * @param {boolean} isSelected - Whether or not the item is selected.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - A React element.
         */
        itemRenderer: func,
        /**
         * Render an header (also called a category).
         * @param {string} text - Header text.
         * @param {Item[]} items - Items under the header.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - A React element.
         */
        headerRenderer: func,
        /**
         * A custom React component to enter a search input.
         */
        searchInput: node,
        /**
         * Message to display when there are no items matching the search input.
         */
        noResultsMessage: string,
        /**
         * A controlled item selected from the keyboard.
         */
        keyboardItem: shape(ITEM_SHAPE),
        /**
         * Additional classes.
         */
        className: string
    };

    state = {
        itemWidth: "auto"
    };

    handleItemClick = (event, data) => {
        const { onItemClick } = this.props;

        onItemClick(event, { text: data.text, value: data.value }, this.props);
    }

    setItemWidth = element => {
        if (!isNil(element)) {
            this.setState({ itemWidth: element.getBoundingClientRect().width });
        }
    };

    renderGroupedItems() {
        const { items, headerRenderer } = this.props;

        const results = [];
        const groups = groupBy(items, x => x.group);

        Object.keys(groups).forEach(key => {
            const group = groups[key];

            const renderedHeader = cloneElement(headerRenderer(key, group, this.props), {
                key: key
            });

            results.push(renderedHeader);

            group.forEach(x => {
                const renderedItem = this.renderItem(x, `${x.group}-${x.value}`);

                results.push(renderedItem);
            });
        });

        return results;
    }

    renderRegularItems() {
        const { items } = this.props;

        return items.map(x => this.renderItem(x, x.value));
    }

    renderItem(item, key) {
        const { itemRenderer, keyboardItem } = this.props;
        const { itemWidth } = this.state;

        const isSelected = !isNil(keyboardItem) && item.value === keyboardItem.value;

        return cloneElement(itemRenderer(item, isSelected, this.props), {
            key: key,
            style: { minWidth: `${itemWidth}px` },
            onClick: this.handleItemClick
        });
    }

    renderItemSizer() {
        return <div key="item-sizer" className="o-0 h-0 w-100" ref={this.setItemWidth} />;
    }

    renderResults() {
        const { items, noResultsMessage } = this.props;

        if (items.length > 0) {
            let results = [];

            const isGrouped = !isNil(items[0].group);

            if (isGrouped) {
                results = this.renderGroupedItems();
            } else {
                results = this.renderRegularItems();
            }

            results.push(this.renderItemSizer());

            return results;
        }

        return <div className="pl6 mb4" data-testid="multi-select-dropdown-menu-no-results">{noResultsMessage}</div>;
    }

    render() {
        const { searchInput, className } = this.props;

        return (
            <Dropdown.Menu className={className}>
                {searchInput}
                <Dropdown.Menu
                    scrolling
                    data-testid="multi-select-dropdown-menu-items"
                >
                    {this.renderResults()}
                </Dropdown.Menu>
            </Dropdown.Menu>
        );
    }
}
