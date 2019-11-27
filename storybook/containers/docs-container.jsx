import { BrandPickerDocsWidget } from "../addons/brand-picker";

export function DocsContainer({ children }) {
    return (
        <>
            <BrandPickerDocsWidget />
            {children}
        </>
    );
}
