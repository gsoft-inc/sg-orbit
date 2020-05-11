import { MonkeyPatchDropdown } from "./monkey-patch-dropdown";
import { PureComponent } from "react";
import { Ref } from "semantic-ui-react";
import { arrayOf, func, node, shape, string } from "prop-types";
import { groupBy, isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
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
         * @returns {void}
         */
        onItemClick: func,
        /**
         * A React component to enter a search input.
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
         * @ignore
         */
        className: string
    };

    state = {
        itemWidth: "auto"
    };

    handleItemClick = (event, data) => {
        const { onItemClick } = this.props;

        onItemClick(event, { text: data.text, value: data.value });
    }

    setItemWidth = element => {
        if (!isNil(element)) {
            this.setState({ itemWidth: element.getBoundingClientRect().width });
        }
    };

    renderGroupedItems() {
        const { items } = this.props;

        const results = [];
        const groups = groupBy(items, x => x.group);

        Object.keys(groups).forEach(key => {
            const renderedHeader = (
                <Ref
                    innerRef={el => {
                        if (el) {
                            // Doing it this way because react doesn't support using !important in inline style: https://github.com/facebook/react/issues/1881.
                            el.style.setProperty("padding-left", "1.25rem", "important");
                        }
                    }}
                    key={key}
                >
                    <MonkeyPatchDropdown.Header
                        content={key}
                    />
                </Ref>
            );

            results.push(renderedHeader);

            groups[key].forEach(x => {
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
        const { keyboardItem } = this.props;
        const { itemWidth } = this.state;

        const isSelected = !isNil(keyboardItem) && item.value === keyboardItem.value;

        return (
            <Ref
                innerRef={el => {
                    if (el) {
                        // Doing it this way because react doesn't support using !important in inline style: https://github.com/facebook/react/issues/1881.
                        el.style.setProperty("padding-left", "1.25rem", "important");
                    }
                }}
                key={key}
            >
                <MonkeyPatchDropdown.Item
                    text={item.text}
                    value={item.value}
                    selected={isSelected}
                    onClick={this.handleItemClick}
                    style={{ minWidth: `${itemWidth}px` }}
                    data-testid="multi-select-dropdown-item"
                />
            </Ref>
        );
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

        return <div className="pl5 mt2 mb2" data-testid="multi-select-dropdown-menu-no-results">{noResultsMessage}</div>;
    }

    render() {
        const { searchInput, className } = this.props;

        return (
            <MonkeyPatchDropdown.Menu className={className}>
                {searchInput}
                <MonkeyPatchDropdown.Menu
                    scrolling
                    data-testid="multi-select-dropdown-menu-items"
                >
                    {this.renderResults()}
                </MonkeyPatchDropdown.Menu>
            </MonkeyPatchDropdown.Menu>
        );
    }
}
