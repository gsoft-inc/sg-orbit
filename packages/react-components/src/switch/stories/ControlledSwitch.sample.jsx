import { Switch } from "@react-components/switch";
import { useState } from "react";

export function ControlledSwitch() {
    const [isChecked, setIsChecked] = useState(false);

    console.log(isChecked);

    return (
        <Switch
            checked={isChecked}
            onChange={() => { setIsChecked(x => !x); }}
        >
            {isChecked ? "On" : "Off"}
        </Switch>
    );
}
