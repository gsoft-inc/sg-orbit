import { PureComponent, cloneElement, forwardRef } from "react";
import { func, node, object } from "prop-types";

class PopupTriggerInner extends PureComponent {
    static propTypes = {
        trigger: node.isRequired,
        onClick: func.isRequired,
        onKeyDown: func.isRequired,
        triggerRef: object.isRequired
    };

    componentDidMount() {
        this.bindEvents();
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    bindEvents() {
        const { onClick, onKeyDown, triggerRef } = this.props;

        triggerRef.current.addEventListener("click", onClick, false);
        triggerRef.current.addEventListener("keydown", onKeyDown, false);
    }

    unbindEvents() {
        const { onClick, onKeyDown, triggerRef } = this.props;

        triggerRef.current.removeEventListener("click", onClick, false);
        triggerRef.current.removeEventListener("keydown", onKeyDown, false);
    }

    render() {
        const { trigger, triggerRef } = this.props;

        return cloneElement(trigger, {
            ref: triggerRef
        });
    }
}

export const PopupTrigger = forwardRef((props, ref) => {
    return <PopupTriggerInner { ...props } triggerRef={ref} />;
});
