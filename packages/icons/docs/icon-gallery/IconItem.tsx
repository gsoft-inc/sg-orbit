import "./IconItem.css";

import { Content } from "@components/placeholders";
import { Dialog, DialogTrigger } from "@components/dialog";
import { Flex } from "@components/layout";
import { Heading } from "@components/typography";
import { IconDetail } from "./details";
import { PreviewIcon } from "./PreviewIcon";
import { ReactElement, SyntheticEvent, useCallback, useState } from "react";
import { CreatedIconProps } from "@components/icons";

interface IconItemProps {
    name: string;
    iconComponent: ReactElement<CreatedIconProps>;
}

export function IconItem({ name, iconComponent }: IconItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowDetail = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const handleModalOpenChange = useCallback((_: SyntheticEvent, isOpen: boolean) => {
        setIsModalOpen(isOpen);
    }, [setIsModalOpen]);

    const displayName = getDisplayName(name);

    return (
        <DialogTrigger
            open={isModalOpen}
            onOpenChange={handleModalOpenChange}
            dismissable
        >
            <Flex direction="row" className="o-ui-sb-gallery-item">
                <PreviewIcon icon={iconComponent} displayName={displayName} onShowDetail={handleShowDetail} />
            </Flex>
            <Dialog>
                <Heading>{displayName}</Heading>
                <Content>
                    <IconDetail
                        name={name}
                        iconComponent={iconComponent}
                        iconFileName={getFileName(name)}
                    />
                </Content>
            </Dialog>
        </DialogTrigger>
    );
}


function getDisplayName(name: string) {
    return name.split(/(?=[A-Z])/).join(" ");
}

function getFileName(name: string) {
    return (`icon-${name.split(/(?=[A-Z])/).join("-")}.svg`).toLowerCase();
}
