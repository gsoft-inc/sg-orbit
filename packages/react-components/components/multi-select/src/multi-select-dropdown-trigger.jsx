import { Button } from "semantic-ui-react";
import { PureComponent } from "react";
import { func, node, string } from "prop-types";
import { isNil } from "lodash";

export class MultiSelectDropdownTrigger extends PureComponent {
    static propTypes = {
        text: string,
        icon: node,
        onClick: func,
        className: string
    };

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "tall";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { text, icon, onClick } = this.props;

        return (
            <div className="mr2 mb2">
                <Button secondary onClick={onClick} className={this.getClasses()}>
                    {text} {icon}
                </Button>
            </div>
        );
    }
}
