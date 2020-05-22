import { AutoControlledPureComponent, getAutoControlledStateFromProps, mergeClasses } from "../../shared";
import { TagsPickerClearButton } from "./tags-picker-clear-button";
import { TagsPickerDropdown } from "./tags-picker-dropdown";
import { TagsPickerDropdownMenu } from "./tags-picker-dropdown-menu";
import { TagsPickerDropdownSearchInput } from "./tags-picker-dropdown-search-input";
import { TagsPickerDropdownTrigger } from "./tags-picker-dropdown-trigger";
import { TagsPickerSelectedItems } from "./tags-picker-selected-items";
import { arrayOf, bool, element, func, object, oneOf, shape, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const GROUP_ERROR_MESSAGE = "TagsPicker - When at least one item has a \"group\" property, all items must have a \"group\" property.";

export function startsWithSearch(event, items, query) {
    return items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()));
}

function getSelectedItems(items, values) {
    // This is a mapping of the values to preserve the selection order of the items.
    return values.map(x => items.find(item => item.value === x)).filter(x => x);
}

function getAvailableItems(items, values) {
    // This is a filtering of the items to preserve the original order of the items.
    return items.filter(x => !values.includes(x.value));
}

function computeDerivedState(items, values) {
    return {
        selectedItems: getSelectedItems(items, values),
        availableItems: getAvailableItems(items, values),
        dropdownItems: getAvailableItems(items, values)
    };
}

export class TagsPicker extends AutoControlledPureComponent {
    static propTypes = {
        /**
         * All available items.
         */
        items: arrayOf(shape(ITEM_SHAPE)).isRequired,
        /**
         * A controlled array of selected values.
         */
        values: arrayOf(string),
        /**
         * The initial selected values.
         */
        defaultValues: arrayOf(string),
        /**
         * Called when a value is selected / removed.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string[]} values - Selected values.
         * @returns {void}
         */
        onValuesChange: func.isRequired,
        /**
         * Called when a search for an item happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Item[]} items - Available items.
         * @param {string} query - Search query.
         * @returns {Item[]} - Items to display.
         */
        onSearch: func,
        /**
         * Called when the dropdown open / close.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {boolean} isVisible - Indicate if the tag picker dropdown is visible.
         * @returns {void}
         */
        onVisibilityChange: func,
        /**
         * A React component to select an item.
         */
        dropdown: element,
        /**
         * Whether or not the dropdown should close when an item is selected.
         */
        closeOnSelect: bool,
        /**
         * The text of the trigger button to open the dropdown.
         */
        addText: string,
        /**
         * Message to display when there are no items matching the search input.
         */
        noResultsMessage: string,
        /**
         * The search input placeholder text.
         */
        placeholder: string,
        /**
         * A React component to display the selected values.
         */
        selectedItemsComponent: element,
        /**
         * A React component to clear the selected values.
         */
        clearButton: element,
        /**
         * A controlled open value that determined whether or not the dropdown is displayed.
         */
        open: bool,
        /**
         * The initial value of open.
         */
        defaultOpen: bool,
        /**
         * A disabled tag picker does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the dropdown should close when the tag picker loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the dropdown should close when a click happens outside the tag picker.
         * Requires `closeOnBlur` to be `false`.
         */
        closeOnOutsideClick: bool,
        /**
         * A remote search input can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * @ignore
         */
        active: bool,
        /**
         * @ignore
         */
        focus: bool,
        /**
         * @ignore
         */
        hover: bool,
        /**
         * @ignore
         */
        className: string,
        /**
         * @ignore
         */
        style: object,
        /**
         * Used by interaction tests.
         * @ignore
         */
        orbitId: string
    };

    static defaultProps = {
        dropdown: <TagsPickerDropdown />,
        onSearch: startsWithSearch,
        closeOnSelect: false,
        addText: "Add",
        noResultsMessage: "No results",
        placeholder: "Search",
        selectedItemsComponent: <TagsPickerSelectedItems />,
        clearButton: <TagsPickerClearButton />,
        disabled: false,
        size: DEFAULT_SIZE
    };

    static autoControlledProps = ["values", "open"];

    // Expose sub-components.
    static Dropdown = TagsPickerDropdown;
    static Trigger = TagsPickerDropdownTrigger;
    static Menu = TagsPickerDropdownMenu;
    static SearchInput = TagsPickerDropdownSearchInput;
    static SelectedItems = TagsPickerSelectedItems;
    static ClearButton = TagsPickerClearButton;

