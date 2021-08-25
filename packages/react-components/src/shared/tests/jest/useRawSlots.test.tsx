import { Box, BoxProps } from "@react-components/box";
import { forwardRef } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { slot, useRawSlots } from "@react-components/shared";

const Title = slot("title", forwardRef<HTMLElement, BoxProps>(({ children, ...rest }, ref) => {
    return (
        <Box
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

const Content = slot("content", forwardRef<HTMLElement, BoxProps>(({ children, ...rest }, ref) => {
    return (
        <Box
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

test("return an empty object when children is null", () => {
    const { result } = renderHook(() => useRawSlots(null, ["title"]));

    expect(result.current).toEqual({});
});

test("return an empty object when children is undefined", () => {
    const { result } = renderHook(() => useRawSlots(undefined, ["title"]));

    expect(result.current).toEqual({});
});

test("can parse a single static slot", () => {
    const title = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const children = (
        <>
            <Title>{title}</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 (\"Serial No. 8\") Starship prototype in a brief \"static fire\" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const { result } = renderHook(() => useRawSlots(children, ["title"]));

    expect(result.current.title).not.toBeUndefined();
    expect(result.current.title.props.children).toBe(title);
});

test("can parse multiple static slots", () => {
    const children = (
        <>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const { result } = renderHook(() => useRawSlots(children, ["title", "content"]));

    expect(result.current.title).not.toBeUndefined();
    expect(result.current.content).not.toBeUndefined();
});

test("can parse a dynamic slot", () => {
    const title = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const children = (
        <>
            <Box slot="title">{title}</Box>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    );

    const { result } = renderHook(() => useRawSlots(children, ["title"]));

    expect(result.current.title).not.toBeUndefined();
    expect(result.current.title.props.children).toBe(title);
});

test("return string content as \"stringValue\" key", () => {
    const content = "SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight";

    const { result } = renderHook(() => useRawSlots(content, []));

    expect(result.current.stringValue).not.toBeUndefined();
    expect(result.current.stringValue).toBe(content);
});

test("doesn't return more values than the requested amount of available slots", () => {
    const children = (
        <>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        </>
    );

    const { result } = renderHook(() => useRawSlots(children, ["title", "content"]));

    expect(Object.keys(result.current).length).toBe(1);
});
