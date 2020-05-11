import {
    AddIcon,
    AddIcon24,
    AddIcon32,
    AddUserIcon,
    AddUserIcon32,
    ArrowIcon,
    ArrowIcon24,
    ArrowIcon32,
    CalendarIcon,
    CalendarIcon24,
    CalendarIcon32,
    CheckIcon,
    CheckIcon24,
    CheckIcon32,
    CircleIcon,
    CircleIcon24,
    CircleIcon32,
    ClearFilterIcon,
    ClearFilterIcon24,
    ClearFilterIcon32,
    CloseIcon,
    CloseIcon24,
    CloseIcon32,
    CommunicationIcon,
    CommunicationIcon32,
    CompareIcon,
    CompareIcon24,
    CompareIcon32,
    CsvIcon,
    CsvIcon32,
    DoNotDisturbIcon,
    DoNotDisturbIcon32,
    DownloadIcon,
    DownloadIcon32,
    EditIcon,
    EditIcon32,
    FileIcon,
    FileIcon32,
    FolderIcon,
    FolderIcon32,
    GarbageIcon,
    GarbageIcon32,
    GearIcon,
    GearIcon32,
    GroupIcon,
    GroupIcon32,
    HelpIcon,
    HelpIcon24,
    HelpIcon32,
    HorizontalDotsIcon,
    HorizontalDotsIcon32,
    ImageIcon,
    ImageIcon32,
    InfoIcon,
    InfoIcon24,
    InfoIcon32,
    LightbulbIcon,
    LightbulbIcon24,
    LightbulbIcon32,
    MagnifierIcon,
    MagnifierIcon32,
    MusicIcon,
    MusicIcon32,
    NotificationIcon,
    NotificationIcon24,
    NotificationIcon32,
    PdfIcon,
    PdfIcon32,
    PrinterIcon,
    PrinterIcon24,
    PrinterIcon32,
    PrivacyIcon,
    PrivacyIcon24,
    ReminderIcon,
    ReminderIcon32,
    RemoveUserIcon,
    RemoveUserIcon32,
    SignoutIcon,
    SignoutIcon24,
    SignoutIcon32,
    SortingIcon,
    SortingIcon24,
    SortingIcon32,
    VariationIcon,
    VariationIcon24,
    VariationIcon32,
    VerticalDotsIcon,
    VerticalDotsIcon32,
    VideoIcon,
    VideoIcon32,
    WarningIcon,
    WarningIcon24,
    WarningIcon32,
    ZipIcon,
    ZipIcon32
} from "@react-components/icons";
import { IconTestSuite } from "./icon-test-suite";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Icons"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("add", () => <IconTestSuite icon24={AddIcon24} icon32={AddIcon32} multiIcon={AddIcon} />)
    .add("add user", () => <IconTestSuite icon32={AddUserIcon32} multiIcon={AddUserIcon} />)
    .add("arrow", () => <IconTestSuite icon24={ArrowIcon24} icon32={ArrowIcon32} multiIcon={ArrowIcon} />)
    .add("calendar", () => <IconTestSuite icon24={CalendarIcon24} icon32={CalendarIcon32} multiIcon={CalendarIcon} />)
    .add("check", () => <IconTestSuite icon24={CheckIcon24} icon32={CheckIcon32} multiIcon={CheckIcon} />)
    .add("circle", () => <IconTestSuite icon24={CircleIcon24} icon32={CircleIcon32} multiIcon={CircleIcon} />)
    .add("clear", () => <IconTestSuite icon24={ClearFilterIcon24} icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />)
    .add("close", () => <IconTestSuite icon24={CloseIcon24} icon32={CloseIcon32} multiIcon={CloseIcon} />)
    .add("communication", () => <IconTestSuite icon32={CommunicationIcon32} multiIcon={CommunicationIcon} />)
    .add("compare", () => <IconTestSuite icon24={CompareIcon24} icon32={CompareIcon32} multiIcon={CompareIcon} />)
    .add("csv", () => <IconTestSuite icon32={CsvIcon32} multiIcon={CsvIcon} />)
    .add("do not disturb", () => <IconTestSuite icon32={DoNotDisturbIcon32} multiIcon={DoNotDisturbIcon} />)
    .add("download", () => <IconTestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />)
    .add("edit", () => <IconTestSuite icon32={EditIcon32} multiIcon={EditIcon} />)
    .add("file", () => <IconTestSuite icon32={FileIcon32} multiIcon={FileIcon} />)
    .add("folder", () => <IconTestSuite icon32={FolderIcon32} multiIcon={FolderIcon} />)
    .add("garbage", () => <IconTestSuite icon32={GarbageIcon32} multiIcon={GarbageIcon} />)
    .add("gear", () => <IconTestSuite icon32={GearIcon32} multiIcon={GearIcon} />)
    .add("group", () => <IconTestSuite icon32={GroupIcon32} multiIcon={GroupIcon} />)
    .add("help", () => <IconTestSuite icon24={HelpIcon24} icon32={HelpIcon32} multiIcon={HelpIcon} />)
    .add("horizontal dots", () => <IconTestSuite icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />)
    .add("image", () => <IconTestSuite icon32={ImageIcon32} multiIcon={ImageIcon} />)
    .add("info", () => <IconTestSuite icon24={InfoIcon24} icon32={InfoIcon32} multiIcon={InfoIcon} />)
    .add("lightbulb", () => <IconTestSuite icon24={LightbulbIcon24} icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />)
    .add("magnifier", () => <IconTestSuite icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />)
    .add("music", () => <IconTestSuite icon32={MusicIcon32} multiIcon={MusicIcon} />)
    .add("notification", () => <IconTestSuite icon24={NotificationIcon24} icon32={NotificationIcon32} multiIcon={NotificationIcon} />)
    .add("pdf", () => <IconTestSuite icon32={PdfIcon32} multiIcon={PdfIcon} />)
    .add("printer", () => <IconTestSuite icon24={PrinterIcon24} icon32={PrinterIcon32} multiIcon={PrinterIcon} />)
    .add("privacy", () => <IconTestSuite icon24={PrivacyIcon24} multiIcon={PrivacyIcon} />)
    .add("reminder", () => <IconTestSuite icon32={ReminderIcon32} multiIcon={ReminderIcon} />)
    .add("remove user", () => <IconTestSuite icon32={RemoveUserIcon32} multiIcon={RemoveUserIcon} />)
    .add("signout", () => <IconTestSuite icon24={SignoutIcon24} icon32={SignoutIcon32} multiIcon={SignoutIcon} />)
    .add("sorting", () => <IconTestSuite icon24={SortingIcon24} icon32={SortingIcon32} multiIcon={SortingIcon} />)
    .add("variation", () => <IconTestSuite icon24={VariationIcon24} icon32={VariationIcon32} multiIcon={VariationIcon} />)
    .add("vertical dots", () => <IconTestSuite icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />)
    .add("video", () => <IconTestSuite icon32={VideoIcon32} multiIcon={VideoIcon} />)
    .add("warning", () => <IconTestSuite icon24={WarningIcon24} icon32={WarningIcon32} multiIcon={WarningIcon} />)
    .add("zip", () => <IconTestSuite icon32={ZipIcon32} multiIcon={ZipIcon} />);
