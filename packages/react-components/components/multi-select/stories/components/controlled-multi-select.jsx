import { ITEM_SHAPE, MultiSelect } from "@orbit-ui/react-multi-select/src";
import { PureComponent } from "react";
import { arrayOf, bool, shape, string } from "prop-types";
import { isNil } from "lodash";

export class ControlledMultiSelect extends PureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)).isRequired,
        values: arrayOf(string),
        open: bool
    };

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
        const { items } = this.props;
        const { values, open } = this.state;

        return (
            <>
                <div className="mb1"><span className="fw6" style={{ width: "80px", display: "inline-block" }}>values:</span> {isNil(values) ? "null" : JSON.stringify(values, null, 4)}</div>
                <div className="mb1"><span className="fw6" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <MultiSelect
                    items={items}
                    values={values}
                    open={open}
                    onVisibilityChange={this.handleVisibilityChange}
                    onValuesChange={this.handleValuesChange}
                />
            </>
        );
    }
}
