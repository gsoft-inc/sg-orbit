import { CrossIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { IconDetail } from "./IconDetail";
import { KEYS, useWindowListener } from "@react-components/shared";
import { Modal } from "semantic-ui-react";
import { ModalContext } from "./ModalContext";
import { bool, func, string } from "prop-types";

const propTypes = {
    open: bool.isRequired,
    iconName: string.isRequired,
    iconDisplayName: string.isRequired,
    onClose: func.isRequired
};

export function IconModal({ open, iconDisplayName, onClose, ...rest }) {
    const handleDocumentKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            onClose(event);
        }
    };

    useWindowListener("keydown", handleDocumentKeyDown, open);

    return (
        <Modal open={open} onClose={onClose} size="small" basic className="bg-white sbdocs">
            <Modal.Header>
                <div className="flex items-center">
                    <span className="flex-grow-1 marine-900">{iconDisplayName}</span>
                    <IconButton variant="ghost" color="secondary" shape="circular" size="sm" onClick={onClose} aria-label="Close modal">
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

IconModal.propTypes = propTypes;
