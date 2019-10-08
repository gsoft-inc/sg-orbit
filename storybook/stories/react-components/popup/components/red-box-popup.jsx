import { Popup } from "@orbit-ui/react-popup/src";
import { PureComponent } from "react";
import { RedBox } from "./red-box";
import { RedBoxTrigger } from "./red-box-trigger";

export class RedBoxPopup extends PureComponent {
    render() {
        const { open, defaultOpen, position, offsets, onVisibilityChange, className } = this.props;

        return (
            <Popup
                open={open}
                defaultOpen={defaultOpen}
                trigger={<RedBoxTrigger />}
                position={position}
                offsets={offsets}
                onVisibilityChange={onVisibilityChange}
                className={className}
            >
                <RedBox />
            </Popup>
        );
    }
}
