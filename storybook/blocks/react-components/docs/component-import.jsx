import { MultiImports } from "@blocks";
import { string } from "prop-types";

const BUNDLE_LABEL = "bundle";
const STANDALONE_LABEL = "standalone";

const propTypes = {
    bundle: string.isRequired,
    standalone: string.isRequired
};

export function ComponentImport({ bundle, standalone, ...rest }) {
    return (
        <MultiImports
            versions={[
                { label: BUNDLE_LABEL, code: bundle },
                { label: STANDALONE_LABEL, code: standalone }
            ]}
            {...rest}
        />
    );
}

ComponentImport.propTypes = propTypes;
