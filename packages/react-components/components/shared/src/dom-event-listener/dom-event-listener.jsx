import { Exception } from "handlebars";
import { PureComponent } from "react";
import { bool, func, oneOf, string } from "prop-types";

export class DOMEventListener extends PureComponent {
    static propTypes = {
        name: string.isRequired,
        on: func.isRequired,
        target: oneOf(["document", "window"]),
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

        this.getTarget().addEventListener(name, on, capture);
    }

    unsubscribe() {
        const { name, on, capture } = this.props;

        this.getTarget().removeEventListener(name, on, capture);
    }

    getTarget() {
        const { target } = this.props;

        if (target === "document") {
            return document;
        } else if (target === "window") {
            return window;
        }

        throw new Exception("DOMEventListener - Unknown DOM target.");
    }

    render() {
        return null;
    }
}
