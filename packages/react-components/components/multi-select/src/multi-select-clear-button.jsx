import { Button } from "semantic-ui-react";
import { PureComponent } from "react";
import { func, string } from "prop-types";
import { isNil } from "lodash";

export class MultiSelectClearButton extends PureComponent {
    static propTypes = {
        text: string,
        onClick: func,
        className: string
    };

    static defaultProps = {
        text: "Clear all"
    };

    handleClick = event => {
        const { onClick } = this.props;

        onClick(event, this.props);
    }

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "ghost tall";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { text } = this.props;

        return (
            <Button onClick={this.handleClick} className={this.getClasses()}>
                {text}
            </Button>
        );
    }
}
