import { IconButton, Icons } from "@storybook/components";
import { PureComponent } from "react";

const STORYBOOK_PREVIEW_IFRAME_ID = "storybook-preview-iframe";
const COLORS_WEIGHT = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

class DarkModeToggleTool extends PureComponent {
    state = {
        theme: LIGHT_THEME
    };

    handleClick = () => {
        const { theme } = this.state;

        const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

        this.setState({ theme: newTheme });
        this.applyTheme(newTheme );


        const previewIframe = document.getElementById(STORYBOOK_PREVIEW_IFRAME_ID);
        const iframeWindow = previewIframe.contentWindow;
        const iframeDocument = previewIframe.contentDocument;

        const computedStyle = iframeWindow.getComputedStyle(iframeDocument.documentElement);

        COLORS_WEIGHT.forEach(x => {
            iframeDocument.documentElement.style.setProperty(`--marine-${x}`, computedStyle.getPropertyValue(`--marine-${theme}-${x}`));
            iframeDocument.documentElement.style.setProperty(`--cloud-${x}`, computedStyle.getPropertyValue(`--cloud-${theme}-${x}`));
        });
        iframeDocument.documentElement.style.setProperty("--white", computedStyle.getPropertyValue(`--white-${theme}`));
    }

    render() {
        return (
            <>
                <IconButton
                    key="theme"
                    title="Dark Mode"
                    onClick={this.handleClick}
                >
                    <Icons icon="mirror" />
                </IconButton>
            </>
        );
    }
}

export function renderTool() {
    return <DarkModeToggleTool />;
}
