import { PureComponent } from "react";
import { bool, func, instanceOf, object, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";

export class DOMEventListener extends PureComponent {
    static propTypes = {
        name: string.isRequired,
        on: func.isRequired,
        target: oneOfType([
            oneOf(["document", "window"]),
            instanceOf(HTMLElement),
            shape({
                current: object
            })
        ]),
        capture: bool
    };

    static defaultProps = {
        target: "document",
        capture: false
    };

    _target = null;

    componentDidMount() {
        this.subscribe();
    }

    componentDidUpdate() {
        this.unsubscribe();
        this.subscribe();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    subscribe() {
        const { name, on, capture } = this.props;

        this._target = this.getTarget();
        this._target.addEventListener(name, on, capture);
    }

    unsubscribe() {
        const { name, on, capture } = this.props;

        if (!isNil(this._target)) {
            this._target.removeEventListener(name, on, capture);
        }
    }

    getTarget() {
        const { target } = this.props;

        if (target === "document") {
            return document;
        } else if (target === "window") {
            return window;
        } else if (target instanceof HTMLElement) {
            return target;
        }

        return target.current;
    }

    render() {
        return null;
    }
}
