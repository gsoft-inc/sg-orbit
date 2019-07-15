import { Popup } from "../../../src";
import { RedBox } from "../../components/red-box";
import React, { PureComponent } from "react";

export class ControlledRedBox extends PureComponent {
    state = {
        visible: false
    };

    handleButtonClick = () => {
        this.setState({ visible: true });
    };

    handleOutsideClick = () => {
        this.setState({ visible: false });
    };

    handleEscape = () => {
        this.setState({ visible: false });
    };

    render() {
        const { top, bottom, left, right } = this.props;
        const { visible } = this.state;

        return (
            <>
                <button onClick={this.handleButtonClick} type="button">Open</button>
                <Popup visible={visible} onOutsideClick={this.handleOutsideClick} onEscapeKeyDown={this.handleEscape} top={top} bottom={bottom} left={left} right={right}>
                    <RedBox />
                </Popup>
            </>
        );
    }
}
