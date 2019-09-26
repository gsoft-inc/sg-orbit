import { Button, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { func, string } from "prop-types";
import { isNil } from "lodash";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

export class MultiSelectClearButton extends PureComponent {
    static propTypes = {
        text: string,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        className: string
    };

    static defaultProps = {
        text: "Clear all"
    };

    _buttonRef = createRef();

    handleClick = useHandlerProxy(this, "onClick");

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "ghost tall";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { text } = this.props;

        return (
            <Ref innerRef={this._buttonRef}>
                <Button
                    onClick={this.handleClick}
                    className={this.getClasses()}
                    type="button"
                    data-testid="multi-select-clear-button"
                >
                    {text}
                </Button>
            </Ref>
        );
    }
}
