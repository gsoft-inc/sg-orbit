import { Dropdown } from "semantic-ui-react";
import { ITEM_SHAPE } from "./items";
import { PureComponent, cloneElement } from "react";
import { arrayOf, func, node, shape, string } from "prop-types";
import { groupBy, isNil } from "lodash";

export class MultiSelectDropdownMenu extends PureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)),
        onItemClick: func,
        itemRenderer: func,
        headerRenderer: func,
        searchInput: node,
        noResultsMessage: string,
        keyboardItem: shape(ITEM_SHAPE),
        className: string
    };

    state = {
        itemWidth: "auto"
    };

    handleItemClick = (event, data) => {
        const { onItemClick } = this.props;

        onItemClick(event, data, this.props);
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
            <Dropdown.Menu className={className} data-testid="multi-select-dropdown-menu">
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
