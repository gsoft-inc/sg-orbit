import { MagnifierIcon } from "../../icons";
import { PureComponent } from "react";
import { TextInput } from "../../input";
import { func } from "prop-types";

export class TagsPickerDropdownSearchInput extends PureComponent {
    static propTypes = {
        /**
         * Called on text change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} value - New value.
         * @returns {void}
         */
        onChange: func
    };

    handleChange = event => {
        const { onChange } = this.props;

        onChange(event, event.target.value);
    };

    render() {
        return (
            <TextInput
                {...this.props}
                onChange={this.handleChange}
                iconLeft={<MagnifierIcon className="fill-marine-900" />}
                autoFocus
                autoComplete="off"
                data-testid="tags-picker-dropdown-search-input"
            />
        );
    }
}
