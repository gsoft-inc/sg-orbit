import styles from "./icon-detail.module.css";

import { MultiVariant } from "./multi-variant";
import { Variants } from "./variants";
import { any } from "prop-types";

export function IconDetail({ multiVariant }) {
    return (
        <>
            <MultiVariant {...multiVariant} />
            <Variants />
        </>
    );
}

IconDetail.propTypes = {
    multiVariant: any.isRequired
};
