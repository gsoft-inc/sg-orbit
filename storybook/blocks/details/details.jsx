import { KEYS } from "@react-components/shared";
import { any, bool, string } from "prop-types";
import { useCallback, useState } from "react";

const propTypes = {
    defaultOpen: bool,
    title: string.isRequired,
    children: any.isRequired
};

const defaultProps = {
    defaultOpen: false
};

function useHandleClick(setIsOpen) {
    return useCallback(event => {
        event.preventDefault();

        setIsOpen(x => !x);
    }, [setIsOpen]);
}

function useHandleKeyDown(setIsOpen) {
    return useCallback(event => {
        const key = event.keyCode;

        if (key === KEYS.enter || key === KEYS.space) {
            event.preventDefault();
            setIsOpen(x => !x);
        } else if (key === KEYS.esc) {
            event.preventDefault();
            setIsOpen(false);
        }
    }, [setIsOpen]);
}

export function Details({ defaultOpen, title, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleClick = useHandleClick(setIsOpen);
    const handleKeyDown = useHandleKeyDown(setIsOpen);

    return (
        <details
            {...rest}
            open={isOpen}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <summary>{title}</summary>
            {isOpen && children}
        </details>
    );
}

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;
