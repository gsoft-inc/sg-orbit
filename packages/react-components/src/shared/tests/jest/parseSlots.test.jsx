import { Box } from "@react-components/box";
import { forwardRef } from "react";
import { parseSlots, slot } from "@react-components/shared";

const Title = slot("title", forwardRef(({ children, ...rest }, ref) => {
    return (
        <Box
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

const Content = slot("content", forwardRef(({ children, ...rest }, ref) => {
    return (
        <Box
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

test("return an empty object when children is null or undefined", () => {
    expect(parseSlots(null, ["title"])).toEqual({});
    expect(parseSlots(undefined, ["title"])).toEqual({});
});

test("can parse a single static slot", () => {
    const title = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const children = (
        <>
            <Title>{title}</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 (\"Serial No. 8\") Starship prototype in a brief \"static fire\" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const slots = parseSlots(children, ["title"]);

    expect(slots.title).not.toBeUndefined();
    expect(slots.title.props.children).toBe(title);
});

test("can parse multiple static slots", () => {
    const children = (
        <>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const slots = parseSlots(children, ["title", "content"]);

    expect(slots.title).not.toBeUndefined();
    expect(slots.content).not.toBeUndefined();
});

test("can parse a dynamic slot", () => {
    const title = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const children = (
        <>
            <Box slot="title">{title}</Box>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const slots = parseSlots(children, ["title"]);

    expect(slots.title).not.toBeUndefined();
    expect(slots.title.props.children).toBe(title);
});

test("return string content as \"stringValue\" key", () => {
    const content = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const slots = parseSlots(content, []);

    expect(slots.stringValue).not.toBeUndefined();
    expect(slots.stringValue).toBe(content);
});

test("doesn't return more values than the requested amount of available slots", () => {
    const children = (
        <>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        </>
    );

    const slots = parseSlots(children, ["title", "content"]);

    expect(Object.keys(slots).length).toBe(1);
});
