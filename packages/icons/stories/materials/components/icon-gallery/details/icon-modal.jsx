import { Button } from "@orbit-ui/react-button";
import { CloseIcon } from "@orbit-ui/icons";
import { DOMEventListener, KEYS } from "@orbit-ui/react-components-shared";
import { IconDetail } from "./icon-detail";
import { Modal } from "semantic-ui-react";
import { bool, func, string } from "prop-types";

export function IconModal({ open, iconDisplayName, onClose, ...rest }) {
    const handleDocumentKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            onClose(event);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} size="small">
                <Modal.Header>
                    <div className="flex items-center">
                        <span className="flex-grow-1">{iconDisplayName}</span>
                        <Button ghost secondary circular icon={<CloseIcon />} size="small" onClick={onClose} />
                    </div>
                </Modal.Header>
                <Modal.Content>
                    <IconDetail iconDisplayName={iconDisplayName} {...rest} />
                </Modal.Content>
            </Modal>

            <If condition={open}>
                <DOMEventListener name="keydown" target="window" on={handleDocumentKeyDown} />
            </If>
        </>
    );
}

IconModal.propTypes = {
    open: bool.isRequired,
    iconName: string.isRequired,
    iconDisplayName: string.isRequired,
    onClose: func.isRequired
};
