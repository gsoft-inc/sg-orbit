import { ModalContext } from "./modal-context";
import { NAVIGATE_URL } from "@storybook/core-events";
import { components } from "@storybook/components/html";
import { useContext } from "react";
import addons from "@storybook/addons";

// Would be better to use Storybook AnchorMdx component but the component doesn't currently forward the onClick handler.
const A = components.a;

export function LearnUsageLink() {
    const modalContext = useContext(ModalContext);

    const handleClick = () => {
        modalContext.onClose();
        addons.getChannel().emit(NAVIGATE_URL, "#dimensions");
    };

    return (
        <div className="flex justify-end">
            <A href="#dimensions" target="_self" className="f7" onClick={handleClick}>Learn more about usage</A>
        </div>
    );
}
