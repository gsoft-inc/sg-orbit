import { IconItem } from "./icon-item";

export function IconGallery({ children }) {
    return (
        <div className="flex flex-wrap">
            {children}
        </div>
    );
}

IconGallery.Item = IconItem;
