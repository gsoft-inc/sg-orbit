import { DEFAULT_ITEMS } from "@stories/react-components/multi-select/shared";
import { MultiSelect } from "@orbit-ui/react-components";
import { PureComponent } from "react";
import { isNil } from "lodash";

export class ControlledMultiSelect extends PureComponent {
    static defaultProps = {
        open: false
    };

    state = {
        values: this.props.values,
        open: this.props.open
    };

    handleValuesChange = (event, values) => {
        const { onValuesChange } = this.props;

        this.setState({ values });
        onValuesChange(event, values);
    };

    handleVisibilityChange = (event, open) => {
        this.setState({ open });
    };

    render() {
        const { values, open } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>values:</span> {isNil(values) ? "null" : JSON.stringify(values, null, 4)}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <MultiSelect
                    items={DEFAULT_ITEMS}
                    values={values}
                    open={open}
                    onVisibilityChange={this.handleVisibilityChange}
                    onValuesChange={this.handleValuesChange}
                />
            </>
        );
    }
}
