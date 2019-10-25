import { BRANDS, COLORS_WEIGHT, getBrandColorVariableName, getPrimaryColorVariableName } from "./brands";
import { useState } from "react";

export function BrandPickerWidget() {
    const [currentBrand, setCurrentBrand] = useState(BRANDS.apricot.id);

    const applyBrand = brand => {
        const computedStyle = window.getComputedStyle(document.documentElement);

        COLORS_WEIGHT.forEach(x => {
            document.documentElement.style.setProperty(getPrimaryColorVariableName(x), computedStyle.getPropertyValue(getBrandColorVariableName(brand.id, x)));
        });
    };

    const handleSelectBrand = brand => {
        applyBrand(brand);
        setCurrentBrand(brand.id);
    };

    const values = Object.values(BRANDS);

    return (
        <ul className="flex flex-row justify-end list pl0 mb6 mt8">
            {Object.values(BRANDS).map((x, item) => {
                const spacing = item === 0 ? "ml0" : "ml2";
                const currentBrandClasses = currentBrand === x.id ? `bg-${x.id}-500 white b--${x.id}-500 hover-b--${x.id}-700` : `bg-white marine-500 b--cloud-200 hover-b--${x.id}-700`;

                return (
                    <li key={x.id} className={spacing}>
                        <span cancel onClick={() => handleSelectBrand(x)} className={`ba bw1 ${currentBrandClasses} hover-bg-${x.id}-700 hover-white pv1 ph2 fw5 br-pill pointer`}>
                            {x.displayName}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
