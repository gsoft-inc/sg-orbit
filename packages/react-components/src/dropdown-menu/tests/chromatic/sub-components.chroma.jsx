import { DropdownMenu } from "@react-components/dropdown-menu";
import { LightbulbIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("DropdownMenu"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories("/sub components")
    .add("default", () =>
        <div className="flex">
            <DropdownMenu text="File" wrapperClassName="mr5">
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
            </DropdownMenu>
            <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
            </DropdownMenu>
        </div>
    )
    .add("scrolling", () =>
        <DropdownMenu text="File" scrolling defaultOpen focusFirstItemOnOpen={false}>
            <DropdownMenu.Item>1</DropdownMenu.Item>
            <DropdownMenu.Item>2</DropdownMenu.Item>
            <DropdownMenu.Item>3</DropdownMenu.Item>
            <DropdownMenu.Item>4</DropdownMenu.Item>
            <DropdownMenu.Item>5</DropdownMenu.Item>
            <DropdownMenu.Item>6</DropdownMenu.Item>
            <DropdownMenu.Item>7</DropdownMenu.Item>
            <DropdownMenu.Item>8</DropdownMenu.Item>
            <DropdownMenu.Item>9</DropdownMenu.Item>
            <DropdownMenu.Item>10</DropdownMenu.Item>
            <DropdownMenu.Item>11</DropdownMenu.Item>
        </DropdownMenu>
    )
    .add("direction", () =>
        <div className="flex">
            <DropdownMenu text="File" direction="left" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "100px" }}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
            </DropdownMenu>
            <DropdownMenu text="File" direction="right" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "100px" }}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
            </DropdownMenu>
        </div>
    )
    .add("header", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <DropdownMenu text="File" size="small" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" size="small" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header icon={<LightbulbIcon />}>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" size="small" defaultOpen focusFirstItemOnOpen={false}>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
            </div>
            <div className="flex" style={{ marginBottom: "225px" }}>
                <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header icon={<LightbulbIcon />}>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
            </div>
            <div className="flex">
                <DropdownMenu text="File" size="large" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" size="large" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header icon={<LightbulbIcon />}>Quick Actions</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
                <DropdownMenu text="File" size="large" defaultOpen focusFirstItemOnOpen={false}>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item>New</DropdownMenu.Item>
                    <DropdownMenu.Item>Open...</DropdownMenu.Item>
                    <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                </DropdownMenu>
            </div>
        </div>
    )
    .add("divider", () =>
        <div className="flex">
            <DropdownMenu text="File" size="small" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                <DropdownMenu.Item>Rename</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Download As...</DropdownMenu.Item>
                <DropdownMenu.Item>Publish To Web</DropdownMenu.Item>
            </DropdownMenu>
            <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false} style={{ marginRight: "200px" }}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                <DropdownMenu.Item>Rename</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Download As...</DropdownMenu.Item>
                <DropdownMenu.Item>Publish To Web</DropdownMenu.Item>
            </DropdownMenu>
            <DropdownMenu text="File" size="large" defaultOpen focusFirstItemOnOpen={false}>
                <DropdownMenu.Item>New</DropdownMenu.Item>
                <DropdownMenu.Item>Open...</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Save as...</DropdownMenu.Item>
                <DropdownMenu.Item>Rename</DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item>Download As...</DropdownMenu.Item>
                <DropdownMenu.Item>Publish To Web</DropdownMenu.Item>
            </DropdownMenu>
        </div>
    )
    .add("item link", () =>
        <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
            <DropdownMenu.LinkItem href="https://www.google.com" target="_blank" rel="noreferrer">New</DropdownMenu.LinkItem>
            <DropdownMenu.LinkItem href="https://www.google.com" target="_blank" rel="noreferrer">Open...</DropdownMenu.LinkItem>
            <DropdownMenu.LinkItem href="https://www.google.com" target="_blank" rel="noreferrer">Save as...</DropdownMenu.LinkItem>
        </DropdownMenu>
    )
    .add("item button", () =>
        <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
            <DropdownMenu.ButtonItem onClick={noop}>New</DropdownMenu.ButtonItem>
            <DropdownMenu.ButtonItem onClick={noop}>Open...</DropdownMenu.ButtonItem>
            <DropdownMenu.ButtonItem onClick={noop}>Save as...</DropdownMenu.ButtonItem>
        </DropdownMenu>
    )
    .add("item text", () =>
        <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
            <DropdownMenu.Item text="New" />
            <DropdownMenu.Item text="Open..." />
            <DropdownMenu.Item text="Save as..." />
        </DropdownMenu>
    )
    .add("item content", () =>
        <DropdownMenu text="File" defaultOpen focusFirstItemOnOpen={false}>
            <DropdownMenu.Item content="New" />
            <DropdownMenu.Item content="Open..." />
            <DropdownMenu.Item content="Save as..." />
        </DropdownMenu>
    );
