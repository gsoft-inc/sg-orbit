import { ITEM_SHAPE, TagsPicker } from "@react-components/tags-picker";
import { PureComponent } from "react";
import { arrayOf, bool, shape, string } from "prop-types";
import { isNil } from "lodash";

export class ControlledTagsPicker extends PureComponent {
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

        const style = {
            width: "80px"
        };

        return (
            <>
                <div className="mb6">
                    <div className="mb1">
                        <span className="dib fw6" style={style}>values:</span> {isNil(values) ? "null" : JSON.stringify(values, null, 4)}
                    </div>
                    <div className="mb1">
                        <span className="dib fw6" style={style}>open:</span> {open ? "true" : "false"}
                    </div>
                </div>

                <TagsPicker
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
