import { BRANDS, COLORS_WEIGHT, createBrandColorVariableName, createPrimaryColorVariableName, useStorage } from "../../shared/brands";
import { IconButton, Icons, TooltipLinkList, WithTooltipPure } from "@storybook/components";
import { useState } from "react";

const STORYBOOK_PREVIEW_IFRAME_ID = "storybook-preview-iframe";

function BrandPickerTool() {
    const [, setCurrentBrand] = useStorage();
    const [expanded, setExpanded] = useState(false);

    const applyBrand = brand => {
        const previewIframe = document.getElementById(STORYBOOK_PREVIEW_IFRAME_ID);
        const iframeWindow = previewIframe.contentWindow;
        const iframeDocument = previewIframe.contentDocument;

        const computedStyle = iframeWindow.getComputedStyle(iframeDocument.documentElement);

        COLORS_WEIGHT.forEach(x => {
            iframeDocument.documentElement.style.setProperty(createPrimaryColorVariableName(x), computedStyle.getPropertyValue(createBrandColorVariableName(brand.id, x)));
        });
    };

    const handleSelectBrand = brand => {
        applyBrand(brand);
        setCurrentBrand(brand);
        setExpanded(false);
    };

    const handleTooltipVisibilityChange = isVisible => {
        setExpanded(isVisible);
    };

    const tooltipLinks = Object.values(BRANDS).map(x => ({
        id: x.id,
        title: x.displayName,
        onClick: () => handleSelectBrand(x)
    }));

    return (
        <WithTooltipPure
            placement="top"
            trigger="click"
            tooltipShown={expanded}
            onVisibilityChange={handleTooltipVisibilityChange}
            tooltip={<TooltipLinkList links={tooltipLinks} />}
        >
            <IconButton
                key="brands"
                title="Pick a brand"
            >
                <Icons icon="photo" />
            </IconButton>
        </WithTooltipPure>
    );
}

export function createBrandPickerRenderer() {
    return () => <BrandPickerTool />;
}
