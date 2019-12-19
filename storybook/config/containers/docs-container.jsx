import { BrandPickerDocsWidget } from "../addons/brand-picker";
import { getParametersFromContext } from "../../utils/parameters";

export function DocsContainer({ context, children }) {
    const { showBrandPicker } = getParametersFromContext(context);

    return (
        <>
            <If condition={showBrandPicker}>
                <BrandPickerDocsWidget />
            </If>
            {children}
        </>
    );
}
