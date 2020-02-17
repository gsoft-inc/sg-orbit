import { Button } from "@orbit-ui/react-button";
import { CloseIcon } from "@orbit-ui/icons";
import { DOMEventListener, KEYS } from "@orbit-ui/react-components-shared";
import { IconDetail } from "./icon-detail";
import { Modal } from "semantic-ui-react";
import { bool, func, string } from "prop-types";
import styles from "./icon-modal.module.css";

export function IconModal({ open, iconDisplayName, onClose, ...rest }) {
    const handleDocumentKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            onClose(event);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} size="small" basic className="bg-white">
                <Modal.Header>
                    <div className="flex items-center">
                        <span className="flex-grow-1 marine-900">{iconDisplayName}</span>
                        <Button ghost secondary circular icon={<CloseIcon />} size="small" onClick={onClose} />
                    </div>
                </Modal.Header>
                <Modal.Content className={styles.iconModal}>
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