    state = {
        values: [],
        selectedItems: [],
        availableItems: [],
        dropdownItems: [],
        open: false
    };

    _isMount = false;

    componentDidMount() {
        this.validateGrouping();

        this._isMount = true;
    }

    componentDidUpdate(prevProps) {
        const { items } = this.props;

        if (prevProps.items !== items) {
            this.validateGrouping();
        }
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    static getDerivedStateFromProps(props, state) {
        const { items } = props;

        return getAutoControlledStateFromProps(props, state, TagsPicker.autoControlledProps, ({ values }) => computeDerivedState(items, values));
    }

    handleSearch = (event, query) => {
        const { onSearch } = this.props;
        const { availableItems } = this.state;

        const results = onSearch(event, availableItems, query);

        this.setState({ dropdownItems: results });
    };

    handleItemSelect = (event, item) => {
        const { values } = this.state;

        this.setValues(event, [...values, item.value]);
    };

    handleRemoveSelectedItem = (event, item) => {
        const { values } = this.state;

        this.setValues(event, values.filter(x => x !== item.value));
    };

    handleDropdownOpen = event => {
        this.open(event);
    };

    handleDropdownClose = event => {
        const { availableItems } = this.state;

        this.setState({ dropdownItems: availableItems });
        this.close(event);
    };

    handleClear = event => {
        const { items } = this.props;

        this.setValues(event, [], [], items, items);
    };

    open(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }

    close(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }

    setValues(event, newValues) {
        const { items, onValuesChange } = this.props;

        // Not proud of this hotfix. While running the Jest state a setState occurs once the component is unmounted. Can't find why.
        if (this._isMount) {
            this.trySetAutoControlledStateValue({ values: newValues }, () => computeDerivedState(items, newValues));
        }

        onValuesChange(event, newValues);
    }

    validateGrouping() {
        const { items } = this.props;

        let isGrouped = false;

        items.forEach((x, index) => {
            if (isGrouped) {
                if (isNil(x.group)) {
                    // Others have a group.
                    throw new Error(GROUP_ERROR_MESSAGE);
                }
            } else {
                if (!isNil(x.group)) {
                    if (index === 0) {
                        isGrouped = true;
                    } else {
                        // This item have a group but others dont.
                        throw new Error(GROUP_ERROR_MESSAGE);
                    }
                }
            }
        });
    }

    renderDropDown = () => {
        const { closeOnSelect, dropdown, placeholder, noResultsMessage, addText, disabled, closeOnBlur, closeOnOutsideClick, size, active, focus, hover } = this.props;
        const { dropdownItems, open } = this.state;

        return cloneElement(dropdown, {
            orbitId: this.props.orbitId,
            items: dropdownItems,
            onSearch: this.handleSearch,
            onItemSelect: this.handleItemSelect,
            onOpen: this.handleDropdownOpen,
            onClose: this.handleDropdownClose,
            closeOnSelect,
            placeholder,
            noResultsMessage,
            triggerText: addText,
            triggerSize: size,
            open,
            disabled,
            closeOnBlur,
            closeOnOutsideClick,
            active,
            focus,
            hover
        });
    };

    renderSelectedItems = () => {
        const { selectedItemsComponent, disabled, size } = this.props;
        const { selectedItems } = this.state;

        return cloneElement(selectedItemsComponent, {
            items: selectedItems,
            onRemoveSelectedItem: this.handleRemoveSelectedItem,
            disabled,
            size
        });
    };

    renderClearButton = () => {
        const { clearButton, disabled, size } = this.props;
        const { selectedItems } = this.state;

        if (selectedItems.length === 0 || disabled) {
            return null;
        }

        return <div className="mr2 mb2">
            {cloneElement(clearButton, {
                onClick: this.handleClear,
                size
            })}
        </div>;
    };

    render() {
        const { className, style } = this.props;

        const classes = mergeClasses(
            "flex flex-wrap outline-0",
            className
        );

        return (
            <div
                className={classes}
                style={style}
                tabIndex="-1"
            >
                {this.renderDropDown()}
                {this.renderSelectedItems()}
                {this.renderClearButton()}
            </div>
        );
    }
}
