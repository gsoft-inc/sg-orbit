import { Icon, IconHeader } from "./";
import { isNil } from "lodash";
import styles from "./icon-item.module.css";

export function IconItem({ stdSize, smllSize, iconName }) {
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
                <div className="h7 w7 ba b--dotted justify-center items-center flex relative hide-child">
                    <Choose>
                        <When condition={!isNil(smllSize)}>
                            <Icon name={iconNameSmall} icon={smllSize} size="small" />
                        </When>
                        <Otherwise>
                            <div className="h7 w7 flex items-center justify-center">
                                <div className="h6 w6 bg-cloud-100"></div>
                            </div>
                        </Otherwise>
                    </Choose>
                </div>
                <div className="h7 w7 ba b--dotted justify-center items-center flex relative hide-child">
                    <Choose>
                        <When condition={!isNil(stdSize)}>
                            <Icon name={iconName} icon={stdSize} size="std" />
                        </When>
                        <Otherwise>
                            <div className="h7 w7 flex items-center justify-center">
                                <div className="h7 w7 bg-cloud-100"></div>
                            </div>
                        </Otherwise>
                    </Choose>
                </div>
            </div>
        </div>
    );
}
