import { Input, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { func, node, string } from "prop-types";
import { isNil } from "lodash";

export class MultiSelectDropdownSearchInput extends PureComponent {
    static propTypes = {
        onChange: func,
        icon: node,
        placeholder: string,
        className: string
    };

    _inputRef = createRef();

    componentDidMount() {
        const inputElement = this._inputRef.current.querySelector("input");

        if (!isNil(inputElement)) {
            inputElement.select();
        }
    }

    handleChange = (event, { value }) => {
        const { onChange } = this.props;

        onChange(event, value, this.props);
    };

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "colored";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
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
                    <input data-testid="multi-select-dropdown-search-input" autoFocus />
                </Input>
            </Ref>
        );
    }
}
