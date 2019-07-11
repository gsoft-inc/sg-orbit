import { DEFAULT_ITEMS } from "../../shared";
import { MultiSelect } from "../../../src";
import { isNil } from "lodash";
import React, { PureComponent } from "react";

export class ControlledMultiSelect extends PureComponent {
    state = {
        values: this.props.values,
    };

    handleValuesChange = (event, values) => {
        const { onValuesChange } = this.props;

        this.setState({ values });
        onValuesChange(event, values);
    };

    render() {
        const { values } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>values:</span> {isNil(values) ? "null" : JSON.stringify(values, null, 4)}</div>
                <br /><br />
                <MultiSelect
                    items={DEFAULT_ITEMS}
                    values={values}
                    onValuesChange={this.handleValuesChange}
                />
            </>
        )
    }
}
