import { IconButton, Icons, TooltipLinkList, WithTooltip } from "@storybook/components";
import { PureComponent } from "react";

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

class BrandLinkClickEventHandler {
    _brand = null;
    _onClick = null;

    constructor(brand, onClick) {
        this._brand = brand;
        this._onClick = onClick;
    }

    handleClick = event => {
        this._onClick(event, this._brand);
    }
}

function createBrandLink(brand, onClick) {
    return {
        id: brand.id,
        title: brand.displayName,
        onClick: new BrandLinkClickEventHandler(brand, onClick).handleClick
    };
}

class BrandPickerTool extends PureComponent {
    state = {
        expanded: false
    };

    _tooltipLinks = null;
    _previewIframeElement = null;

    componentDidMount() {
        setTimeout(() => {
            this.applyBrand(BRANDS.apricot);
        }, 3000);

        this.createTooltipLinks();
    }

    createTooltipLinks() {
        this._tooltipLinks = [
            createBrandLink(BRANDS.apricot, this.handleSelectBrand),
            createBrandLink(BRANDS.overcast, this.handleSelectBrand),
            createBrandLink(BRANDS.desktop, this.handleSelectBrand)
        ];
    }

    handleSelectBrand = (event, brand) => {
        this.applyBrand(brand);
        this.setState({ expanded: false });
    }

    handleTooltipVisibilityChange = expanded => {
        this.setState({ expanded });
    }

    applyBrand(brand) {
        const previewIframe = document.getElementById(STORYBOOK_PREVIEW_IFRAME_ID);
        const iframeWindow = previewIframe.contentWindow;
        const iframeDocument = previewIframe.contentDocument;

        const computedStyle = iframeWindow.getComputedStyle(iframeDocument.documentElement);

        COLORS_WEIGHT.forEach(x => {
            iframeDocument.documentElement.style.setProperty(`--primary-${x}`, computedStyle.getPropertyValue(`--${brand.id}-${x}`));

            console.log(`--primary-${x} `, `--${brand.id}-${x}`);
        });
    }

    render() {
        const { expanded } = this.state;

        return (
            // Update for a link list with every brand
            <WithTooltip
                placement="top"
                trigger="click"
                tooltipShown={expanded}
                onVisibilityChange={this.handleTooltipVisibilityChange}
                closeOnClick
                tooltip={<TooltipLinkList links={this._tooltipLinks} />}
            >
                <IconButton
                    key="brands"
                    title="Pick a brand"
                >
                    <Icons icon="photo" />
                </IconButton>
            </WithTooltip>
        );
    }
}

export function renderTool() {
    return <BrandPickerTool />;
}
