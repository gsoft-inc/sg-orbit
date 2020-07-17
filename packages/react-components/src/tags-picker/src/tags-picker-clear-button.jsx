import { Button } from "../../button";
import { PureComponent, createRef } from "react";
import { func, oneOf, string } from "prop-types";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

export class TagsPickerClearButton extends PureComponent {
    static propTypes = {
        /**
         * The button text.
         */
        text: string,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClick: func,
        /**
         * A clear button can have different sizes.
         */
        size: oneOf(SIZES)
    };

    static defaultProps = {
        text: "Clear all"
    };

    _buttonRef = createRef();

    render() {
        const { text, onClick, className, size } = this.props;

        return (
            <Button
                onClick={onClick}
                variant="ghost"
                size={size}
                className={className}
                ref={this._buttonRef}
                data-testid="tags-picker-clear-button"
            >
                {text}
            </Button>
        );
    }
}
