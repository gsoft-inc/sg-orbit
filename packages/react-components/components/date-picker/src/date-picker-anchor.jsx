import { BOTTOM_LEFT, POSITIONS, Popup } from "@orbit-ui/react-popup";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: node.isRequired,
        calendar: node.isRequired,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        onVisibilityChange: func
    };

    static defaultProps = {
        position: BOTTOM_LEFT,
        offsets: ["0px", "10px"]
    };

    render() {
        const { open, input, calendar, position, offsets, onVisibilityChange, className } = this.props;

        return (
            <Popup
                open={open}
                trigger={input}
                position={position}
                offsets={offsets}
                onVisibilityChange={onVisibilityChange}
                className={className}
            >
                {calendar}
            </Popup>
        );
    }
}


// import { BOTTOM_LEFT, POSITIONS, isBottom, isCenter, isLeft, isRight, isTop } from "./positions";
// import { FadeIn } from "./fade-in";
// import { Popup } from "@orbit-ui/react-popup";
// import { PureComponent } from "react";
// import { arrayOf, bool, func, node, number, oneOf, string } from "prop-types";
// import { isNil } from "lodash";
// import { useHandlerProxy } from "@orbit-ui/react-components-shared";

// export class DatePickerAnchor extends PureComponent {
//     static propTypes = {
//         input: node.isRequired,
//         inputHeight: number,
//         calendar: node.isRequired,
//         open: bool.isRequired,
//         position: oneOf(POSITIONS),
//         offsets: arrayOf(string),
//         onOutsideClick: func.isRequired,
//         onEscapeKeyDown: func.isRequired,
//         disabled: bool.isRequired
//     };

//     static defaultProps = {
//         position: BOTTOM_LEFT,
//         offsets: ["0px", "10px"]
//     };

//     handleOutsideClick = useHandlerProxy(this, "onOutsideClick");
//     handleEscapeKeyDown = useHandlerProxy(this, "onEscapeKeyDown");

//     getHorizontalPosition() {
//         const { position, offsets } = this.props;

//         if (isLeft(position)) {
//             return { left: "0px", offsetX: offsets[0] };
//         }
//         else if (isRight(position)) {
//             return { right: "0px", offsetX: offsets[0] };

//         }
//         else if (isCenter(position)) {
//             return { left: "50%", offsetX: `calc(-50% + ${offsets[0]})` };
//         }

//         return {};
//     }

//     getVerticalPosition() {
//         const { position, offsets, inputHeight } = this.props;

//         if (isBottom(position)) {
//             return { top: `${inputHeight}px`, offsetY: offsets[1] };
//         }
//         else if (isTop(position)) {
//             return { bottom: `${inputHeight}px`, offsetY: `-${offsets[1].startsWith("-") ? offsets[1].substring(1) : offsets[1]}` };
//         }

//         return {};
//     }

//     getCssClasses() {
//         const { className } = this.props;

//         const defaultClasses = "relative";

//         return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
//     }

//     renderPopup() {
//         const { calendar, open } = this.props;

//         return (
//             <Popup
//                 visible={open}
//                 onOutsideClick={this.handleOutsideClick}
//                 onEscapeKeyDown={this.handleEscapeKeyDown}
//                 {...this.getHorizontalPosition()}
//                 {...this.getVerticalPosition()}
//             >
//                 {calendar}
//             </Popup>
//         );
//     }

//     render() {
//         const { input, inputHeight, open, disabled } = this.props;

//         return (
//             // THIS IS THE FOCUSABLE ELEMENT
//             <div className={this.getCssClasses()}>
//                 {input}
//                 <If condition={!isNil(inputHeight) && !disabled}>
//                     <FadeIn active={open}>
//                         {this.renderPopup()}
//                     </FadeIn>
//                 </If>
//             </div>
//         );
//     }
// }
