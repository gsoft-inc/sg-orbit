import { DOMEventListener, KEYS, mergeClasses } from "../../shared";
import { MonkeyPatchDropdown } from "./monkey-patch-dropdown";
import { PureComponent, cloneElement, createRef } from "react";
import { Ref } from "semantic-ui-react";
import { TagsPickerDropdownMenu } from "./tags-picker-dropdown-menu";
import { TagsPickerDropdownSearchInput } from "./tags-picker-dropdown-search-input";
import { TagsPickerDropdownTrigger } from "./tags-picker-dropdown-trigger";
import { arrayOf, bool, element, func, number, oneOf, shape, string } from "prop-types";
import { debounce, isFunction, isNil } from "lodash";
import { isElement } from "react-is";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

export class TagsPickerDropdown extends PureComponent {
    static propTypes = {
        /**
         * Array of items.
         */
        items: arrayOf(shape(ITEM_SHAPE)),
        /**
         * Called when an item is selected.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Item} item - Selected item.
         * @returns {void}
         */
        onItemSelect: func,
        /**
         * Called when the search input change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} query - Search query.
         * @returns {void}
         */
        onSearch: func,
        /**
         * Called when an open event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onOpen: func,
        /**
         * Called when a close event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClose: func,
        /**
         * Whether or not the dropdown should close when an item is selected.
         */
        closeOnSelect: bool,
        /**
         * Delay before initiating a search when the query change.
         */
        debounceDelay: number,
        /**
         * Message to display when there are no items matching the query.
         */
        noResultsMessage: string,
        /**
         * A React component that open the dropdown.
         */
        trigger: element,
        /**
         * The trigger text.
         */
        triggerText: string,
        /**
         * A dropdown trigger can have different sizes.
         */
        triggerSize: oneOf(SIZES),
        /**
         * A React component to display the items.
         */
        menu: element,
        /**
         * [Text input](/?path=/docs/components-textinput--default-story) component to render.
         */
        searchInput: element,
        /**
         * The search input placeholder text.
         */
        placeholder: string,
        /**
         * A controlled open value that determined whether or not the dropdown is displayed.
         */
        open: bool,
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
        hover: bool
    };

    static defaultProps = {
        debounceDelay: 200,
        menu: <TagsPickerDropdownMenu />,
        trigger: <TagsPickerDropdownTrigger />,
        searchInput: <TagsPickerDropdownSearchInput />
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
    // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
    // as browsers).
    //
    // The fallback is to use this _hasFocus flag. The idea is that when the focusout event pop, we wait for a tick (with a setTimeout) and if _hasFocus is false
    // after that tick, it means that the new focused element is not inside the dropdown and we can safely close the dropdown.
    //
    // Did I mention focusout instead of blur? We add to use a combination of focusin / focusout instead of focus / blur because focus and blur doesn't bubbles.
    // This means that when a child of the dropdown is focus / blur the parent is not notified.
    _hasFocus = false;

    componentDidUpdate(prevProps) {
        const { items } = this.props;

        if (prevProps.items !== items) {
            this.setKeyboardItem(null, null);
        }
    }

    componentWillUnmount() {
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

        // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
        setTimeout(() => {
            if (!this._hasFocus) {
                this.close(event);
            }
        }, 0);
    };

    handleDocumentClick = event => {
        if (this._dropdownRef.current) {
            if (!this._dropdownRef.current.contains(event.target)) {
                this.close(event);
            }
        }
    };

    handleTriggerOpen = event => {
        this.open(event);
    }

    handleTriggerClose = event => {
        this.close(event);
    }

    handleSearchChange = (event, query) => {
        this.onSearch(event, query);
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

    open(event) {
        const { onOpen } = this.props;

        this.setKeyboardItem(null, null);

        onOpen(event);
    }

    close(event) {
        const { onClose } = this.props;

        setTimeout(() => {
            if (!isNil(this._triggerRef.current)) {
                this._triggerRef.current.focus();
            }
        }, 0);

        onClose(event);
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

            onItemSelect(event, selectedItem);
        }, 0);
    }

    renderTrigger = () => {
        const { trigger, triggerText, open, disabled, triggerSize, active, focus, hover } = this.props;

        return cloneElement(trigger, {
            onOpen: this.handleTriggerOpen,
            onClose: this.handleTriggerClose,
            text: triggerText,
            open,
            disabled,
            size: triggerSize,
            active,
            focus,
            hover,
            ref: this._triggerRef
        });
    };

    renderSearchInput = () => {
        const { searchInput, placeholder } = this.props;

        const props = {
            onChange: this.handleSearchChange,
            placeholder
        };

        if (isElement(searchInput)) {
            return cloneElement(searchInput, props);
        }

        return <TagsPickerDropdownSearchInput { ...props } { ...searchInput } />;
    };

    renderMenu = () => {
        const { menu, items, noResultsMessage } = this.props;
        const { keyboardItem } = this.state;

        return cloneElement(menu, {
            items: items,
            onItemClick: this.handleItemClick,
            searchInput: this.renderSearchInput(),
            noResultsMessage,
            keyboardItem
        });
    };

    render() {
        const { open, disabled, className } = this.props;

        const classes = mergeClasses(
            "no-icons",
            className
        );

        return (
            <>
                <Ref innerRef={this._dropdownRef}>
                    <MonkeyPatchDropdown
                        open={open}
                        trigger={this.renderTrigger()}
                        disabled={disabled}
                        // Otherwise the "listbox" div will be focus first instead of the trigger button.
                        tabIndex="-1"
                        upward={false}
                        floating
                        className={classes}
                    >
                        <If condition={open}>
                            {this.renderMenu()}
                        </If>
                    </MonkeyPatchDropdown>
                </Ref>

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />
                    <DOMEventListener name="click" on={this.handleDocumentClick} />
                    <DOMEventListener target={this._dropdownRef} name="focusin" on={this.handleDropdownFocusIn} />
                    <DOMEventListener target={this._dropdownRef} name="focusout" on={this.handleDropdownFocusOut} />
                </If>
            </>
        );
    }
}
