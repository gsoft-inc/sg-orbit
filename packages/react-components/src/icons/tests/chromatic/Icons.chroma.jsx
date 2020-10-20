import {
    AddIcon,
    AddIcon24,
    AddIcon32,
    ArrowIcon,
    ArrowIcon24,
    ArrowIcon32,
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
    ClearFilterIcon,
    ClearFilterIcon24,
    ClearFilterIcon32,
    CrossIcon,
    CrossIcon24,
    CrossIcon32,
    CsvIcon,
    CsvIcon24,
    CsvIcon32,
    DashIcon,
    DashIcon24,
    DashIcon32,
    DownloadIcon,
    DownloadIcon32,
    EditIcon,
    EditIcon24,
    EditIcon32,
    EmailIcon,
    EmailIcon24,
    EmailIcon32,
    EmailReminderIcon,
    EmailReminderIcon24,
    EmailReminderIcon32,
    EyeIcon,
    EyeIcon24,
    EyeIcon32,
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
    GuestAddIcon,
    GuestAddIcon24,
    GuestAddIcon32,
    GuestRemoveIcon,
    GuestRemoveIcon24,
    GuestRemoveIcon32,
    HelpIcon,
    HelpIcon24,
    HelpIcon32,
    HorizontalDotsIcon,
    HorizontalDotsIcon24,
    HorizontalDotsIcon32,
    ImageIcon,
    ImageIcon24,
    ImageIcon32,
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
    NotificationIcon,
    NotificationIcon24,
    NotificationIcon32,
    NotificationOffIcon,
    NotificationOffIcon24,
    NotificationOffIcon32,
    PdfIcon,
    PdfIcon24,
    PdfIcon32,
    PrinterIcon,
    PrinterIcon24,
    PrinterIcon32,
    PrivacyIcon,
    PrivacyIcon24,
    PrivacyIcon32,
    SignoutIcon,
    SignoutIcon24,
    SignoutIcon32,
    SortIcon,
    SortIcon24,
    SortIcon32,
    TrashIcon,
    TrashIcon24,
    TrashIcon32,
    UserAddIcon,
    UserAddIcon24,
    UserAddIcon32,
    UserRemoveIcon,
    UserRemoveIcon24,
    UserRemoveIcon32,
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
            .build())
        .build();
}

