import { MultiImports } from "@blocks";
import { string } from "prop-types";

const BUNDLE_LABEL = "bundle";
const STANDALONE_LABEL = "standalone";

const propTypes = {
    bundle: string.isRequired,
    standalone: string.isRequired,
    language: string
};

export function ComponentImport({ bundle, standalone, language, ...rest }) {
    return (
        <MultiImports
            versions={[
                { label: BUNDLE_LABEL, code: bundle },
                { label: STANDALONE_LABEL, code: standalone }
            ]}
            language={language}
            {...rest}
        />
    );
}

ComponentImport.propTypes = propTypes;
