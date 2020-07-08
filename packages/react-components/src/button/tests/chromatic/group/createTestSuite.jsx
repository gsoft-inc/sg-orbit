import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CalendarIcon, ImageIcon, SignoutIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Group({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Groups({ element, ...rest }) {
    const group = cloneElement(element, rest);

    return (
        <div className="flex">
            <div className="flex flex-column items-start mr12">
                <Group element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button disabled>One</Button>
                    <Button active>Two</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button disabled>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button>One</Button>
                    <Button disabled>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button disabled>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button active>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button>One</Button>
                    <Button active>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button active>Three</Button>
                </Group>
                <Group size="tiny" element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group size="small" element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group size="large" element={group} className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} widths="3" className="mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} widths="7">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                    <Button>5</Button>
                    <Button>6</Button>
                    <Button>7</Button>
                </Group>
            </div>
            <div className="flex flex-column items-start mr8">
                <Group element={group} className="mb5">
                    <Button disabled icon={<SignoutIcon />}>One</Button>
                    <Button active icon={<CalendarIcon />}>Two</Button>
                    <Button icon={<ImageIcon />}>Three</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button disabled icon={<SignoutIcon />} />
                    <Button active icon={<CalendarIcon />} />
                    <Button icon={<ImageIcon />} />
                </Group>
                <Group element={group} className="mb5">
                    <Button disabled badgeRight={<Badge>6</Badge>}>One</Button>
                    <Button active badgeRight={<Badge>6</Badge>}>Two</Button>
                    <Button badgeRight={<Badge>6</Badge>}>Tree</Button>
                </Group>
                <Group element={group} className="mb5">
                    <Button disabled badgeRight={<Badge variant="dot" />}>One</Button>
                    <Button active badgeRight={<Badge variant="dot" />}>Two</Button>
                    <Button badgeRight={<Badge variant="dot" />}>Tree</Button>
                </Group>
                <Group element={group} className="bg-red mb5">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
                <Group element={group} style={{ backgroundColor: "red" }}>
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </Group>
            </div>
        </div>
    );
}

export function createTestSuite(group, stories) {
    return stories
        .add("default", () =>
            <Groups element={group} />
        )
        .add("compact", () =>
            <Groups compact element={group} />
        )
        .add("fluid", () =>
            <Groups fluid element={group} />
        );
}
