import { BRANDS, COLORS_WEIGHT, getBrandColorVariableName, getPrimaryColorVariableName } from "./brands";
import { Link } from "@storybook/components";

export function BrandPickerWidget() {
    const applyBrand = brand => {
        const computedStyle = window.getComputedStyle(document.documentElement);

        COLORS_WEIGHT.forEach(x => {
            document.documentElement.style.setProperty(getPrimaryColorVariableName(x), computedStyle.getPropertyValue(getBrandColorVariableName(brand.id, x)));
        });
    };

    const handleSelectBrand = brand => {
        applyBrand(brand);
    };

    const params = (new URL(document.location)).searchParams;
    const isDocs = params.get("viewMode") === "docs";

    if (isDocs) {
        return null;
    }

    const values = Object.values(BRANDS);

    return (
        <ul className="flex flex-row justify-end list pl0 mb6">
            {Object.values(BRANDS).map((x, index) => {
                return (
                    [
                        <li key={x.id} className="ml2">
                            <Link cancel onClick={() => handleSelectBrand(x)}>
                                {x.displayName}
                            </Link>
                        </li>,
                        <If condition={index !== values.length - 1}>
                            <li key={`${x.id}-separator`} className="ml2">/</li>
                        </If>
                    ]
                );
            })}
        </ul>
    );
}
