import { KEYS } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { any, bool, func, string } from "prop-types";
import { isNil } from "lodash";

export class Popup extends PureComponent {
    static propTypes = {
        visible: bool.isRequired,
        onOutsideClick: func,
        onEscapeKeyDown: func,
        top: string,
        bottom: string,
        left: string,
        right: string,
        offsetX: string,
        offsetY: string,
        children: any.isRequired
    };

    _containerRef = createRef();

    componentDidUpdate(prevProps) {
        const { visible } = this.props;

        if (visible !== prevProps.visible) {
            if (visible) {
                this.bindEvents();
            } else {
                this.unbindEvents();
            }
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    handleOutsideClick = event => {
        const { onOutsideClick } = this.props;

        if (!this._containerRef.current.contains(event.target)) {
            if (!isNil(onOutsideClick)) {
                onOutsideClick(event, this.props);
            }
        }
    };

    handleKeyDown = event => {
        const { onEscapeKeyDown } = this.props;

        if (event.keyCode === KEYS.esc) {
            if (!isNil(onEscapeKeyDown)) {
                onEscapeKeyDown(event, this.props);
            }
        }
    };

    getPositioningStyle() {
        const { top, bottom, left, right, offsetX, offsetY } = this.props;

        const style = {};

        if (!isNil(top)) {
            style.top = top;
        }

        if (!isNil(bottom)) {
            style.bottom = bottom;
        }

        if (!isNil(left)) {
            style.left = left;
        }

        if (!isNil(right)) {
            style.right = right;
        }

        if (!isNil(offsetX) || !isNil(offsetY)) {
            const translates = [];

            if (!isNil(offsetX)) {
                translates.push(`translateX(${offsetX})`);
            }

            if (!isNil(offsetY)) {
                translates.push(`translateY(${offsetY})`);
            }

            style.transform = translates.join(" ");
        }

        return style;
    }

    bindEvents() {
        document.addEventListener("click", this.handleOutsideClick, false);
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    unbindEvents() {
        document.removeEventListener("click", this.handleOutsideClick, false);
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    render() {
        const { visible, children } = this.props;

        if (!visible) {
            return null;
        }

        return (
            <div style={{ position: "absolute", zIndex: 10, ...this.getPositioningStyle() }} ref={this._containerRef}>
                {children}
            </div>
        );
    }
}
