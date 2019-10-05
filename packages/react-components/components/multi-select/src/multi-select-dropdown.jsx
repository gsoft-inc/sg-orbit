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
    return <MonkeyPatchDropdown.Item text={item.text} value={item.value} selected={isSelected} data-testid="multi-select-dropdown-item" />;
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

    // Using a focus / unfocus flag was not the preferred way to prevent the dropdown from closing on blur when the new focused item was inside the dropdown.
    // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
    // with document.activeElement. This was working well in the browser.
    //
    // However, our interaction tests rely on jsdom and jsdom support for document.activementElementis reliable (in fact, it doesn't have the same behavior
    // as browsers).
    //
    // The fallback is to use this _hasFocus flag. The idea is that when the focusout event pop, we way for a tick (with a setTimeout) and if _hasFocus is false
    // after that tick, it means that the new focused element is not inside the dropdown and we can safely close the dropdown.
    //
    // Did I mention focusout instead of blur? We add to use a combination of focusin / focusout instead of focus / blur because focus and blur doesn't bubbles.
    // This means that when a child of the dropdown is focus / blur the parent is not notified.
    _hasFocus = false;

    componentDidMount() {
        const { open } = this.props;

        if (open) {
            this.bindEvents();
        }
    }

    componentDidUpdate(prevProps) {
        const { items, open } = this.props;

        if (open !== prevProps.open) {
            if (open) {
                this.bindEvents();
            } else {
                this.unbindEvents();
            }
        }

        if (prevProps.items !== items) {
            this.setKeyboardItem(null, null);
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
        this.cancelOnSearchDebounce();
    }

    handleDocumentKeyDown = event => {
        switch (event.keyCode) {
            case KEYS.esc:
                this.handleDocumentEscape(event);
                break;
            case KEYS.enter:
                this.handleDocumentEnter(event);
                break;
            case KEYS.up:
                this.handleDocumentUp(event);
                break;
            case KEYS.down:
                this.handleDocumentDown(event);
                break;
        }
    };

    handleDocumentEscape = event => {
        this.close(event);
    };

    handleDocumentEnter = event => {
        const { keyboardItem } = this.state;

        if (!isNil(keyboardItem)) {
            this.selectItem(event, keyboardItem);
        }
    };

    handleDocumentUp = () => {
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

    handleDocumentDown = () => {
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

    handleDropdownFocusIn = () => {
        this._hasFocus = true;
    };

    // Closing the dropdown on blur will:
    // - close on outside click
    // - close on blur
    handleDropdownFocusOut = event => {
        this._hasFocus = false;

        // TODO: I dont think I need this check, If I need it, it should be replaced be a check if it's open or not
        if (!this._triggerRef.current.isElement(event.target)) {
            // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
            setTimeout(() => {
                if (!this._hasFocus) {
                    this.close(event);
                }
            }, 0);
        }
    };

    handleTriggerOpen = event => {
        const { open } = this.props;

        if (!open) {
            this.open(event);
        }
    }

    handleTriggerClose = event => {
        const { open } = this.props;

        if (open) {
            this.close(event);
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

    open(event) {
        const { onOpen } = this.props;

        this.setKeyboardItem(null, null);

        onOpen(event, this.props);
    }

    close(event) {
        const { onClose } = this.props;

        setTimeout(() => {
            if (!isNil(this._triggerRef.current)) {
                this._triggerRef.current.focus();
            }
        }, 0);

        onClose(event, this.props);
    }

    bindEvents() {
        document.addEventListener("keydown", this.handleDocumentKeyDown, false);

        // TODO: is it right to bind those events when it's open? There might be a kind of race condition to make sure they are bind before the search
        // input is focused? Maybe that's why the autofocus was not working with the search-input ?
        this._dropdownRef.current.addEventListener("focusin", this.handleDropdownFocusIn);
        this._dropdownRef.current.addEventListener("focusout", this.handleDropdownFocusOut);
    }

    unbindEvents() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown, false);

        this._dropdownRef.current.removeEventListener("focusin", this.handleDropdownFocusIn);
        this._dropdownRef.current.removeEventListener("focusout", this.handleDropdownFocusOut);
    }

    setKeyboardItem(item, index) {
        this.setState({ keyboardItem: item, keyboardIndex: index });
    }

    selectItem(event, item) {
        const { items, onItemSelect, closeOnSelect } = this.props;

        if (closeOnSelect || items.length === 1) {
            this.close(event);
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
                    disabled={disabled}
                    // Otherwise the "listbox" div will be focus first instead of the trigger button.
                    tabIndex={-1}
                    upward={false}
                    floating
                    className={this.getClasses()}
                >
                    <If condition={open}>{this.renderMenu()}</If>
                </MonkeyPatchDropdown>
            </Ref>
        );
    }
}