stories()
    .add("add", () => <TestSuite icon24={AddIcon24} icon32={AddIcon32} multiIcon={AddIcon} />)
    .add("arrow", () => <TestSuite icon24={ArrowIcon24} icon32={ArrowIcon32} multiIcon={ArrowIcon} />)
    .add("calendar", () => <TestSuite icon24={CalendarIcon24} icon32={CalendarIcon32} multiIcon={CalendarIcon} />)
    .add("carret", () => <TestSuite icon24={CarretIcon24} icon32={CarretIcon32} multiIcon={CarretIcon} />)
    .add("check", () => <TestSuite icon24={CheckIcon24} icon32={CheckIcon32} multiIcon={CheckIcon} />)
    .add("check circle", () => <TestSuite icon24={CheckCircleIcon24} icon32={CheckCircleIcon32} multiIcon={CheckCircleIcon} />)
    .add("chevron", () => <TestSuite icon24={ChevronIcon24} icon32={ChevronIcon32} multiIcon={ChevronIcon} />)
    .add("clear", () => <TestSuite icon24={ClearFilterIcon24} icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />)
    .add("cross", () => <TestSuite icon24={CrossIcon24} icon32={CrossIcon32} multiIcon={CrossIcon} />)
    .add("csv", () => <TestSuite icon24={CsvIcon24} icon32={CsvIcon32} multiIcon={CsvIcon} />)
    .add("dash", () => <TestSuite icon24={DashIcon24} icon32={DashIcon32} multiIcon={DashIcon} />)
    .add("download", () => <TestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />)
    .add("edit", () => <TestSuite icon24={EditIcon24} icon32={EditIcon32} multiIcon={EditIcon} />)
    .add("email", () => <TestSuite icon24={EmailIcon24} icon32={EmailIcon32} multiIcon={EmailIcon} />)
    .add("email reminder", () => <TestSuite icon24={EmailReminderIcon24} icon32={EmailReminderIcon32} multiIcon={EmailReminderIcon} />)
    .add("eye", () => <TestSuite icon24={EyeIcon24} icon32={EyeIcon32} multiIcon={EyeIcon} />)
    .add("file", () => <TestSuite icon24={FileIcon24} icon32={FileIcon32} multiIcon={FileIcon} />)
    .add("filter", () => <TestSuite icon24={FilterIcon24} icon32={FilterIcon32} multiIcon={FilterIcon} />)
    .add("flag", () => <TestSuite icon24={FlagIcon24} icon32={FlagIcon32} multiIcon={FlagIcon} />)
    .add("folder", () => <TestSuite icon24={FolderIcon24} icon32={FolderIcon32} multiIcon={FolderIcon} />)
    .add("gear", () => <TestSuite icon24={GearIcon24} icon32={GearIcon32} multiIcon={GearIcon} />)
    .add("group", () => <TestSuite icon24={GroupIcon24} icon32={GroupIcon32} multiIcon={GroupIcon} />)
    .add("guest add", () => <TestSuite icon24={GuestAddIcon24} icon32={GuestAddIcon32} multiIcon={GuestAddIcon} />)
    .add("guest remove", () => <TestSuite icon24={GuestRemoveIcon24} icon32={GuestRemoveIcon32} multiIcon={GuestRemoveIcon} />)
    .add("help", () => <TestSuite icon24={HelpIcon24} icon32={HelpIcon32} multiIcon={HelpIcon} />)
    .add("horizontal dots", () => <TestSuite icon24={HorizontalDotsIcon24} icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />)
    .add("info", () => <TestSuite icon24={InfoIcon24} icon32={InfoIcon32} multiIcon={InfoIcon} />)
    .add("lightbulb", () => <TestSuite icon24={LightbulbIcon24} icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />)
    .add("magnifier", () => <TestSuite icon24={MagnifierIcon24} icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />)
    .add("music", () => <TestSuite icon24={MusicIcon24} icon32={MusicIcon32} multiIcon={MusicIcon} />)
    .add("notification", () => <TestSuite icon24={NotificationIcon24} icon32={NotificationIcon32} multiIcon={NotificationIcon} />)
    .add("notification off", () => <TestSuite icon24={NotificationOffIcon24} icon32={NotificationOffIcon32} multiIcon={NotificationOffIcon} />)
    .add("pdf", () => <TestSuite icon24={PdfIcon24} icon32={PdfIcon32} multiIcon={PdfIcon} />)
    .add("image", () => <TestSuite icon24={ImageIcon24} icon32={ImageIcon32} multiIcon={ImageIcon} />)
    .add("printer", () => <TestSuite icon24={PrinterIcon24} icon32={PrinterIcon32} multiIcon={PrinterIcon} />)
    .add("privacy", () => <TestSuite icon24={PrivacyIcon24} icon32={PrivacyIcon32} multiIcon={PrivacyIcon} />)
    .add("signout", () => <TestSuite icon24={SignoutIcon24} icon32={SignoutIcon32} multiIcon={SignoutIcon} />)
    .add("sort", () => <TestSuite icon24={SortIcon24} icon32={SortIcon32} multiIcon={SortIcon} />)
    .add("trash", () => <TestSuite icon24={TrashIcon24} icon32={TrashIcon32} multiIcon={TrashIcon} />)
    .add("user add", () => <TestSuite icon24={UserAddIcon24} icon32={UserAddIcon32} multiIcon={UserAddIcon} />)
    .add("user remove", () => <TestSuite icon24={UserRemoveIcon24} icon32={UserRemoveIcon32} multiIcon={UserRemoveIcon} />)
    .add("vertical dots", () => <TestSuite icon24={VerticalDotsIcon24} icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />)
    .add("video", () => <TestSuite icon24={VideoIcon24} icon32={VideoIcon32} multiIcon={VideoIcon} />)
    .add("warning", () => <TestSuite icon24={WarningIcon24} icon32={WarningIcon32} multiIcon={WarningIcon} />)
    .add("zip", () => <TestSuite icon24={ZipIcon24} icon32={ZipIcon32} multiIcon={ZipIcon} />);
