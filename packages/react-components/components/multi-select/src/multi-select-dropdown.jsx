import { AddIcon } from "@orbit-ui/icons";
import { ITEM_SHAPE } from "./items";
import { KEYS } from "@orbit-ui/react-components-shared";
import { MagnifierIcon } from "@orbit-ui/icons";
import { MonkeyPatchDropdown } from "./monkey-patch-dropdown";
import { MultiSelectDropdownMenu } from "./multi-select-dropdown-menu";
import { MultiSelectDropdownSearchInput } from "./multi-select-dropdown-search-input";
import { MultiSelectDropdownTrigger } from "./multi-select-dropdown-trigger";
import { PureComponent, cloneElement, createRef } from "react";
import { Ref } from "semantic-ui-react";
import { arrayOf, bool, func, node, number, shape, string } from "prop-types";
import { debounce, isFunction, isNil } from "lodash";

function defaultItemRenderer(item, isSelected) {
    return <MonkeyPatchDropdown.Item text={item.text} value={item.value} selected={isSelected} />;
}

function defaultHeaderRenderer(group) {
    return <MonkeyPatchDropdown.Header content={group} />;
}

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
        triggerDisabledIcon: node,
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
        itemRenderer: defaultItemRenderer,
        headerRenderer: defaultHeaderRenderer,
        menu: <MultiSelectDropdownMenu />,
        trigger: <MultiSelectDropdownTrigger />,
        triggerIcon: <AddIcon className="w3 h3 fill-marine-700 ml2" />,
        triggerDisabledIcon: <AddIcon className="w3 h3 fill-marine-700 ml2" />,
        searchInput: <MultiSelectDropdownSearchInput />,
        searchIcon: <MagnifierIcon className="w4 h4 fill-marine-500" />
    };

    state = {
        keyboardItem: null,
        keyboardIndex: null
    };

    _triggerRef = createRef();
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

    handleTriggerOpen = event => {
        const { open } = this.props;

        if (!open) {
            this.toggleVisibility(event);
        }
    }

    handleTriggerClose = event => {
        const { open } = this.props;

        if (open) {
            this.toggleVisibility(event);
        }
    }

    handleSearchChange = (event, query) => {
        this.onSearch(event, query, this.props);
    };

    handleItemClick = (event, item) => {
        this.selectItem(event, item, this.props);
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

        setTimeout(() => {
            if (!isNil(this._triggerRef.current)) {
                this._triggerRef.current.focus();
            }
        }, 0);

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
        const { trigger, triggerText, triggerIcon, triggerDisabledIcon, open, disabled } = this.props;

        return cloneElement(trigger, {
            onOpen: this.handleTriggerOpen,
            onClose: this.handleTriggerClose,
            text: triggerText,
            icon: triggerIcon,
            disabledIcon: triggerDisabledIcon,
            open,
            disabled,
            ref: this._triggerRef
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
                <MonkeyPatchDropdown
                    open={open}
                    trigger={this.renderTrigger()}
                    className={this.getClasses()}
                    disabled={disabled}
                    upward={false}
                    floating
                >
                    <If condition={open}>{this.renderMenu()}</If>
                </MonkeyPatchDropdown>
            </Ref>
        );
    }
}
