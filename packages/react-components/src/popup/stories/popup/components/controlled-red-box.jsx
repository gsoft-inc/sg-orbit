import { PureComponent } from "react";
import { RedBoxPopup } from "./red-box-popup";

export class ControlledRedBox extends PureComponent {
    state = {
        open: false
    };

    handleVisibilityChange = (event, visible) => {
        this.setState({ open: visible });
    };

    render() {
        const { position, offsets, ...rest } = this.props;
        const { open } = this.state;

        return (
            <>
                <div className="mb1"><span className="fw6" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <RedBoxPopup
                    open={open}
                    position={position}
                    offsets={offsets}
                    onVisibilityChange={this.handleVisibilityChange}
                    {...rest}
                />
            </>
        );
    }
}
