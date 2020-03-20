import { Button } from "@orbit-ui/react-button/src";
import { CalendarIcon, ImageIcon, SignoutIcon } from "@orbit-ui/react-icons/src";
import { Label, Tag } from "@orbit-ui/react-label/src";
import { cloneElement } from "react";

function Group({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Groups({ element, ...rest }) {
    const group = cloneElement(element, rest);

    return (
        <div className="flex">
            <div className="flex flex-column items-start mr8">
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
                    <Button disabled label={<Label>6</Label>}>One</Button>
                    <Button active label={<Label>6</Label>}>Two</Button>
                    <Button label={<Label>6</Label>}>Tree</Button>
                </Group>
                <Group element={group}>
                    <Button disabled tag={<Tag className="bg-red" />}>One</Button>
                    <Button active tag={<Tag className="bg-red" />}>Two</Button>
                    <Button tag={<Tag className="bg-red" />}>Tree</Button>
                </Group>
            </div>
        </div>
    );
}

export function createSharedStories(group, stories) {
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
