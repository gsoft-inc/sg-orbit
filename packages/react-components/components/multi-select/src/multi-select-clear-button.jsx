import { Button, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { func, string } from "prop-types";
import { mergeClasses, useHandlerProxy } from "@orbit-ui/react-components-shared";

export class MultiSelectClearButton extends PureComponent {
    static propTypes = {
        /**
         * The button text.
         */
        text: string,
        /**
         * Called on click.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        text: "Clear all"
    };

    _buttonRef = createRef();

    handleClick = useHandlerProxy(this, "onClick", false);

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "ghost tall",
            className
        );
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
