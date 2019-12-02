import { BrandPickerDocsWidget } from "../addons/brand-picker";
import { getParameters } from "../parameters";

export function DocsContainer({ context, children }) {
    const params = getParameters(context);

    return (
        <>
            <If condition={params.showBrandPicker}>
                <BrandPickerDocsWidget />
            </If>
            {children}
        </>
    );
}
