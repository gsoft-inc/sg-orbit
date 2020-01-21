import { Button, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { func, string } from "prop-types";
import { mergeClasses, withHandlerProxy } from "@orbit-ui/react-components-shared";

export class MultiSelectClearButton extends PureComponent {
    static propTypes = {
        /**
         * The button text.
         */
        text: string,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
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

    handleClick = withHandlerProxy(this, "onClick", false);

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "ghost",
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
                    size="large"
                    data-testid="multi-select-clear-button"
                >
                    {text}
                </Button>
            </Ref>
        );
    }
}
