import { Flex, FlexProps } from "@components/layout";
import { ModalContext } from "./ModalContext";
import { NAVIGATE_URL } from "@storybook/core-events";
import { components } from "@storybook/components";
import { useContext } from "react";
import addons from "@storybook/addons";

// Would be better to use Storybook AnchorMdx component but the component doesn't currently forward the onClick handler.
const A = components.a;

export function LearnUsageLink(props: Omit<FlexProps, "children">) {
    const { onClose } = useContext(ModalContext);

    const handleClick = () => {
        onClose?.();
        addons.getChannel().emit(NAVIGATE_URL, "#dimensions");
    };

    return (
        <Flex
            {...props}
            justifyContent="end"
        >
            <A href="#dimensions" target="_self" className="o-ui-fs-3 o-ui-text-alias-accent" onClick={handleClick}>Learn more about usage</A>
        </Flex>
    );
}
