import {
    AddIcon,
    AddIcon24,
    AddUserIcon,
    ArrowFullIcon,
    ArrowIcon,
    ArrowIcon24,
    ArrowOutlineIcon,
    CalendarIcon,
    CalendarIcon24,
    CancelIcon,
    CheckIcon,
    CheckIcon24,
    ChevronIcon,
    CircleIcon,
    CircleIcon24,
    ClearFilterIcon,
    ClearFilterIcon24,
    CloseIcon,
    CloseIcon24,
    CommunicationIcon,
    CompareIcon,
    CompareIcon24,
    CsvIcon,
    DoNotDisturbIcon,
    DownloadIcon,
    EditIcon,
    FileIcon,
    FolderIcon,
    GarbageIcon,
    GearIcon,
    GroupIcon,
    HelpIcon,
    HelpIcon24,
    HorizontalDotsIcon,
    ImageIcon,
    InfoIcon,
    InfoIcon24,
    LightbulbIcon,
    LightbulbIcon24,
    MagnifierIcon,
    MusicIcon,
    NotificationIcon,
    NotificationIcon24,
    PdfIcon,
    PrinterIcon,
    PrinterIcon24,
    PrivacyIcon24,
    ReminderIcon,
    RemoveUserIcon,
    SignoutIcon,
    SignoutIcon24,
    SortingIcon,
    SortingIcon24,
    VariationIcon,
    VariationIcon24,
    VerticalDotsIcon,
    VideoIcon,
    WarningIcon,
    WarningIcon24,
    ZipIcon
} from "@orbit-ui/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Icons"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center">
                     <div className="mb4 flex">
                         <ChevronIcon className="h3 w3" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowFullIcon className="w2 h2" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowOutlineIcon className="w4 h4" />
                     </div>
                 </div>
                 <div className="flex flex-row items-center">
                     <div className="mb4 flex">
                         <AddIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <AddUserIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CalendarIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CheckIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CircleIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <ClearFilterIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CloseIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CommunicationIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CompareIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <CsvIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <DoNotDisturbIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <DownloadIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <EditIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <FileIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <FolderIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <GarbageIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <GearIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <GroupIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <HelpIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <HorizontalDotsIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <ImageIcon className="h7 w7" />
                     </div>
                 </div>
                 <div className="flex flex-row items-center">
                     <div className="mb4 flex">
                         <InfoIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <LightbulbIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <MagnifierIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <MusicIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <NotificationIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <PdfIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <PrinterIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <ReminderIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <RemoveUserIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <SignoutIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <SortingIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <VariationIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <VerticalDotsIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <VideoIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <WarningIcon className="h7 w7" />
                     </div>
                     <div className="mb4 flex">
                         <ZipIcon className="h7 w7" />
                     </div>
                 </div>
                 <div className="flex flex-row items-center">
                     <div className="mb4 flex">
                         <AddIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <CalendarIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <CheckIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <CircleIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <ClearFilterIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <CloseIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <CompareIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <HelpIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <InfoIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <LightbulbIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <NotificationIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <PrinterIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <PrivacyIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <SignoutIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <SortingIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <VariationIcon24 className="h6 w6" />
                     </div>
                     <div className="mb4 flex">
                         <WarningIcon24 className="h6 w6" />
                     </div>
                 </div>
             </div>
    );
