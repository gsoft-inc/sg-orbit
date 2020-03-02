import { AzureIcon32, FilterIcon24, FilterIcon32 } from "./assets";
import { Icon, MultiVariantIcon } from "@orbit-ui/react-icons/src";
import { MEDIUM } from "@orbit-ui/react-components-shared";
import { cloneElement } from "react";
import { createIconForControl } from "../../src/factories";
import { isElement } from "react-is";

test("throw when is not a known wrapper", () => {
    function MyWrapper() {
        return "Hello world!";
    }

    expect(() => createIconForControl(<MyWrapper />, MEDIUM)).toThrowError(/Unknown icon wrapper/);
});

test("support Icon", () => {
    const icon = createIconForControl(<Icon type={AzureIcon32} />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});

test("support MultiVariantIcon", () => {
    const icon = createIconForControl(<MultiVariantIcon type24={FilterIcon24} type32={FilterIcon32} />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});

test("support Icon.create", () => {
    const HocIcon = Icon.create(AzureIcon32);
    const icon = createIconForControl(<HocIcon />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});

test("support MultiVariantIcon.create", () => {
    const HocIcon = MultiVariantIcon.create(FilterIcon24, FilterIcon32);
    const icon = createIconForControl(<HocIcon />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});

test("support composition", () => {
    function MyWrapper(props) {
        return <Icon type={AzureIcon32} {...props} />;
    }

    const icon = createIconForControl(<MyWrapper />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});

test("support createElement", () => {
    function MyWrapper({ icon }) {
        return cloneElement(icon, {});
    }

    const icon = createIconForControl(<MyWrapper icon={<Icon type={AzureIcon32} />} />, MEDIUM);

    expect(isElement(icon)).toBeTruthy();
});
