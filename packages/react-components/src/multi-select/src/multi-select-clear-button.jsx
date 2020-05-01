import { Button } from "../../button";
import { PureComponent, createRef } from "react";
import { SIZES } from "./sizes";
import { func, oneOf, string } from "prop-types";
import { withHandlerProxy } from "../../shared";

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
         * A clear button can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * @ignore
         */
        className: string
    };

    static defaultProps = {
        text: "Clear all"
    };

    _buttonRef = createRef();

    handleClick = withHandlerProxy(this, "onClick", false);

    render() {
        const { text, className, size } = this.props;

        return (
            <Button
                onClick={this.handleClick}
                ghost
                compact
                size={size}
                className={className}
                ref={this._buttonRef}
                data-testid="multi-select-clear-button"
            >
                {text}
            </Button>
        );
    }
}
