import { Popup } from "@orbit-ui/react-components";
import { PureComponent } from "react";
import { RedBox } from "@stories/react-components/popup/components/red-box";

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
