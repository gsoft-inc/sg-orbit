import { AutoControlledPopper } from "@react-components/popper";
import { Button } from "@react-components/button";
import { useState } from "react";

export function ControlledPopper() {
    const [isVisible, setIsVisible] = useState(false);

    const labelStyle = {
        width: "80px"
    };

    return (
        <>
            <div className="mb6">
                <span className="dib fw6" style={labelStyle}>visible:</span> {isVisible ? "true" : "false"}
            </div>
            <AutoControlledPopper
                show={isVisible}
                onVisibilityChange={() => { setIsVisible(x => !x); }}
            >
                <AutoControlledPopper.Trigger as={Button}>
                    Toggle
                </AutoControlledPopper.Trigger>
                <AutoControlledPopper.Popper>
                    <div className="bg-primary-300 white pa2">A comet is an icy, small Solar System body.</div>
                </AutoControlledPopper.Popper>
            </AutoControlledPopper>
        </>
    );
}
