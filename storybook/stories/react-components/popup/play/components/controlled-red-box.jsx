import { PureComponent } from "react";
import { RedBoxPopup } from "@stories/react-components/popup/components/red-box-popup";

export class ControlledRedBox extends PureComponent {
    state = {
        open: false
    };

    handleVisibilityChange = (event, visible) => {
        this.setState({ open: visible });
    };

    render() {
        const { position, offsets, className } = this.props;
        const { open } = this.state;

        return (
            <RedBoxPopup
                open={open}
                position={position}
                offsets={offsets}
                onVisibilityChange={this.handleVisibilityChange}
                className={className}
            />
        );
    }
}
