import "./IconItem.css";

import { Content, Dialog, DialogTrigger, Heading } from "@react-components";
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
            <div className="o-ui-sb-gallery-item flex flex-column">
                <div className="pa3 tc f7">{displayName.toLowerCase()}</div>
                <div className="flex justify-center">
                    <div className="w7 h7">
                        <PreviewIcon icon={multiVariant.icon} onShowDetail={handleShowDetail} />
                    </div>
                </div>
            </div>
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
