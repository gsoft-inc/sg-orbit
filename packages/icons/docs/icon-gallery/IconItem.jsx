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
            <div className="o-ui-sb-gallery-item o-ui-df o-ui-fd-c">
                <div className="o-ui-pa-3 o-ui-ta-c o-ui-fs-3">{displayName.toLowerCase()}</div>
                <div className="o-ui-df o-ui-jc-c">
                    <div className="o-ui-w-7 o-ui-h-7">
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
