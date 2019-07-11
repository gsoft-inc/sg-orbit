import { DEFAULT_ITEMS } from "../../shared";
import { MultiSelect } from "../../../src";
import { isNil } from "lodash";
import React, { PureComponent } from "react";

export class ControlledMultiSelect extends PureComponent {
    static defaultProps = {
        opened: false
    };

    state = {
        values: this.props.values,
        opened: this.props.opened
    };

    handleValuesChange = (event, values) => {
        const { onValuesChange } = this.props;

        this.setState({ values });
        onValuesChange(event, values);
    };

    handleOpen = () => {
        this.setState({ opened: true });
    };

    handleClose = () => {
        this.setState({ opened: false });
    };

    render() {
        const { values, opened } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>values:</span> {isNil(values) ? "null" : JSON.stringify(values, null, 4)}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>opened:</span> {opened ? "true" : "false"}</div>
                <br /><br />
                <MultiSelect
                    items={DEFAULT_ITEMS}
                    values={values}
                    opened={opened}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    onValuesChange={this.handleValuesChange}
                />
            </>
        )
    }
}
