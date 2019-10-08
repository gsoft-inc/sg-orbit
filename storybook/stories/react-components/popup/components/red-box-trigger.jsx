import { PureComponent } from "react";
import { isNil } from "lodash";

export class RedBoxTrigger extends PureComponent {
    _containerRef = null;

    setContainerRef = ref => {
        const { onBoundingClientRectChange } = this.props;

        this._containerRef = ref;

        if (!isNil(ref)) {
            setTimeout(() => {
                if (!isNil(ref)) {
                    onBoundingClientRectChange(ref.getBoundingClientRect(), this.props);
                }
            }, 0);
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
        return <button onClick={this.handleButtonClick} type="button" ref={this.setContainerRef}>Open</button>;
    }

    focus() {
        if (!isNil(this._containerRef)) {
            this._containerRef.focus();
        }
    }
}
