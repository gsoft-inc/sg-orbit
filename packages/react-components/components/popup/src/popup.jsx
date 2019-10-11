import { ArgumentError, AutoControlledPureComponent, DOMEventListener, KEYS, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { BOTTOM_LEFT, POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { FadeIn } from "./fade-in";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { cloneElement, createRef } from "react";
import { isNil } from "lodash";

function fadeInAnimationRenderer(open, renderContent) {
    return (
        <FadeIn active={open}>
            {renderContent()}
        </FadeIn>
    );
}

export class Popup extends AutoControlledPureComponent {
    static propTypes = {
        open: bool,
        defaultOpen: bool,
        trigger: node.isRequired,
        children: node.isRequired,
        position: oneOf(POSITIONS).isRequired,
        offsets: arrayOf(string),
        onVisibilityChange: func,
        onDocumentKeyDown: func,
        onFocus: func,
        onBlur: func,
        onOutsideClick: func,
        animationRenderer: func,
        closeOnBlur: bool,
        closeOnOutsideClick: bool,
        className: string
    };

    static defaultProps = {
        position: BOTTOM_LEFT,
        offsets: ["0px", "0px"],
        animationRenderer: fadeInAnimationRenderer,
        closeOnBlur: true,
        closeOnOutsideClick: false
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

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, Popup.autoControlledProps);
    }

    componentDidMount() {
        const { open } = this.state;

        if (open) {
            this.focusTrigger();
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
        const { onBlur } = this.props;
        const { open } = this.state;

        if (open) {
            event.persist();

            this._hasFocus = false;

            // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
            setTimeout(() => {
                if (!this._hasFocus) {
                    this.close(event);
                }
            }, 0);

            if (!isNil(onBlur)) {
                onBlur(event, this.props);
            }
        }
    };

    handleOutsideClick = event => {
        const { onOutsideClick } = this.props;

        if (!this._containerRef.current.contains(event.target)) {
            this.close(event);

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

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
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
            <div style={{ position: "absolute", zIndex: 10, ...this.getPositioningStyle() }}>
                {children}
            </div>
        );
    };

    render() {
        const { animationRenderer, closeOnBlur, closeOnOutsideClick } = this.props;
        const { open } = this.state;

        return (
            <>
                <div
                    // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                    // For more info: https://github.com/facebook/react/issues/6410
                    onFocus={this.handleFocus}
                    onBlur={closeOnBlur ? this.handleBlur : undefined}
                    className={this.getCssClasses()}
                    tabIndex="-1"
                    ref={this._containerRef}
                >
                    {this.renderTrigger()}
                    {animationRenderer(open, this.renderPopup, this.props)}
                </div>

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />

                    <If condition={closeOnOutsideClick}>
                        <DOMEventListener name="click" on={this.handleOutsideClick} />
                    </If>
                </If>
            </>
        );
    }
}
