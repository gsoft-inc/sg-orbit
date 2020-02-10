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
    PrivacyIcon,
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
    .add("tiny",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="tiny" />
                     <AddUserIcon size="tiny" />
                     <ArrowIcon size="tiny" />
                     <CalendarIcon size="tiny" />
                     <CheckIcon size="tiny" />
                     <CircleIcon size="tiny" />
                     <ClearFilterIcon size="tiny" />
                     <CloseIcon size="tiny" />
                     <CommunicationIcon size="tiny" />
                     <CompareIcon size="tiny" />
                     <CsvIcon size="tiny" />
                     <DoNotDisturbIcon size="tiny" />
                     <DownloadIcon size="tiny" />
                     <EditIcon size="tiny" />
                     <FileIcon size="tiny" />
                     <FolderIcon size="tiny" />
                     <GarbageIcon size="tiny" />
                     <GearIcon size="tiny" />
                     <GroupIcon size="tiny" />
                     <HelpIcon size="tiny" />
                     <HorizontalDotsIcon size="tiny" />
                     <ImageIcon size="tiny" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="tiny" />
                     <LightbulbIcon size="tiny" />
                     <MagnifierIcon size="tiny" />
                     <MusicIcon size="tiny" />
                     <NotificationIcon size="tiny" />
                     <PdfIcon size="tiny" />
                     <PrinterIcon size="tiny" />
                     <PrivacyIcon size="tiny" />
                     <ReminderIcon size="tiny" />
                     <RemoveUserIcon size="tiny" />
                     <SignoutIcon size="tiny" />
                     <SortingIcon size="tiny" />
                     <VariationIcon size="tiny" />
                     <VerticalDotsIcon size="tiny" />
                     <VideoIcon size="tiny" />
                     <WarningIcon size="tiny" />
                     <ZipIcon size="tiny" />
                 </div>
             </div>
    )
    .add("small",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="small" />
                     <AddUserIcon size="small" />
                     <ArrowIcon size="small" />
                     <CalendarIcon size="small" />
                     <CheckIcon size="small" />
                     <CircleIcon size="small" />
                     <ClearFilterIcon size="small" />
                     <CloseIcon size="small" />
                     <CommunicationIcon size="small" />
                     <CompareIcon size="small" />
                     <CsvIcon size="small" />
                     <DoNotDisturbIcon size="small" />
                     <DownloadIcon size="small" />
                     <EditIcon size="small" />
                     <FileIcon size="small" />
                     <FolderIcon size="small" />
                     <GarbageIcon size="small" />
                     <GearIcon size="small" />
                     <GroupIcon size="small" />
                     <HelpIcon size="small" />
                     <HorizontalDotsIcon size="small" />
                     <ImageIcon size="small" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="small" />
                     <LightbulbIcon size="small" />
                     <MagnifierIcon size="small" />
                     <MusicIcon size="small" />
                     <NotificationIcon size="small" />
                     <PdfIcon size="small" />
                     <PrinterIcon size="small" />
                     <PrivacyIcon size="small" />
                     <ReminderIcon size="small" />
                     <RemoveUserIcon size="small" />
                     <SignoutIcon size="small" />
                     <SortingIcon size="small" />
                     <VariationIcon size="small" />
                     <VerticalDotsIcon size="small" />
                     <VideoIcon size="small" />
                     <WarningIcon size="small" />
                     <ZipIcon size="small" />
                 </div>
             </div>
    )
    .add("medium",
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
                     <PrivacyIcon />
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
    .add("large",
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
                     <PrivacyIcon size="large" />
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
    )
    .add("big",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="big" />
                     <AddUserIcon size="big" />
                     <ArrowIcon size="big" />
                     <CalendarIcon size="big" />
                     <CheckIcon size="big" />
                     <CircleIcon size="big" />
                     <ClearFilterIcon size="big" />
                     <CloseIcon size="big" />
                     <CommunicationIcon size="big" />
                     <CompareIcon size="big" />
                     <CsvIcon size="big" />
                     <DoNotDisturbIcon size="big" />
                     <DownloadIcon size="big" />
                     <EditIcon size="big" />
                     <FileIcon size="big" />
                     <FolderIcon size="big" />
                     <GarbageIcon size="big" />
                     <GearIcon size="big" />
                     <GroupIcon size="big" />
                     <HelpIcon size="big" />
                     <HorizontalDotsIcon size="big" />
                     <ImageIcon size="big" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="big" />
                     <LightbulbIcon size="big" />
                     <MagnifierIcon size="big" />
                     <MusicIcon size="big" />
                     <NotificationIcon size="big" />
                     <PdfIcon size="big" />
                     <PrinterIcon size="big" />
                     <PrivacyIcon size="big" />
                     <ReminderIcon size="big" />
                     <RemoveUserIcon size="big" />
                     <SignoutIcon size="big" />
                     <SortingIcon size="big" />
                     <VariationIcon size="big" />
                     <VerticalDotsIcon size="big" />
                     <VideoIcon size="big" />
                     <WarningIcon size="big" />
                     <ZipIcon size="big" />
                 </div>
             </div>
    )
    .add("huge",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="huge" />
                     <AddUserIcon size="huge" />
                     <ArrowIcon size="huge" />
                     <CalendarIcon size="huge" />
                     <CheckIcon size="huge" />
                     <CircleIcon size="huge" />
                     <ClearFilterIcon size="huge" />
                     <CloseIcon size="huge" />
                     <CommunicationIcon size="huge" />
                     <CompareIcon size="huge" />
                     <CsvIcon size="huge" />
                     <DoNotDisturbIcon size="huge" />
                     <DownloadIcon size="huge" />
                     <EditIcon size="huge" />
                     <FileIcon size="huge" />
                     <FolderIcon size="huge" />
                     <GarbageIcon size="huge" />
                     <GearIcon size="huge" />
                     <GroupIcon size="huge" />
                     <HelpIcon size="huge" />
                     <HorizontalDotsIcon size="huge" />
                     <ImageIcon size="huge" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="huge" />
                     <LightbulbIcon size="huge" />
                     <MagnifierIcon size="huge" />
                     <MusicIcon size="huge" />
                     <NotificationIcon size="huge" />
                     <PdfIcon size="huge" />
                     <PrinterIcon size="huge" />
                     <PrivacyIcon size="huge" />
                     <ReminderIcon size="huge" />
                     <RemoveUserIcon size="huge" />
                     <SignoutIcon size="huge" />
                     <SortingIcon size="huge" />
                     <VariationIcon size="huge" />
                     <VerticalDotsIcon size="huge" />
                     <VideoIcon size="huge" />
                     <WarningIcon size="huge" />
                     <ZipIcon size="huge" />
                 </div>
             </div>
    )
    .add("massive",
         () =>
             <div className="flex flex-column">
                 <div className="flex flex-row items-center mb4">
                     <AddIcon size="massive" />
                     <AddUserIcon size="massive" />
                     <ArrowIcon size="massive" />
                     <CalendarIcon size="massive" />
                     <CheckIcon size="massive" />
                     <CircleIcon size="massive" />
                     <ClearFilterIcon size="massive" />
                     <CloseIcon size="massive" />
                     <CommunicationIcon size="massive" />
                     <CompareIcon size="massive" />
                     <CsvIcon size="massive" />
                     <DoNotDisturbIcon size="massive" />
                     <DownloadIcon size="massive" />
                     <EditIcon size="massive" />
                     <FileIcon size="massive" />
                     <FolderIcon size="massive" />
                     <GarbageIcon size="massive" />
                     <GearIcon size="massive" />
                     <GroupIcon size="massive" />
                     <HelpIcon size="massive" />
                     <HorizontalDotsIcon size="massive" />
                     <ImageIcon size="massive" />
                 </div>
                 <div className="flex flex-row items-center mb4">
                     <InfoIcon size="massive" />
                     <LightbulbIcon size="massive" />
                     <MagnifierIcon size="massive" />
                     <MusicIcon size="massive" />
                     <NotificationIcon size="massive" />
                     <PdfIcon size="massive" />
                     <PrinterIcon size="massive" />
                     <PrivacyIcon size="massive" />
                     <ReminderIcon size="massive" />
                     <RemoveUserIcon size="massive" />
                     <SignoutIcon size="massive" />
                     <SortingIcon size="massive" />
                     <VariationIcon size="massive" />
                     <VerticalDotsIcon size="massive" />
                     <VideoIcon size="massive" />
                     <WarningIcon size="massive" />
                     <ZipIcon size="massive" />
                 </div>
             </div>
    );
