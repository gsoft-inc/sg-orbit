import { DEFAULT_RESULTS } from "../../shared";
import { SearchInput } from "../../../src";
import { isNil } from "lodash";
import React, { PureComponent } from "react";

export class ControlledSearchInput extends PureComponent {
    static defaultProps = {
        open: false
    };

    state = {
        value: this.props.value,
        open: this.props.open
    };

    handleValueChange = (event, value) => {
        const { onValueChange } = this.props;

        this.setState({ value: isNil(value) ? null : value.text });
        onValueChange(event, value);
    };

    handleVisiblityChange = (event, open) => {
        this.setState({ open });
    };

    render() {
        const { value, open } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>value:</span> {isNil(value) ? "N/A" : value}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <SearchInput
                    open={open}
                    results={DEFAULT_RESULTS}
                    value={value}
                    onValueChange={this.handleValueChange}
                    onVisibilityChange={this.handleVisiblityChange}
                />
            </>
        );
    }
}
