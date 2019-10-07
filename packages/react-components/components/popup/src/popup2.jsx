import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { DOMEventListener, KEYS, useHandlerProxy } from "@orbit-ui/react-components-shared";
import { FadeIn } from "./fade-in";
import { POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { PopupTrigger } from "./popup-trigger";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { createRef } from "react";
import { isNil } from "lodash";

// // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
// // For more info: https://github.com/facebook/react/issues/6410
// onFocus={this.handleFocusIn}
// onBlur={this.handleFocusOut}

// TODO: Extract animation, or add property to control speed.
// TODO: Set focus to the trigger when the popup close.

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
        // eslint-disable-next-line react/no-unused-prop-types
        onMouseOver: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onMouseOut: func,
        className: string
    };

    static defaultProps = {
        offsets: ["0px", "0px"]
    };

    static autoControlledProps = ["open"];

    state = {
        open: false,
        triggerHeight: null
    };

    // TODO: Move to PopupTrigger and also move the triggerHeight thing.
    _triggerRef = createRef();
    _containerRef = createRef();
    _hasFocus = false;

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, Popup.autoControlledProps);
    }

    componentDidMount() {
        // TODO: Can I remove the setTimeout?
        setTimeout(() => {
            this.setState({ triggerHeight: this._triggerRef.current.getBoundingClientRect().height });
        }, 0);
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

    handleTriggerKeyDown = event => {
        console.log("******* handleTriggerKeyDown");

        const { open } = this.state;

        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            console.log("**** open ", open);

            if (!open) {
                this.open(event);
            }
        }
    };

    handleTriggerClick = event => {
        const { open } = this.state;

        if (!open) {
            this.open(event);
        } else {
            this.close(event);
        }
    };

    handleFocus = event => {
        console.log("********* handleFocus ", event.target);

        const { onFocus } = this.props;

        this._hasFocus = true;

        if (!isNil(onFocus)) {
            onFocus(event, this.props);
        }
    };

    // handleFocusIn = event => {
    //     console.log("********* handleFocusIn ", event.target);
    // }

    // handleFocusOut = event => {
    //     console.log("********* handleFocusOut ", event.target);
    // }

    // Closing the dropdown on blur will:
    // - close on outside click
    // - close on blur
    handleBlur = event => {
        const { onBlur } = this.props;
        const { open } = this.state;

        event.persist();

        if (open) {
            console.log("********* handleBlur ", event.target);

            this._hasFocus = false;

            // setTimeout(() => {
            //     if (!this._containerRef.current.contains(document.activeElement)) {
            //         console.log("********* handleBlur for real");
            //     }
            // }, 0);


            // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
            setTimeout(() => {
                if (!this._hasFocus) {
                    console.log("********* handleBlur for real");
                    this.close(event);
                }
            }, 0);

            if (!isNil(onBlur)) {
                onBlur(event, this.props);
            }
        }
    };

    handleMouseOver = useHandlerProxy(this, "onMouseOver");
    handleMouseOut = useHandlerProxy(this, "onMouseOut");

    getHorizontalPosition() {
        const { position, offsets } = this.props;

        if (isLeft(position)) {
            return { left: "0px", offsetX: offsets[0] };
        }
        else if (isRight(position)) {
            return { right: "0px", offsetX: offsets[0] };

        }
        else if (isCenter(position)) {
            return { left: "50%", offsetX: `calc(-50% + ${offsets[0]})` };
        }

        return {};
    }

    getVerticalPosition() {
        const { position, offsets } = this.props;
        const { triggerHeight } = this.state;

        if (isBottom(position)) {
            return { top: `${triggerHeight}px`, offsetY: offsets[1] };
        }
        else if (isTop(position)) {
            return { bottom: `${triggerHeight}px`, offsetY: `-${offsets[1].startsWith("-") ? offsets[1].substring(1) : offsets[1]}` };
        }

        return {};
    }

    getPositioningStyle() {
        const horizontalPositions = this.getHorizontalPosition();
        const verticalPositions = this.getVerticalPosition();

        return {
            ...horizontalPositions,
            ...verticalPositions
        };
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    open(event) {
        console.log("***** Popup open");

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
    }

    renderTrigger() {
        const { trigger } = this.props;

        return <PopupTrigger
            trigger={trigger}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeyDown}
            ref={this._triggerRef}
        />;
    }

    renderPopup() {
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
    }

    render() {
        const { open, triggerHeight } = this.state;

        return (
            <>
                <div
                    className={this.getCssClasses()}
                    // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                    // For more info: https://github.com/facebook/react/issues/6410
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    ref={this._containerRef}
                    tabIndex="-1"
                >
                    {this.renderTrigger()}
                    {/* TODO: use https://www.npmjs.com/package/resize-observer-polyfill */}
                    <If condition={!isNil(triggerHeight)}>
                        <FadeIn active={open}>
                            {this.renderPopup()}
                        </FadeIn>
                    </If>
                </div>

                {/* <DOMEventListener name="focusin" on={this.handleFocusIn} />
                <DOMEventListener name="focusout" on={this.handleFocusOut} /> */}

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />
                </If>
            </>
        );
    }
}
