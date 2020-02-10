import { IconGallery } from "storybook-icon-gallery";

export function getDisplayName({ name }) {
    return name.split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();
}

export function getItemCopyValue({ name, size }) {
    if (size === 24) {
        return `${name}${size}`;
    }

    return name;
}

export function renderItem(name, Icon) {
    return (
        <IconGallery.Item name={name}>
            <Icon />
        </IconGallery.Item>
    );
}

// export function renderItem(name, Icon24, Icon32) {
//     return (
//         <IconGallery.Variants name={name}>
//             <IconGallery.Variant size={24}>
//                 {Icon24 && <Icon24 />}
//             </IconGallery.Variant>
//             <IconGallery.Variant size={32}>
//                 {Icon32 && <Icon32 />}
//             </IconGallery.Variant>
//         </IconGallery.Variants>
//     );
// }

{/* <IconGallery getDisplayName={getDisplayName} getCopyValue={getItemCopyValue}>
    {renderItem("AddIcon", AddIcon24, AddIcon32)}
    {renderItem("AddUserIcon", null, AddUserIcon32)}
    {renderItem("ArrowIcon", ArrowIcon24, ArrowIcon32)}
    {renderItem("CalendarIcon", CalendarIcon24, CalendarIcon32)}
    {renderItem("CheckIcon", CheckIcon24, CheckIcon32)}
    {renderItem("CircleIcon", CircleIcon24, CircleIcon32)}
    {renderItem("ClearFilterIcon", ClearFilterIcon24, ClearFilterIcon32)}
    {renderItem("CloseIcon", CloseIcon24, CloseIcon32)}
    {renderItem("CommunicationIcon", null, CommunicationIcon32)}
    {renderItem("CompareIcon", CompareIcon24, CompareIcon32)}
    {renderItem("CsvIcon", null, CsvIcon32)}
    {renderItem("DoNotDisturbIcon", null, DoNotDisturbIcon32)}
    {renderItem("DownloadIcon", null, DownloadIcon32)}
    {renderItem("EditIcon", null, EditIcon32)}
    {renderItem("FileIcon", null, FileIcon32)}
    {renderItem("FolderIcon", null, FolderIcon32)}
    {renderItem("GarbageIcon", null, GarbageIcon32)}
    {renderItem("GearIcon", null, GearIcon32)}
    {renderItem("GroupIcon", null, GroupIcon32)}
    {renderItem("HelpIcon", HelpIcon24, HelpIcon32)}
    {renderItem("HorizontalDotsIcon", null, HorizontalDotsIcon32)}
    {renderItem("ImageIcon", null, ImageIcon32)}
    {renderItem("InfoIcon", InfoIcon24, InfoIcon32)}
    {renderItem("LightbulbIcon", LightbulbIcon24, LightbulbIcon32)}
    {renderItem("MagnifierIcon", null, MagnifierIcon32)}
    {renderItem("MusicIcon", null, MusicIcon32)}
    {renderItem("NotificationIcon", NotificationIcon24, NotificationIcon32)}
    {renderItem("PdfIcon", null, PdfIcon32)}
    {renderItem("PrinterIcon", PrinterIcon24, PrinterIcon32)}
    {renderItem("PrivacyIcon", PrivacyIcon24, null)}
    {renderItem("ReminderIcon", null, ReminderIcon32)}
    {renderItem("RemoveUserIcon", null, RemoveUserIcon32)}
    {renderItem("SignoutIcon", SignoutIcon24, SignoutIcon32)}
    {renderItem("SortingIcon", SortingIcon24, SortingIcon32)}
    {renderItem("VariationIcon", VariationIcon24, VariationIcon32)}
    {renderItem("VerticalDotsIcon", null, VerticalDotsIcon32)}
    {renderItem("VideoIcon", null, VideoIcon32)}
    {renderItem("WarningIcon", WarningIcon24, WarningIcon32)}
    {renderItem("ZipIcon", null, ZipIcon32)}
</IconGallery> */}
