import { Input } from "@orbit-ui/react-input";
import { PureComponent } from "react";
import { func, node, string } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";

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
         * A custom React SVG component displayed before the text.
         */
        icon: node,
        /**
         * The placeholder text.
         */
        placeholder: string,
        /**
         * Additional classes.
         */
        className: string
    };

    handleChange = (event, { value }) => {
        const { onChange } = this.props;

        onChange(event, value, this.props);
    };

    render() {
        const { placeholder, icon, className } = this.props;

        return (
            <Input
                onChange={this.handleChange}
                placeholder={placeholder}
                icon={icon}
                iconPosition="left"
                className={className}
                autofocus
                autoComplete="off"
                {...{ "data-testid": "multi-select-dropdown-search-input" }}
            />
        );
    }
}
