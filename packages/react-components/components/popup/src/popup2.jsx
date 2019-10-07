import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { DOMEventListener, KEYS } from "@orbit-ui/react-components-shared";
import { FadeIn } from "./fade-in";
import { POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";

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

    _hasFocus = false;

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, Popup.autoControlledProps);
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

    handleTriggerBoundingClientRectChange = ({ height }) => {
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
                    console.log("handleBlur");
                    this.close(event);
                }
            }, 0);

            if (!isNil(onBlur)) {
                onBlur(event, this.props);
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

    // getVerticalPosition() {
    //     const { position, offsets } = this.props;
    //     const { triggerHeight } = this.state;

    //     console.log(offsets);



    //     return {};
    // }

    // getPositioningStyle() {
    //     const horizontalPositions = this.getHorizontalPosition();
    //     const verticalPositions = this.getVerticalPosition();

    //     return {
    //         ...horizontalPositions,
    //         ...verticalPositions
    //     };
    // }

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
    }

    renderTrigger() {
        const { trigger } = this.props;

        return cloneElement(trigger, {
            onBoundingClientRectChange: this.handleTriggerBoundingClientRectChange,
            onOpen: this.handleTriggerOpen,
            onClose: this.handleTriggerClose
        });
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
                    // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                    // For more info: https://github.com/facebook/react/issues/6410
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className={this.getCssClasses()}
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

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />
                </If>
            </>
        );
    }
}
