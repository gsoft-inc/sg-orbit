import { BRANDS, COLORS_WEIGHT, getBrandColorVariableName, getPrimaryColorVariableName } from "./brands";
import { isNil } from "lodash";
import { loadSelectedBrand, saveSelectedBrand } from "./brand-storage";
import { useEffect, useState } from "react";

export function BrandPickerDocsWidget() {
    const [currentBrand, setCurrentBrand] = useState(BRANDS.apricot.id);

    useEffect(() => {
        const selectedBrandId = loadSelectedBrand();

        if (!isNil(selectedBrandId)) {
            if (selectedBrandId !== currentBrand) {
                applyBrand(selectedBrandId);
                setCurrentBrand(selectedBrandId);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const applyBrand = brandId => {
        const computedStyle = window.getComputedStyle(document.documentElement);

        COLORS_WEIGHT.forEach(x => {
            document.documentElement.style.setProperty(getPrimaryColorVariableName(x), computedStyle.getPropertyValue(getBrandColorVariableName(brandId, x)));
        });

        saveSelectedBrand(brandId);
    };

    const handleSelectBrand = brand => {
        applyBrand(brand.id);
        setCurrentBrand(brand.id);
    };

    return (
        <ul className="flex flex-row justify-end list pl0 mb7 mt8">
            {Object.values(BRANDS).map((x, item) => {
                const spacing = item === 0 ? "ml0" : "ml2";
                const currentBrandClasses = currentBrand === x.id ? `bg-${x.id}-500 white b--${x.id}-500 hover-b--${x.id}-700` : `bg-white marine-500 b--cloud-200 hover-b--${x.id}-700`;

                return (
                    <li key={x.id} className={spacing}>
                        <span onClick={() => handleSelectBrand(x)} className={`ba bw1 ${currentBrandClasses} hover-bg-${x.id}-700 hover-white pv1 ph2 fw5 br-pill pointer`}>
                            {x.displayName}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
