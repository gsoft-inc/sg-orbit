import { BrandPickerDocsWidget } from "../addons/brand-picker";

function getOrbitParameters({ parameters }) {
    const { orbit = {} } = parameters;

    return orbit;
}

const DEFAULT_ORBIT_PARAMS = {
    showBrandPickers: true
};

function getDocsParameters(context) {
    const { docs = DEFAULT_ORBIT_PARAMS } = getOrbitParameters(context);

    return docs;
}

export function DocsContainer({ context, children }) {
    const params = getDocsParameters(context);

    console.log(params);

    return (
        <>
            <If condition={params.showBrandPickers}>
                <BrandPickerDocsWidget />
            </If>
            {children}
        </>
    );
}
