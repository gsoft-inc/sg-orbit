import { IconButton } from "@react-components/button";
import { CrossIcon } from "@react-components/icons";
import { IconDetail } from "./icon-detail";
import { KEYS, useWindowListener } from "@react-components/shared";
import { Modal } from "semantic-ui-react";
import { ModalContext } from "./modal-context";
import { bool, func, string } from "prop-types";

export function IconModal({ open, iconDisplayName, onClose, ...rest }) {
    const handleDocumentKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            onClose(event);
        }
    };

    useWindowListener("keydown", handleDocumentKeyDown, open);

    return (
        <Modal open={open} onClose={onClose} size="small" basic className="bg-white">
            <Modal.Header>
                <div className="flex items-center">
                    <span className="flex-grow-1 marine-900">{iconDisplayName}</span>
                    <IconButton variant="ghost" color="secondary" circular size="small" onClick={onClose}>
                        <CrossIcon />
                    </IconButton>
                </div>
            </Modal.Header>
            <Modal.Content>
                <ModalContext.Provider value={{ onClose: onClose }}>
                    <IconDetail iconDisplayName={iconDisplayName} {...rest} />
                </ModalContext.Provider>
            </Modal.Content>
        </Modal>
    );
}

IconModal.propTypes = {
    open: bool.isRequired,
    iconName: string.isRequired,
    iconDisplayName: string.isRequired,
    onClose: func.isRequired
};
