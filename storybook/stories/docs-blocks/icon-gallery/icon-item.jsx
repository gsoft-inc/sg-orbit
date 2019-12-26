import styles from "./icon-item.module.css";

import { Icon } from "./icon";
import { VARIANT_SHAPE } from "./variants";
import { arrayOf, element, elementType, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";

// Have a default getCopyValue that will provide the component name as the copy name
// Support component definition and component instance
// Icon placeholder should have the width and height of the larger variant

function ensureIconsAndVariantsMatch(icons, variants, iconName) {
    if (!isNil(variants)) {
        if (icons.length !== variants.length) {
            throw new Error(`IconGalleryBlock - The icon gallery have been configured to render ${variants.length} variants but ${icons.length} have been provided for icon ${iconName}`);
        }
    }
}

function renderIcon(name, icon, variant) {
    if (!isNil(icon)) {
        return <Icon name={name} icon={icon} cssClasses={variant.cssClasses} getCopyValue={variant.getCopyValue} key={`icon-${name}-${variant.size}`} />;
    }
}

export function IconItem({ name, icons, variants }) {
    // const name = iconName.split(/(?=[A-Z])/)
    //     .filter(x => x !== "Icon")
    //     .join(" ")
    //     .toLowerCase();

    // const iconNameSmall = `${iconName}24`;

    ensureIconsAndVariantsMatch(icons, variants);

    return (
        <div className={`${styles.iconItem} sbdocs sbdocs-ig-icon-item`}>
            <div className={`${styles.iconName} sbdocs sbdocs-ig-icon-name`}>{name}</div>
            <div className={`${styles.iconGrid} sbdocs sbdocs-ig-icon-grid`}>
                {variants.map(v => {
                    return (
                        <div className={`${styles.iconHeader} sbdocs sbdocs-ig-icon-header`} key={`header-${name}-${v.size}`}>
                            <span>{v.size}</span>
                        </div>
                    );
                })}
                {variants.map((v, i) => {
                    return renderIcon(name, icons[i], v);
                })}
            </div>
        </div>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    icons: arrayOf(oneOfType([element, elementType])).isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};
