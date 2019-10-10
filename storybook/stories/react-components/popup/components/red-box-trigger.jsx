import { PureComponent, createRef } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import { isNil } from "lodash";

export class RedBoxTrigger extends PureComponent {
    _containerRef = createRef();
    _containerResizeObserver = null;

    componentDidMount() {
        this._containerResizeObserver = new ResizeObserver(this.handleContainerSizeChange);
        this._containerResizeObserver.observe(this._containerRef.current);
    }

    componentWillUnmount() {
        this._containerResizeObserver.disconnect();
    }

    handleContainerSizeChange = entries => {
        const { onSizeChange } = this.props;

        if (!isNil(onSizeChange)) {
            const dimensions = entries[0].target.getBoundingClientRect();

            onSizeChange({ width: dimensions.width, height: dimensions.height });
        }
    };

    handleButtonClick = event => {
        const { open, onOpen, onClose } = this.props;

        if (!open) {
            onOpen(event);
        } else {
            onClose(event);
        }
    };

    render() {
        return <button
            onClick={this.handleButtonClick}
            type="button"
            ref={this._containerRef}
        >
            Open
        </button>;
    }

    focus() {
        if (!isNil(this._containerRef.current)) {
            this._containerRef.current.focus();
        }
    }
}
