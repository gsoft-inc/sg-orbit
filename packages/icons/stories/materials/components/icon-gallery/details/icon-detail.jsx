import { MultiVariant } from "./multi-variant";
import { Variants } from "./variants";
import { any, string } from "prop-types";

export function IconDetail({ iconDisplayName, multiVariant, variants }) {
    return (
        <>
            <MultiVariant {...multiVariant} />
            <Variants iconDisplayName={iconDisplayName} variants={variants} />
        </>
    );
}

IconDetail.propTypes = {
    iconDisplayName: string.isRequired,
    multiVariant: any.isRequired,
    variants: any.isRequired
};
