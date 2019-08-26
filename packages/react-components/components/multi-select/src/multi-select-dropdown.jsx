import { Dropdown, Ref } from "semantic-ui-react";
import { ITEM_SHAPE } from "./items";
import { KEYS } from "@orbit-ui/react-components-shared";
import { MultiSelectDropdownMenu } from "./multi-select-dropdown-menu";
import { MultiSelectDropdownSearchInput } from "./multi-select-dropdown-search-input";
import { MultiSelectDropdownTrigger } from "./multi-select-dropdown-trigger";
import { PureComponent, cloneElement, createRef } from "react";
import { arrayOf, bool, func, node, number, shape, string } from "prop-types";
import { debounce, isFunction, isNil } from "lodash";

export class MultiSelectDropdown extends PureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)),
        onItemSelect: func,
        onSearch: func,
        onOpen: func,
        onClose: func,
        itemRenderer: func,
        headerRenderer: func,
        closeOnSelect: bool,
        debounceDelay: number,
        noResultsMessage: string,
        trigger: node,
        triggerText: string,
        triggerIcon: node,
        menu: node,
        searchInput: node,
        searchIcon: node,
        placeholder: string,
        open: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        debounceDelay: 200,
        trigger: <MultiSelectDropdownTrigger />,
        menu: <MultiSelectDropdownMenu />,
        searchInput: <MultiSelectDropdownSearchInput />
    };

    state = {
        keyboardItem: null,
        keyboardIndex: null
    };

    _dropdownRef = createRef();

    componentDidUpdate(prevProps) {
        const { items } = this.props;

        if (prevProps.items !== items) {
            this.setKeyboardItem(null, null);
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
        this.cancelOnSearchDebounce();
    }

    handleDocumentClick = event => {
        if (this._dropdownRef.current) {
            if (!this._dropdownRef.current.contains(event.target)) {
                this.toggleVisibility(event);
            }
        }
    };

    handleKeyDown = event => {
        switch (event.keyCode) {
            case KEYS.esc:
                this.handleEscape(event);
                break;
            case KEYS.enter:
                this.handleEnter(event);
                break;
            case KEYS.up:
                this.handleUp(event);
                break;
            case KEYS.down:
                this.handleDown(event);
                break;
        }
    };

    handleEscape = event => {
        this.toggleVisibility(event);
    };

    handleEnter = event => {
        const { keyboardItem } = this.state;

        if (!isNil(keyboardItem)) {
            this.selectItem(event, keyboardItem);
        }
    };

    handleUp = () => {
        const { items } = this.props;
        const { keyboardIndex } = this.state;

        if (items.length > 0) {
            if (!isNil(keyboardIndex)) {
                if (keyboardIndex > 0) {
                    const newKeyboardIndex = keyboardIndex - 1;

                    this.setKeyboardItem(items[newKeyboardIndex], newKeyboardIndex);
                }
            }
        }
    };

    handleDown = () => {
        const { items } = this.props;
        const { keyboardIndex } = this.state;

        if (items.length > 0) {
            if (isNil(keyboardIndex)) {
                this.setKeyboardItem(items[0], 0);
            } else {
                if (keyboardIndex < items.length - 1) {
                    const newKeyboardIndex = keyboardIndex + 1;

                    this.setKeyboardItem(items[newKeyboardIndex], newKeyboardIndex);
                }
            }
        }
    };

    handleTriggerClick = event => {
        this.toggleVisibility(event);
    };

    handleSearchChange = (event, { value }) => {
        this.onSearch(event, value, this.props);
    };

    handleItemClick = (event, item) => {
        this.selectItem(event, item);
    };

    onSearch = this.props.debounceDelay !== 0 ? debounce(this.props.onSearch, this.props.debounceDelay) : this.props.onSearch;

    cancelOnSearchDebounce() {
        if (isFunction(this.onSearch.cancel)) {
            this.onSearch.cancel();
        }
    }

    toggleVisibility(event) {
        const { open } = this.props;

        if (open) {
            this.close(event);
        } else {
            this.open(event);
        }
    }

    open(event) {
        const { onOpen } = this.props;

        this.bindEvents();
        this.setKeyboardItem(null, null);

        onOpen(event, this.props);
    }

    close(event) {
        const { onClose } = this.props;

        this.unbindEvents();

        onClose(event, this.props);
    }

    bindEvents() {
        document.addEventListener("click", this.handleDocumentClick, false);
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    unbindEvents() {
        document.removeEventListener("click", this.handleDocumentClick, false);
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    setKeyboardItem(item, index) {
        this.setState({ keyboardItem: item, keyboardIndex: index });
    }

    selectItem(event, item) {
        const { items, onItemSelect, closeOnSelect } = this.props;

        if (closeOnSelect || items.length === 1) {
            this.toggleVisibility(event);
        }

        // Defering onItemSelect ensure that document click has already been handled and the dropdown is not closed because the item is not part of the menu anymore.
        setTimeout(() => {
            const selectedItem = items.find(x => x.value === item.value);

            onItemSelect(event, selectedItem, this.props);
        }, 0);
    }

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "no-icon";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderTrigger = () => {
        const { trigger, triggerText, triggerIcon } = this.props;

        return cloneElement(trigger, {
            onClick: this.handleTriggerClick,
            text: triggerText,
            icon: triggerIcon
        });
    };

    renderSearchInput = () => {
        const { searchInput, searchIcon, placeholder } = this.props;

        return cloneElement(searchInput, {
            key: "search-input",
            onChange: this.handleSearchChange,
            icon: searchIcon,
            placeholder
        });
    };

    renderMenu = () => {
        const { menu, items, itemRenderer, headerRenderer, noResultsMessage } = this.props;
        const { keyboardItem } = this.state;

        return cloneElement(menu, {
            items: items,
            onItemClick: this.handleItemClick,
            itemRenderer,
            headerRenderer,
            searchInput: this.renderSearchInput(),
            noResultsMessage,
            keyboardItem
        });
    };

    render() {
        const { disabled, open } = this.props;

        return (
            <Ref innerRef={this._dropdownRef}>
                <Dropdown
                    open={open}
                    trigger={this.renderTrigger()}
                    className={this.getClasses()}
                    disabled={disabled}
                    upward={false}
                    floating
                >
                    <If condition={open}>{this.renderMenu()}</If>
                </Dropdown>
            </Ref>
        );
    }
}
