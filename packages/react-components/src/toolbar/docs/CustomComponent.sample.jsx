import { Radio, RadioGroup } from "@react-components/radio";
import { Toolbar, useToolbarProps } from "@react-components/toolbar";
import { omitProps } from "@react-components/shared";

function CustomComponent(props) {
    const [toolbarProps] = useToolbarProps();

    return (
        <input
            {...props}
            {...omitProps(toolbarProps, ["orientation"])}
            type="text"
        />
    );
}

export function CustomToolbar() {
    return (
        <Toolbar>
            <CustomComponent />
            <RadioGroup>
                <Radio value="mars">Mars</Radio>
                <Radio value="jupiter">Jupiter</Radio>
                <Radio value="pluton">Pluton</Radio>
            </RadioGroup>
        </Toolbar>
    );
}
