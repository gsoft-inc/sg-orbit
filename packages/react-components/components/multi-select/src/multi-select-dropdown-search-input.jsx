import { Input } from "@orbit-ui/react-input";
import { PureComponent, createRef } from "react";
import { Ref } from "semantic-ui-react";
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

    _inputRef = createRef();

    handleChange = (event, { value }) => {
        const { onChange } = this.props;

        onChange(event, value, this.props);
    };

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "colored",
            className
        );
    }

    render() {
        const { placeholder, icon } = this.props;

        return (
            <Ref innerRef={this._inputRef}>
                <Input
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    icon
                    iconPosition="left"
                    className={this.getClasses()}
                    autoComplete="off"
                >
                    <i className="icon">{icon}</i>
                    <input type="text" data-testid="multi-select-dropdown-search-input" autoFocus />
                </Input>
            </Ref>
        );
    }
}
