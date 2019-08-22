import { Accordion, Label } from "semantic-ui-react";
import { PRESET_SHAPE } from "../../src";
import { PureComponent } from "react";
import { arrayOf } from "prop-types";

export class ShowPresets extends PureComponent {
    static propTypes = {
        presets: arrayOf(PRESET_SHAPE).isRequired
    };

    state = {
        open: false
    };

    _formattedPresets = null;

    componentDidMount() {
        const { presets } = this.props;

        this._formattedPresets = presets.reduce((accumulator, x) => {
            accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

            return accumulator;
        }, {});
    }

    handleToggle = () => {
        const { open } = this.state;

        this.setState({ open: !open });
    }

    render() {
        const { open } = this.state;

        return (
            <Accordion className="show-presets">
                <Accordion.Title onClick={this.handleToggle} active={open} style={{ padding: "0" }}>
                    <Label size="small">Presets</Label>
                </Accordion.Title>
                <Accordion.Content active={open}>
                    <pre>{JSON.stringify(this._formattedPresets, null, 2)}</pre>
                </Accordion.Content>
            </Accordion>
        );
    }
}
