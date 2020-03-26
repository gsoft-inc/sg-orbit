import { PureComponent } from "react";
import { RESULT_SHAPE, SearchInput } from "@react-components/search-input";
import { arrayOf, bool, shape, string } from "prop-types";
import { isNil } from "lodash";

export class ControlledSearchInput extends PureComponent {
    static propTypes = {
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        value: string,
        open: bool
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
        const { results } = this.props;
        const { value, open } = this.state;

        const style = {
            width: "80px"
        };

        return (
            <>
                <div className="mb6">
                    <div className="mb1">
                        <span className="dib fw6" style={style}>value:</span> {isNil(value) ? "N/A" : value}
                    </div>
                    <div className="mb1">
                        <span className="dib fw6" style={style}>open:</span> {open ? "true" : "false"}
                    </div>
                </div>

                <SearchInput
                    open={open}
                    results={results}
                    value={value}
                    onValueChange={this.handleValueChange}
                    onVisibilityChange={this.handleVisiblityChange}
                />
            </>
        );
    }
}
