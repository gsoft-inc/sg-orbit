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
                onOutsideClick(event);
            }
        }
    };

    handleKeyDown = event => {
        const { onEscapeKeyDown } = this.props;

        if (event.keyCode === KEYS.esc) {
            if (!isNil(onEscapeKeyDown)) {
                onEscapeKeyDown(event);
            }
        }
    };

    getPositioningStyle() {
        const { top, bottom, left, right } = this.props;

        const positions = {};

        if (!isNil(top)) {
            positions.top = top;
        }

        if (!isNil(bottom)) {
            positions.bottom = bottom;
        }

        if (!isNil(left)) {
            positions.left = left;
        }

        if (!isNil(right)) {
            positions.right = right;
        }

        return positions;
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
