import "./IconItem.css";

import { Content } from "@react-components/placeholders";
import { Dialog, DialogTrigger } from "@react-components/dialog";
import { Div } from "@react-components/html";
import { Flex } from "@react-components/layout";
import { Heading } from "@react-components/typography";
import { IconDetail } from "./details";
import { MULTI_VARIANT_SHAPE, VARIANT_SHAPE } from "./shapes";
import { PreviewIcon } from "./PreviewIcon";
import { arrayOf, shape, string } from "prop-types";
import { useCallback, useState } from "react";

const propTypes = {
    name: string.isRequired,
    multiVariant: shape(MULTI_VARIANT_SHAPE).isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};

function getDisplayName(name) {
    return name.split(/(?=[A-Z])/).join(" ");
}

export function IconItem({ name, multiVariant, variants }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowDetail = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const handleModalOpenChange = useCallback((event, isOpen) => {
        setIsModalOpen(isOpen);
    }, [setIsModalOpen]);

    const displayName = getDisplayName(name);

    return (
        <DialogTrigger
            open={isModalOpen}
            onOpenChange={handleModalOpenChange}
            dismissable
        >
            <Flex direction="column" className="o-ui-sb-gallery-item">
                <Div padding={3} fontSize={3} textAlign="center">{displayName.toLowerCase()}</Div>
                <Flex justifyContent="center">
                    <Div width={7} height={7}>
                        <PreviewIcon icon={multiVariant.icon} onShowDetail={handleShowDetail} />
                    </Div>
                </Flex>
            </Flex>
            <Dialog>
                <Heading>{displayName}</Heading>
                <Content>
                    <IconDetail
                        iconDisplayName={displayName}
                        multiVariant={multiVariant}
                        variants={variants}
                    />
                </Content>
            </Dialog>
        </DialogTrigger>
    );
}

IconItem.propTypes = propTypes;
