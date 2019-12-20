import styles from "./icon-item.module.css";

import { Icon } from "./icon";
import { IconHeader } from "./icon-header";
import { isNil } from "lodash";

export function IconItem({ std, small, iconName }) {
    const name = iconName.split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();

    const iconNameSmall = `${iconName}24`;

    return (
        <div className={styles.iconItem}>
            <div className="pb3">{name}</div>
            <div className={styles.iconGrid}>
                <IconHeader />
                <div className="h7 w7 justify-center items-center flex relative hide-child">
                    <Choose>
                        <When condition={!isNil(small)}>
                            <Icon name={iconNameSmall} icon={small} size="small" />
                        </When>
                        <Otherwise>
                            <div className="h7 w7 flex items-center justify-center">
                                <div className="h6 w6 bg-white"></div>
                            </div>
                        </Otherwise>
                    </Choose>
                </div>
                <div className="h7 w7 justify-center items-center flex relative hide-child">
                    <Choose>
                        <When condition={!isNil(std)}>
                            <Icon name={iconName} icon={std} size="std" />
                        </When>
                        <Otherwise>
                            <div className="h7 w7 flex items-center justify-center">
                                <div className="h7 w7 bg-white"></div>
                            </div>
                        </Otherwise>
                    </Choose>
                </div>
            </div>
        </div>
    );
}
