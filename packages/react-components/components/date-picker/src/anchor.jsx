import { FadeIn } from "./fade-in";
import { POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
import { Popup } from "@orbit-ui/react-popup";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

export class Anchor extends PureComponent {
    static propTypes = {
        children: node.isRequired,
        open: bool.isRequired,
        position: oneOf(POSITIONS).isRequired,
        offsets: arrayOf(string).isRequired,
        onOutsideClick: func.isRequired,
        onEscapeKeyDown: func.isRequired
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
        const { position, offsets } = this.props;

        if (isBottom(position)) {
            return { top: "0px", offsetY: offsets[1] };
        }
        else if (isTop(position)) {
            return { bottom: "0px", offsetY: offsets[1] };
        }

        return {};
    }

    render() {
        const { children, open } = this.props;

        return (
            <FadeIn active={open} className="relative z-2">
                <Popup
                    visible={open}
                    onOutsideClick={this.handleOutsideClick}
                    onEscapeKeyDown={this.handleEscapeKeyDown}
                    {...this.getHorizontalPosition()}
                    {...this.getVerticalPosition()}
                >
                    {children}
                </Popup>
            </FadeIn>
        );
    }
}
