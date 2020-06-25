import {
    AddGuestIcon,
    AddGuestIcon24,
    AddGuestIcon32,
    AddIcon,
    AddIcon24,
    AddIcon32,
    AddUserIcon,
    AddUserIcon24,
    AddUserIcon32,
    ArrowIcon,
    ArrowIcon24,
    ArrowIcon32,
    BellIcon,
    BellIcon24,
    BellIcon32,
    CalendarIcon,
    CalendarIcon24,
    CalendarIcon32,
    CarretIcon,
    CarretIcon24,
    CarretIcon32,
    CheckCircleIcon,
    CheckCircleIcon24,
    CheckCircleIcon32,
    CheckIcon,
    CheckIcon24,
    CheckIcon32,
    ChevronIcon,
    ChevronIcon24,
    ChevronIcon32,
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
    CommunicationIcon24,
    CommunicationIcon32,
    CsvIcon,
    CsvIcon24,
    CsvIcon32,
    DashIcon,
    DashIcon24,
    DashIcon32,
    DoNotDisturbIcon,
    DoNotDisturbIcon24,
    DoNotDisturbIcon32,
    DownloadIcon,
    DownloadIcon32,
    EditIcon,
    EditIcon24,
    EditIcon32,
    FileIcon,
    FileIcon24,
    FileIcon32,
    FilterIcon,
    FilterIcon24,
    FilterIcon32,
    FlagIcon,
    FlagIcon24,
    FlagIcon32,
    FolderIcon,
    FolderIcon24,
    FolderIcon32,
    GearIcon,
    GearIcon24,
    GearIcon32,
    GroupIcon,
    GroupIcon24,
    GroupIcon32,
    HelpIcon,
    HelpIcon24,
    HelpIcon32,
    HorizontalDotsIcon,
    HorizontalDotsIcon24,
    HorizontalDotsIcon32,
    InfoIcon,
    InfoIcon24,
    InfoIcon32,
    LightbulbIcon,
    LightbulbIcon24,
    LightbulbIcon32,
    MagnifierIcon,
    MagnifierIcon24,
    MagnifierIcon32,
    MusicIcon,
    MusicIcon24,
    MusicIcon32,
    PdfIcon,
    PdfIcon24,
    PdfIcon32,
    PictureIcon,
    PictureIcon24,
    PictureIcon32,
    PrinterIcon,
    PrinterIcon24,
    PrinterIcon32,
    PrivacyIcon,
    PrivacyIcon24,
    ReminderIcon,
    ReminderIcon24,
    ReminderIcon32,
    RemoveGuestIcon,
    RemoveGuestIcon24,
    RemoveGuestIcon32,
    RemoveUserIcon,
    RemoveUserIcon24,
    RemoveUserIcon32,
    SignoutIcon,
    SignoutIcon24,
    SignoutIcon32,
    SortIcon,
    SortIcon24,
    SortIcon32,
    TrashIcon,
    TrashIcon24,
    TrashIcon32,
    UpDownIcon,
    UpDownIcon24,
    UpDownIcon32,
    VerticalDotsIcon,
    VerticalDotsIcon24,
    VerticalDotsIcon32,
    VideoIcon,
    VideoIcon24,
    VideoIcon32,
    WarningIcon,
    WarningIcon24,
    WarningIcon32,
    ZipIcon,
    ZipIcon24,
    ZipIcon32
} from "@react-components/icons";
import { TestSuite } from "./TestSuite";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Icons"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("add", () => <TestSuite icon24={AddIcon24} icon32={AddIcon32} multiIcon={AddIcon} />)
    .add("add user", () => <TestSuite icon24={AddUserIcon24} icon32={AddUserIcon32} multiIcon={AddUserIcon} />)
    .add("add guest", () => <TestSuite icon24={AddGuestIcon24} icon32={AddGuestIcon32} multiIcon={AddGuestIcon} />)
    .add("arrow", () => <TestSuite icon24={ArrowIcon24} icon32={ArrowIcon32} multiIcon={ArrowIcon} />)
    .add("bell", () => <TestSuite icon24={BellIcon24} icon32={BellIcon32} multiIcon={BellIcon} />)
    .add("calendar", () => <TestSuite icon24={CalendarIcon24} icon32={CalendarIcon32} multiIcon={CalendarIcon} />)
    .add("check", () => <TestSuite icon24={CheckIcon24} icon32={CheckIcon32} multiIcon={CheckIcon} />)
    .add("check circle", () => <TestSuite icon24={CheckCircleIcon24} icon32={CheckCircleIcon32} multiIcon={CheckCircleIcon} />)
    .add("chevron", () => <TestSuite icon24={ChevronIcon24} icon32={ChevronIcon32} multiIcon={ChevronIcon} />)
    .add("circle", () => <TestSuite icon24={CircleIcon24} icon32={CircleIcon32} multiIcon={CircleIcon} />)
    .add("clear", () => <TestSuite icon24={ClearFilterIcon24} icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />)
    .add("close", () => <TestSuite icon24={CloseIcon24} icon32={CloseIcon32} multiIcon={CloseIcon} />)
    .add("communication", () => <TestSuite icon24={CommunicationIcon24} icon32={CommunicationIcon32} multiIcon={CommunicationIcon} />)
    .add("csv", () => <TestSuite icon24={CsvIcon24} icon32={CsvIcon32} multiIcon={CsvIcon} />)
    .add("dash", () => <TestSuite icon24={DashIcon24} icon32={DashIcon32} multiIcon={DashIcon} />)
    .add("do not disturb", () => <TestSuite icon24={DoNotDisturbIcon24} icon32={DoNotDisturbIcon32} multiIcon={DoNotDisturbIcon} />)
    .add("download", () => <TestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />)
    .add("edit", () => <TestSuite icon24={EditIcon24} icon32={EditIcon32} multiIcon={EditIcon} />)
    .add("file", () => <TestSuite icon24={FileIcon24} icon32={FileIcon32} multiIcon={FileIcon} />)
    .add("filter", () => <TestSuite icon24={FilterIcon24} icon32={FilterIcon32} multiIcon={FilterIcon} />)
    .add("flag", () => <TestSuite icon24={FlagIcon24} icon32={FlagIcon32} multiIcon={FlagIcon} />)
    .add("folder", () => <TestSuite icon24={FolderIcon24} icon32={FolderIcon32} multiIcon={FolderIcon} />)
    .add("gear", () => <TestSuite icon24={GearIcon24} icon32={GearIcon32} multiIcon={GearIcon} />)
    .add("group", () => <TestSuite icon24={GroupIcon24} icon32={GroupIcon32} multiIcon={GroupIcon} />)
    .add("help", () => <TestSuite icon24={HelpIcon24} icon32={HelpIcon32} multiIcon={HelpIcon} />)
    .add("horizontal dots", () => <TestSuite icon24={HorizontalDotsIcon24} icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />)
    .add("info", () => <TestSuite icon24={InfoIcon24} icon32={InfoIcon32} multiIcon={InfoIcon} />)
    .add("lightbulb", () => <TestSuite icon24={LightbulbIcon24} icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />)
    .add("magnifier", () => <TestSuite icon24={MagnifierIcon24} icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />)
    .add("music", () => <TestSuite icon24={MusicIcon24} icon32={MusicIcon32} multiIcon={MusicIcon} />)
    .add("pdf", () => <TestSuite icon24={PdfIcon24} icon32={PdfIcon32} multiIcon={PdfIcon} />)
    .add("picture", () => <TestSuite icon24={PictureIcon24} icon32={PictureIcon32} multiIcon={PictureIcon} />)
    .add("printer", () => <TestSuite icon24={PrinterIcon24} icon32={PrinterIcon32} multiIcon={PrinterIcon} />)
    .add("privacy", () => <TestSuite icon24={PrivacyIcon24} multiIcon={PrivacyIcon} />)
    .add("reminder", () => <TestSuite icon24={ReminderIcon24} icon32={ReminderIcon32} multiIcon={ReminderIcon} />)
    .add("remove guest", () => <TestSuite icon24={RemoveGuestIcon24} icon32={RemoveGuestIcon32} multiIcon={RemoveGuestIcon} />)
    .add("remove user", () => <TestSuite icon24={RemoveUserIcon24} icon32={RemoveUserIcon32} multiIcon={RemoveUserIcon} />)
    .add("signout", () => <TestSuite icon24={SignoutIcon24} icon32={SignoutIcon32} multiIcon={SignoutIcon} />)
    .add("sort", () => <TestSuite icon24={SortIcon24} icon32={SortIcon32} multiIcon={SortIcon} />)
    .add("trash", () => <TestSuite icon24={TrashIcon24} icon32={TrashIcon32} multiIcon={TrashIcon} />)
    .add("up down", () => <TestSuite icon24={UpDownIcon24} icon32={UpDownIcon32} multiIcon={UpDownIcon} />)
    .add("carret", () => <TestSuite icon24={CarretIcon24} icon32={CarretIcon32} multiIcon={CarretIcon} />)
    .add("vertical dots", () => <TestSuite icon24={VerticalDotsIcon24} icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />)
    .add("video", () => <TestSuite icon24={VideoIcon24} icon32={VideoIcon32} multiIcon={VideoIcon} />)
    .add("warning", () => <TestSuite icon24={WarningIcon24} icon32={WarningIcon32} multiIcon={WarningIcon} />)
    .add("zip", () => <TestSuite icon24={ZipIcon24} icon32={ZipIcon32} multiIcon={ZipIcon} />);
