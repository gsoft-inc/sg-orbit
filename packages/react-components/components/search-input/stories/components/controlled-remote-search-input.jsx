import { RemoteSearchInput } from "@orbit-ui/react-search-input/src";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import React, { PureComponent } from "react";

export class ControlledRemoteSearchInput extends PureComponent {
    static propTypes = {
        value: string,
        onFetchResults: func,
        onResults: func,
        open: bool,
        placeholder: string
    };

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
        const { onFetchResults, onResults, placeholder } = this.props;
        const { value, open } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>value:</span> {isNil(value) ? "N/A" : value}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <RemoteSearchInput
                    open={open}
                    value={value}
                    onFetchResults={onFetchResults}
                    onResults={onResults}
                    placeholder={placeholder}
                    onValueChange={this.handleValueChange}
                    onVisibilityChange={this.handleVisiblityChange}
                />
            </>
        );
    }
}
