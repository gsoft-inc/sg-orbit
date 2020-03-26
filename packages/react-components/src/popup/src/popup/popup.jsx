import { ArgumentError, AutoControlledPureComponent, DOMEventListener, KEYS, getAutoControlledStateFromProps, mergeClasses } from "../../../shared";
import { BOTTOM_LEFT, POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { FadeIn } from "./fade-in";
import { arrayOf, bool, func, node, object, oneOf, string } from "prop-types";
import { cloneElement, createRef } from "react";
import { isNil } from "lodash";

function fadeInAnimationRenderer(open, renderContent, styles) {
    return (
        <FadeIn active={open} styles={styles}>
            {renderContent()}
        </FadeIn>
    );
}

export class Popup extends AutoControlledPureComponent {
    static propTypes = {
        /**
         * A controlled open value that determined whether or not the popup is displayed.
         */
        open: bool,
        /**
         * The initial value of open.
         */
        defaultOpen: bool,
        /**
         * A React component to open the popup.
         */
        trigger: node.isRequired,
        /**
         * The content of the popup.
         */
        children: node.isRequired,
        /**
         * The position of the popup relative to the trigger.
         */
        position: oneOf(POSITIONS).isRequired,
        /**
         * An array containing an horizontal and vertical offsets for the popup position.
         * Ex: ["10px", "-10px"]
         */
        offsets: arrayOf(string),
        /**
         * z-index of the content.
         */
        zIndex: string,
        /**
         * Called when the popup open / close.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {boolean} isVisible - Indicate if the popup is visible.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onVisibilityChange: func,
        /**
         * Called on window.document keydown when the popup is opened.
         */
        onDocumentKeyDown: func,
        /**
         * Called on focus.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onFocus: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Called on click outside of the popup.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onOutsideClick: func,
        /**
         * Render the open / close animation.
         * @param {boolean} open - Whether or not the popup is open.
         * @param {function} renderContent - Render the content of the popup.
         * @param {Object} styles - Positioning styles.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - React element to render.
         */
        animationRenderer: func,
        /**
         * Whether or not the popup should close when the popup loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the popup should close when a click happens outside.
         * Requires `closeOnBlur` to be `false`.
         */
        closeOnOutsideClick: bool,
        /**
         * Whether or not the popup container take up the width of its parent.
         */
        fluid: bool,
        /**
         * Additional classes.
         */
        className: string,
        /**
         * Custom inline style.
         */
        style: object
    };

    static defaultProps = {
        position: BOTTOM_LEFT,
        offsets: ["0px", "0px"],
        zIndex: "998",
        animationRenderer: fadeInAnimationRenderer,
        closeOnBlur: true,
        closeOnOutsideClick: false,
        fluid: false
    };

    static autoControlledProps = ["open"];

    state = {
        open: false,
        triggerHeight: 0
    };

    // Using a focus / unfocus flag was not the preferred way to prevent the dropdown from closing on blur when the new focused item was inside the dropdown.
    // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
    // with document.activeElement. This was working well in the browser.
    //
    // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
    // as browsers).
    //
    // The fallback is to use this _hasFocus flag. The idea is that when the blur event pop, we wait for a tick (with a setTimeout) and if _hasFocus is false
    // after that tick, it means that the new focused element is not inside the dropdown and we can safely close the dropdown.
    _hasFocus = false;
    _triggerRef = createRef();
    _containerRef = createRef();
    _animateInitialOpening = !this.props.defaultOpen;

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, Popup.autoControlledProps);
    }

    componentDidMount() {
        const { open } = this.state;

        if (open) {
            this.focusTrigger();
            this._animateInitialOpening = false;
        }
    }

    componentDidUpdate(prevProps) {
        const { open, closeOnBlur, closeOnOutsideClick } = this.props;

        if (closeOnBlur && closeOnOutsideClick) {
            throw new ArgumentError("Popup - The \"closeOnBlur\" and \"closeOnOutsideClick\" props cannot be both \"true\".");
        }

        if (open !== prevProps.open) {
            if (!open) {
                this.focusTrigger();
            }
        }
    }

    handleDocumentKeyDown = event => {
        const { onDocumentKeyDown } = this.props;

        if (event.keyCode === KEYS.esc) {
            this.close(event);
        }

        if (!isNil(onDocumentKeyDown)) {
            onDocumentKeyDown(event, this.props);
        }
    };

    handleTriggerSizeChange = ({ height }) => {
        this.setState({ triggerHeight: height });
    };

    handleTriggerOpen = event => {
        const { open } = this.state;

        if (!open) {
            this.open(event);
        }
    };

    handleTriggerClose = event => {
        const { open } = this.state;

        if (open) {
            this.close(event);
        }
    };

    handleFocus = event => {
        const { onFocus } = this.props;

        this._hasFocus = true;

        if (!isNil(onFocus)) {
            onFocus(event, this.props);
        }
    };

    // Closing the dropdown on blur will:
    // - close on outside click
    // - close on blur
    handleBlur = event => {
        const { onBlur, closeOnBlur } = this.props;
        const { open } = this.state;

        this._hasFocus = false;

        if (open) {
            if (closeOnBlur) {
                event.persist();

                // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
                setTimeout(() => {
                    if (!this._hasFocus) {
                        this.close(event);
                    }
                }, 0);
            }
        }

        if (!isNil(onBlur)) {
            onBlur(event, this.props);
        }
    };

    handleOutsideClick = event => {
        const { onOutsideClick, closeOnOutsideClick } = this.props;

        if (!this._containerRef.current.contains(event.target)) {
            if (closeOnOutsideClick) {
                this.close(event);
            }

            if (!isNil(onOutsideClick)) {
                onOutsideClick(event, this.props);
            }
        }
    };

    getPositioningStyle() {
        const { position, offsets } = this.props;
        const { triggerHeight } = this.state;

        const style = {};
        const translates = [];

        if (isLeft(position)) {
            style.left = "0px";
            translates.push(`translateX(${offsets[0]})`);
        }
        else if (isRight(position)) {
            style.right = "0px";
            translates.push(`translateX(${offsets[0]})`);

        }
        else if (isCenter(position)) {
            style.left = "50%";
            translates.push(`translateX(calc(-50% + ${offsets[0]}))`);
        }

        if (isBottom(position)) {
            style.top = `${triggerHeight}px`;
            translates.push(`translateY(${offsets[1]})`);
        }
        else if (isTop(position)) {
            style.bottom = `${triggerHeight}px`;
            translates.push(`translateY(-${offsets[1].startsWith("-") ? offsets[1].substring(1) : offsets[1]})`);
        }

        if (translates.length !== 0) {
            style.transform = translates.join(" ");
        }

        return style;
    }

    getOpeningStyle() {
        const { zIndex } = this.props;

        return {
            position: "absolute",
            zIndex,
            ...this.getPositioningStyle()
        };
    }

    open(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true, this.props);
        }
    }

    close(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false, this.props);
        }

        this.focusTrigger();
    }

    focusTrigger() {
        setTimeout(() => {
            if (!isNil(this._triggerRef.current)) {
                this._triggerRef.current.focus();
            }
        }, 0);
    }

    renderTrigger() {
        const { trigger } = this.props;
        const { open } = this.state;

        return cloneElement(trigger, {
            open: open,
            onSizeChange: this.handleTriggerSizeChange,
            onOpen: this.handleTriggerOpen,
            onClose: this.handleTriggerClose,
            ref: this._triggerRef
        });
    }

    renderPopup = () => {
        const { children } = this.props;
        const { open } = this.state;

        if (!open) {
            return <></>;
        }

        return (
            <>
                {children}
            </>
        );
    };

    renderContent() {
        const { animationRenderer } = this.props;
        const { open } = this.state;

        if (this._animateInitialOpening) {
            return animationRenderer(open, this.renderPopup, this.getOpeningStyle(), this.props);
        } else {
            // Subsequent opening should be animated.
            this._animateInitialOpening = true;
        }

        return (
            <div style={{ ...this.getOpeningStyle() }}>
                {this.renderPopup()}
            </div>
        );
    }

    // This code aims to solve a bug where no blur event will happen when the focused element becomes disable and that element lose the focus.
    // More info at: https://allyjs.io/tutorials/mutating-active-element.html
    handleDocumentBlur = () => {
        setTimeout(() => {
            if (document.activeElement.nodeName === "BODY") {
                if (!isNil(this._containerRef.current)) {
                // Chrome, Edge
                    this._containerRef.current.focus();
                }
            } else {
                // Firefox dont switch focus to body, it keeps it on the disabled element and ont trigger a proper blur event when another element is focused.
                // That's an ugly hack to fix this.
                setTimeout(() => {
                    if (document.activeElement.disabled) {
                        if (!isNil(this._containerRef.current)) {
                            this._containerRef.current.focus();
                        }
                    }
                }, 100);
            }
        }, 0);
    }

    render() {
        const { fluid, className, style } = this.props;
        const { open } = this.state;

        const classes = mergeClasses(
            fluid ? "w-100" : "dib",
            "relative",
            className
        );

        return (
            <>
                <div
                    // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                    // For more info: https://github.com/facebook/react/issues/6410
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className={classes}
                    style={style}
                    tabIndex="-1"
                    ref={this._containerRef}
                >
                    {this.renderTrigger()}
                    {this.renderContent()}
                </div>

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />
                    <DOMEventListener name="click" on={this.handleOutsideClick} />
                    <DOMEventListener name="blur" on={this.handleDocumentBlur} capture />
                </If>
            </>
        );
    }
}
