import { DropdownMenu } from "@react-components/dropdown-menu";
import { LightbulbIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown Menu"))
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
            <DropdownMenu text="File" className="mr5">
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Item text="Save as..." />
            </DropdownMenu>
            <DropdownMenu text="File" defaultOpen>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Item text="Save as..." />
            </DropdownMenu>
        </div>
    )
    .add("scrolling", () =>
        <DropdownMenu text="File" scrolling defaultOpen>
            <DropdownMenu.Item text="1" />
            <DropdownMenu.Item text="2" />
            <DropdownMenu.Item text="3" />
            <DropdownMenu.Item text="4" />
            <DropdownMenu.Item text="5" />
            <DropdownMenu.Item text="6" />
            <DropdownMenu.Item text="7" />
            <DropdownMenu.Item text="8" />
            <DropdownMenu.Item text="9" />
            <DropdownMenu.Item text="10" />
            <DropdownMenu.Item text="11" />
        </DropdownMenu>
    )
    .add("direction", () =>
        <div className="flex">
            <DropdownMenu text="File" direction="left" defaultOpen style={{ marginRight: "100px" }}>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Item text="Save as..." />
            </DropdownMenu>
            <DropdownMenu text="File" direction="right" defaultOpen style={{ marginRight: "100px" }}>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Item text="Save as..." />
            </DropdownMenu>
        </div>
    )
    .add("header", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <DropdownMenu text="File" size="small" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" size="small" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" icon={<LightbulbIcon />} />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" size="small" defaultOpen>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
            </div>
            <div className="flex" style={{ marginBottom: "225px" }}>
                <DropdownMenu text="File" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" icon={<LightbulbIcon />} />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" defaultOpen>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
            </div>
            <div className="flex">
                <DropdownMenu text="File" size="large" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" size="large" defaultOpen style={{ marginRight: "200px" }}>
                    <DropdownMenu.Header text="Quick Actions" icon={<LightbulbIcon />} />
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
                <DropdownMenu text="File" size="large" defaultOpen>
                    <DropdownMenu.Header>Custom content</DropdownMenu.Header>
                    <DropdownMenu.Item text="New" />
                    <DropdownMenu.Item text="Open..." />
                    <DropdownMenu.Item text="Save as..." />
                </DropdownMenu>
            </div>
        </div>
    )
    .add("divider", () =>
        <div className="flex">
            <DropdownMenu text="File" size="small" defaultOpen style={{ marginRight: "200px" }}>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Save as..." />
                <DropdownMenu.Item text="Rename" />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Download As..." />
                <DropdownMenu.Item text="Publish To Web" />
            </DropdownMenu>
            <DropdownMenu text="File" defaultOpen style={{ marginRight: "200px" }}>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Save as..." />
                <DropdownMenu.Item text="Rename" />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Download As..." />
                <DropdownMenu.Item text="Publish To Web" />
            </DropdownMenu>
            <DropdownMenu text="File" size="large" defaultOpen>
                <DropdownMenu.Item text="New" />
                <DropdownMenu.Item text="Open..." />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Save as..." />
                <DropdownMenu.Item text="Rename" />
                <DropdownMenu.Divider />
                <DropdownMenu.Item text="Download As..." />
                <DropdownMenu.Item text="Publish To Web" />
            </DropdownMenu>
        </div>
    );
