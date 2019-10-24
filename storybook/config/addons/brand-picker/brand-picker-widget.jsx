import { BRANDS, COLORS_WEIGHT, getBrandColorVariableName, getPrimaryColorVariableName } from "./brands";

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

    const values = Object.values(BRANDS);

    return (
        <ul className="flex flex-row justify-end list pl0 mb4 mt8">
            {Object.values(BRANDS).map((x, item) => {
                const spacing = item === 0 ? "ml0" : "ml2";

                return (
                    [
                        <li key={x.id} className={spacing}>
                            <span cancel onClick={() => handleSelectBrand(x)} className={`bg-${x.id}-500 hover-bg-${x.id}-700 pv1 ph2 white br-pill pointer`}>
                                {x.displayName}
                            </span>
                        </li>
                    ]
                );
            })}
        </ul>
    );
}
