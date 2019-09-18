import { Button, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { func, node, string } from "prop-types";
import { isNil } from "lodash";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

export class MultiSelectDropdownTrigger extends PureComponent {
    static propTypes = {
        text: string,
        icon: node,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        className: string
    };

    _buttonRef = createRef();

    handleClick = useHandlerProxy(this, "onClick");

    getClasses() {
        const { className } = this.props;

        const defaultClasses = "tall";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        const { text, icon } = this.props;

        return (
            <div className="mr2 mb2">
                <Ref innerRef={this._buttonRef}>
                    <Button secondary onClick={this.handleClick} className={this.getClasses()}>
                        {text} {icon}
                    </Button>
                </Ref>
            </div>
        );
    }

    // This function is part of the external API
    focus() {
        this._buttonRef.current.focus();
    }
}
