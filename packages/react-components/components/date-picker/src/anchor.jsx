import { BOTTOM_LEFT, POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { FadeIn } from "./fade-in";
import { Popup } from "@orbit-ui/react-popup";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, number, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

export class Anchor extends PureComponent {
    static propTypes = {
        input: node.isRequired,
        inputHeight: number.isRequired,
        calendar: node.isRequired,
        open: bool.isRequired,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        onOutsideClick: func.isRequired,
        onEscapeKeyDown: func.isRequired,
        disabled: bool.isRequired
    };

    static defaultProps = {
        position: BOTTOM_LEFT,
        offsets: ["0px", "10px"]
    };

    handleOutsideClick = useHandlerProxy(this, "onOutsideClick");
    handleEscapeKeyDown = useHandlerProxy(this, "onEscapeKeyDown");

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
        const { position, offsets, inputHeight } = this.props;

        if (isBottom(position)) {
            return { top: "0px", offsetY: offsets[1] };
        }
        else if (isTop(position)) {
            return { bottom: `-${inputHeight}px`, offsetY: `-${offsets[1]}` };
        }

        return {};
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { input, calendar, open, disabled } = this.props;

        return (
            <div className={this.getCssClasses()}>
                {input}
                <If condition={!disabled}>
                    <FadeIn active={open} className="relative z-2">
                        <Popup
                            visible={open}
                            onOutsideClick={this.handleOutsideClick}
                            onEscapeKeyDown={this.handleEscapeKeyDown}
                            {...this.getHorizontalPosition()}
                            {...this.getVerticalPosition()}
                        >
                            {calendar}
                        </Popup>
                    </FadeIn>
                </If>
            </div>
        );
    }
}
