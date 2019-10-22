import { IconButton, Icons, TooltipLinkList, WithTooltipPure } from "@storybook/components";
import { useState } from "react";

function createBrand(id, displayName) {
    return {
        id,
        displayName
    };
}

const BRANDS = {
    apricot: createBrand("apricot", "Apricot"),
    overcast: createBrand("overcast", "Overcast"),
    desktop: createBrand("desktop", "Desktop")
};

const COLORS_WEIGHT = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const STORYBOOK_PREVIEW_IFRAME_ID = "storybook-preview-iframe";

function BrandPickerTool() {
    const [expanded, setExpanded] = useState(false);

    const applyBrand = brand => {
        const previewIframe = document.getElementById(STORYBOOK_PREVIEW_IFRAME_ID);
        const iframeWindow = previewIframe.contentWindow;
        const iframeDocument = previewIframe.contentDocument;

        const computedStyle = iframeWindow.getComputedStyle(iframeDocument.documentElement);

        COLORS_WEIGHT.forEach(x => {
            iframeDocument.documentElement.style.setProperty(`--primary-${x}`, computedStyle.getPropertyValue(`--${brand.id}-${x}`));
        });
    };

    const handleSelectBrand = brand => {
        applyBrand(brand);
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

export function renderTool() {
    return <BrandPickerTool />;
}
