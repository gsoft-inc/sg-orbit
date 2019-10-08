import { Popup } from "@orbit-ui/react-popup/src";
import { PureComponent } from "react";
import { RedBox } from "@stories/react-components/popup/components/red-box";
import { RedBoxTrigger } from "./red-box-trigger";

export class ControlledRedBox extends PureComponent {
    state = {
        open: false
    };

    handleVisibilityChange = (event, open) => {
        this.setState({ open: open });
    }

    renderTrigger() {
        const { open } = this.state;

        return <RedBoxTrigger open={open} />;
    }

    render() {
        const { position, offsets, className } = this.props;
        const { open } = this.state;

        return (
            <Popup
                open={open}
                trigger={this.renderTrigger()}
                position={position}
                offsets={offsets}
                onVisibilityChange={this.handleVisibilityChange}
                className={className}
            >
                <RedBox />
            </Popup>
        );
    }
}
