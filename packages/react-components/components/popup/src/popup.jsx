import { KEYS } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { any, bool, func, string } from "prop-types";
import { createPortal } from "react-dom";
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
        portal: bool,
        children: any.isRequired
    };

    static defaultProps = {
        portal: false
    };

    _containerRef = createRef();

    componentDidMount() {
        const { visible } = this.props;

        if (visible) {
            this.bindEvents();
        }
    }

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
        const { visible, onOutsideClick } = this.props;

        if (visible) {
            if (!this._containerRef.current.contains(event.target)) {
                if (!isNil(onOutsideClick)) {
                    onOutsideClick(event, this.props);
                }
            }
        }
    };

    handleKeyDown = event => {
        const { visible, onEscapeKeyDown } = this.props;

        if (visible) {
            if (event.keyCode === KEYS.esc) {
                if (!isNil(onEscapeKeyDown)) {
                    onEscapeKeyDown(event, this.props);
                }
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
        const { visible, portal, children } = this.props;

        if (!visible) {
            return null;
        }

        const component = (
            <div style={{ position: "absolute", zIndex: 10, display: visible ? "block" : "none", ...this.getPositioningStyle() }} ref={this._containerRef}>
                {children}
            </div>
        );

        if (portal) {
            return createPortal(component, document.body);
        }

        return component;
    }
}
