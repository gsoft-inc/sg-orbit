import { MagnifierIcon } from "../../icons";
import { PureComponent } from "react";
import { TextInput } from "../../text-input";
import { func, string } from "prop-types";

export class MultiSelectDropdownSearchInput extends PureComponent {
    static propTypes = {
        /**
         * Called on text change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} value - New value.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onChange: func,
        /**
         * The placeholder text.
         */
        placeholder: string,
        /**
         * @ignore
         */
        className: string
    };

    handleChange = (event, { value }) => {
        const { onChange } = this.props;

        onChange(event, value, this.props);
    };

    render() {
        const { placeholder, className } = this.props;

        return (
            <TextInput
                onChange={this.handleChange}
                placeholder={placeholder}
                icon={<MagnifierIcon className="fill-marine-500" />}
                iconPosition="left"
                className={className}
                autofocus
                autoComplete="off"
                data-testid="multi-select-dropdown-search-input"
            />
        );
    }
}
