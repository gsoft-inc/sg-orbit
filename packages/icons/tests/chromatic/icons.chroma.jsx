import {
    AddIcon,
    AddUserIcon,
    ArrowIcon,
    CalendarIcon,
    CheckIcon,
    CircleIcon,
    ClearFilterIcon,
    CloseIcon,
    CommunicationIcon,
    CompareIcon,
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
    HorizontalDotsIcon,
    ImageIcon,
    InfoIcon,
    LightbulbIcon,
    MagnifierIcon,
    MusicIcon,
    NotificationIcon,
    PdfIcon,
    PrinterIcon,
    ReminderIcon,
    RemoveUserIcon,
    SignoutIcon,
    SortingIcon,
    VariationIcon,
    VerticalDotsIcon,
    VideoIcon,
    WarningIcon,
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
    .add("icon 24",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon />
                     <AddUserIcon />
                     <ArrowIcon />
                     <CalendarIcon />
                     <CheckIcon />
                     <CircleIcon />
                     <ClearFilterIcon />
                     <CloseIcon />
                     <CommunicationIcon />
                     <CompareIcon />
                     <CsvIcon />
                     <DoNotDisturbIcon />
                     <DownloadIcon />
                     <EditIcon />
                     <FileIcon />
                     <FolderIcon />
                     <GarbageIcon />
                     <GearIcon />
                     <GroupIcon />
                     <HelpIcon />
                     <HorizontalDotsIcon />
                     <ImageIcon />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon />
                     <LightbulbIcon />
                     <MagnifierIcon />
                     <MusicIcon />
                     <NotificationIcon />
                     <PdfIcon />
                     <PrinterIcon />
                     <ReminderIcon />
                     <RemoveUserIcon />
                     <SignoutIcon />
                     <SortingIcon />
                     <VariationIcon />
                     <VerticalDotsIcon />
                     <VideoIcon />
                     <WarningIcon />
                     <ZipIcon />
                 </div>
             </div>
    )
    .add("icon 32",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="large" />
                     <AddUserIcon size="large" />
                     <ArrowIcon size="large" />
                     <CalendarIcon size="large" />
                     <CheckIcon size="large" />
                     <CircleIcon size="large" />
                     <ClearFilterIcon size="large" />
                     <CloseIcon size="large" />
                     <CommunicationIcon size="large" />
                     <CompareIcon size="large" />
                     <CsvIcon size="large" />
                     <DoNotDisturbIcon size="large" />
                     <DownloadIcon size="large" />
                     <EditIcon size="large" />
                     <FileIcon size="large" />
                     <FolderIcon size="large" />
                     <GarbageIcon size="large" />
                     <GearIcon size="large" />
                     <GroupIcon size="large" />
                     <HelpIcon size="large" />
                     <HorizontalDotsIcon size="large" />
                     <ImageIcon size="large" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="large" />
                     <LightbulbIcon size="large" />
                     <MagnifierIcon size="large" />
                     <MusicIcon size="large" />
                     <NotificationIcon size="large" />
                     <PdfIcon size="large" />
                     <PrinterIcon size="large" />
                     <ReminderIcon size="large" />
                     <RemoveUserIcon size="large" />
                     <SignoutIcon size="large" />
                     <SortingIcon size="large" />
                     <VariationIcon size="large" />
                     <VerticalDotsIcon size="large" />
                     <VideoIcon size="large" />
                     <WarningIcon size="large" />
                     <ZipIcon size="large" />
                 </div>
             </div>
    );
