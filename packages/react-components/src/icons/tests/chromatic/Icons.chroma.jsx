import {
    AddGuestIcon,
    AddGuestIcon32,
    AddIcon,
    AddIcon32,
    AddUserIcon,
    AddUserIcon32,
    ArrowDownIcon,
    ArrowDownIcon32,
    ArrowDownLeftIcon,
    ArrowDownLeftIcon32,
    ArrowDownRightIcon,
    ArrowDownRightIcon32,
    ArrowIcon,
    ArrowIcon32,
    ArrowLeftIcon,
    ArrowLeftIcon32,
    ArrowLineUpIcon,
    ArrowLineUpIcon32,
    ArrowRightIcon,
    ArrowRightIcon32,
    ArrowUpIcon,
    ArrowUpIcon32,
    ArrowUpLeftIcon,
    ArrowUpLeftIcon32,
    ArrowUpRightIcon,
    ArrowUpRightIcon32,
    ArrowsUpDownIcon,
    ArrowsUpDownIcon32,
    CalendarIcon,
    CalendarIcon32,
    CalendarPresetIcon,
    CalendarPresetIcon32,
    CaretDownIcon,
    CaretDownIcon32,
    CaretIcon,
    CaretIcon32,
    CaretLeftIcon,
    CaretLeftIcon32,
    CaretRightIcon,
    CaretRightIcon32,
    CaretUpDownIcon,
    CaretUpDownIcon32,
    CaretUpIcon,
    CaretUpIcon32,
    CheckCircleIcon,
    CheckCircleIcon32,
    CheckmarkFillIcon,
    CheckmarkFillIcon32,
    CheckmarkIcon,
    CheckmarkIcon32,
    ChevronDownIcon,
    ChevronDownIcon32,
    ChevronIcon,
    ChevronIcon32,
    ChevronLeftIcon,
    ChevronLeftIcon32,
    ChevronRightIcon,
    ChevronRightIcon32,
    ChevronUpDownIcon,
    ChevronUpDownIcon32,
    ChevronUpIcon,
    ChevronUpIcon32,
    ClearFilterIcon,
    ClearFilterIcon32,
    CloseIcon,
    CloseIcon32,
    CrossIcon,
    CrossIcon32,
    CsvFileIcon,
    CsvFileIcon32,
    DeleteLinkIcon,
    DeleteLinkIcon32,
    DoNotDisturbIcon,
    DoNotDisturbIcon32,
    DownloadIcon,
    DownloadIcon32,
    EditIcon,
    EditIcon32,
    FileIcon,
    FileIcon32,
    FilterIcon,
    FilterIcon32,
    FlagIcon,
    FlagIcon32,
    FolderIcon,
    FolderIcon32,
    GearIcon,
    GearIcon32,
    GroupIcon,
    GroupIcon32,
    GroupSettingIcon,
    GroupSettingIcon32,
    GuestIcon,
    GuestIcon32,
    HelpIcon,
    HelpIcon32,
    HorizontalDotsIcon,
    HorizontalDotsIcon32,
    InfoIcon,
    InfoIcon32,
    KeyIcon,
    KeyIcon32,
    LightbulbIcon,
    LightbulbIcon32,
    LinkIcon,
    LinkIcon32,
    MagnifierIcon,
    MagnifierIcon32,
    MailIcon,
    MailIcon32,
    MusicFileIcon,
    MusicFileIcon32,
    NotificationIcon,
    NotificationIcon32,
    PdfFileIcon,
    PdfFileIcon32,
    PictureIcon,
    PictureIcon32,
    PrinterIcon,
    PrinterIcon32,
    PrivacyIcon,
    PrivacyIcon32,
    PrivateGroupIcon,
    PrivateGroupIcon32,
    PublicGroupIcon,
    PublicGroupIcon32,
    RemoveGuestIcon,
    RemoveGuestIcon32,
    RemoveUserIcon,
    RemoveUserIcon32,
    SecurityIcon,
    SecurityIcon32,
    SettingsIcon,
    SettingsIcon32,
    ShareIcon,
    ShareIcon32,
    SigninIcon,
    SigninIcon32,
    SignoutIcon,
    SignoutIcon32,
    TrashboxIcon,
    TrashboxIcon32,
    UploadIcon,
    UploadIcon32,
    UserIcon,
    UserIcon32,
    VerticalDotsIcon,
    VerticalDotsIcon32,
    VideoFileIcon,
    VideoFileIcon32,
    ViewIcon,
    ViewIcon32,
    WarningIcon,
    WarningIcon32
} from "@react-components/icons";
import { TestSuite } from "./TestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Icons")
        .segment(segment)
        .build();
}

stories()
    .add("add", () => <TestSuite icon32={AddIcon32} multiIcon={AddIcon} />)
    .add("addUser", () => <TestSuite icon32={AddUserIcon32} multiIcon={AddUserIcon} />)
    .add("addGuest", () => <TestSuite icon32={AddGuestIcon32} multiIcon={AddGuestIcon} />)
    .add("arrow", () => <TestSuite icon32={ArrowIcon32} multiIcon={ArrowIcon} />)
    .add("arrowDown", () => <TestSuite icon32={ArrowDownIcon32} multiIcon={ArrowDownIcon} />)
    .add("arrowDownLeft", () => <TestSuite icon32={ArrowDownLeftIcon32} multiIcon={ArrowDownLeftIcon} />)
    .add("arrowDownRight", () => <TestSuite icon32={ArrowDownRightIcon32} multiIcon={ArrowDownRightIcon} />)
    .add("arrowUpLeft", () => <TestSuite icon32={ArrowUpLeftIcon32} multiIcon={ArrowUpLeftIcon} />)
    .add("arrowUpRight", () => <TestSuite icon32={ArrowUpRightIcon32} multiIcon={ArrowUpRightIcon} />)
    .add("arrowLeft", () => <TestSuite icon32={ArrowLeftIcon32} multiIcon={ArrowLeftIcon} />)
    .add("arrowLineUp", () => <TestSuite icon32={ArrowLineUpIcon32} multiIcon={ArrowLineUpIcon} />)
    .add("arrowRight", () => <TestSuite icon32={ArrowRightIcon32} multiIcon={ArrowRightIcon} />)
    .add("arrowUp", () => <TestSuite icon32={ArrowUpIcon32} multiIcon={ArrowUpIcon} />)
    .add("arrowsUpDown", () => <TestSuite icon32={ArrowsUpDownIcon32} multiIcon={ArrowsUpDownIcon} />)
    .add("calendar", () => <TestSuite icon32={CalendarIcon32} multiIcon={CalendarIcon} />)
    .add("calendarPreset", () => <TestSuite icon32={CalendarPresetIcon32} multiIcon={CalendarPresetIcon} />)
    .add("caret", () => <TestSuite icon32={CaretIcon32} multiIcon={CaretIcon} />)
    .add("caretLeft", () => <TestSuite icon32={CaretLeftIcon32} multiIcon={CaretLeftIcon} />)
    .add("caretRight", () => <TestSuite icon32={CaretRightIcon32} multiIcon={CaretRightIcon} />)
    .add("caretDown", () => <TestSuite icon32={CaretDownIcon32} multiIcon={CaretDownIcon} />)
    .add("caretUp", () => <TestSuite icon32={CaretUpIcon32} multiIcon={CaretUpIcon} />)
    .add("caretUpDown", () => <TestSuite icon32={CaretUpDownIcon32} multiIcon={CaretUpDownIcon} />)
    .add("checkCircle", () => <TestSuite icon32={CheckCircleIcon32} multiIcon={CheckCircleIcon} />)
    .add("checkmark", () => <TestSuite icon32={CheckmarkIcon32} multiIcon={CheckmarkIcon} />)
    .add("checkmarkFill", () => <TestSuite icon32={CheckmarkFillIcon32} multiIcon={CheckmarkFillIcon} />)
    .add("chevron", () => <TestSuite icon32={ChevronIcon32} multiIcon={ChevronIcon} />)
    .add("chevronUp", () => <TestSuite icon32={ChevronUpIcon32} multiIcon={ChevronUpIcon} />)
    .add("chevronUpDown", () => <TestSuite icon32={ChevronUpDownIcon32} multiIcon={ChevronUpDownIcon} />)
    .add("chevronDown", () => <TestSuite icon32={ChevronDownIcon32} multiIcon={ChevronDownIcon} />)
    .add("chevronLeft", () => <TestSuite icon32={ChevronLeftIcon32} multiIcon={ChevronLeftIcon} />)
    .add("chevronRight", () => <TestSuite icon32={ChevronRightIcon32} multiIcon={ChevronRightIcon} />)
    .add("clearFilter", () => <TestSuite icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />)
    .add("close", () => <TestSuite icon32={CloseIcon32} multiIcon={CloseIcon} />)
    .add("cross", () => <TestSuite icon32={CrossIcon32} multiIcon={CrossIcon} />)
    .add("csvFile", () => <TestSuite icon32={CsvFileIcon32} multiIcon={CsvFileIcon} />)
    .add("deleteLink", () => <TestSuite icon32={DeleteLinkIcon32} multiIcon={DeleteLinkIcon} />)
    .add("doNotDisturb", () => <TestSuite icon32={DoNotDisturbIcon32} multiIcon={DoNotDisturbIcon} />)
    .add("download", () => <TestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />)
    .add("edit", () => <TestSuite icon32={EditIcon32} multiIcon={EditIcon} />)
    .add("file", () => <TestSuite icon32={FileIcon32} multiIcon={FileIcon} />)
    .add("filter", () => <TestSuite icon32={FilterIcon32} multiIcon={FilterIcon} />)
    .add("flag", () => <TestSuite icon32={FlagIcon32} multiIcon={FlagIcon} />)
    .add("folder", () => <TestSuite icon32={FolderIcon32} multiIcon={FolderIcon} />)
    .add("gear", () => <TestSuite icon32={GearIcon32} multiIcon={GearIcon} />)
    .add("group", () => <TestSuite icon32={GroupIcon32} multiIcon={GroupIcon} />)
    .add("groupSetting", () => <TestSuite icon32={GroupSettingIcon32} multiIcon={GroupSettingIcon} />)
    .add("guest", () => <TestSuite icon32={GuestIcon32} multiIcon={GuestIcon} />)
    .add("help", () => <TestSuite icon32={HelpIcon32} multiIcon={HelpIcon} />)
    .add("horizontalDots", () => <TestSuite icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />)
    .add("info", () => <TestSuite icon32={InfoIcon32} multiIcon={InfoIcon} />)
    .add("key", () => <TestSuite icon32={KeyIcon32} multiIcon={KeyIcon} />)
    .add("lightbulb", () => <TestSuite icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />)
    .add("link", () => <TestSuite icon32={LinkIcon32} multiIcon={LinkIcon} />)
    .add("magnifier", () => <TestSuite icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />)
    .add("mail", () => <TestSuite icon32={MailIcon32} multiIcon={MailIcon} />)
    .add("musicFile", () => <TestSuite icon32={MusicFileIcon32} multiIcon={MusicFileIcon} />)
    .add("notification", () => <TestSuite icon32={NotificationIcon32} multiIcon={NotificationIcon} />)
    .add("pdfFile", () => <TestSuite icon32={PdfFileIcon32} multiIcon={PdfFileIcon} />)
    .add("picture", () => <TestSuite icon32={PictureIcon32} multiIcon={PictureIcon} />)
    .add("printer", () => <TestSuite icon32={PrinterIcon32} multiIcon={PrinterIcon} />)
    .add("privacy", () => <TestSuite icon32={PrivacyIcon32} multiIcon={PrivacyIcon} />)
    .add("privateGroup", () => <TestSuite icon32={PrivateGroupIcon32} multiIcon={PrivateGroupIcon} />)
    .add("publicGroup", () => <TestSuite icon32={PublicGroupIcon32} multiIcon={PublicGroupIcon} />)
    .add("removeGuest", () => <TestSuite icon32={RemoveGuestIcon32} multiIcon={RemoveGuestIcon} />)
    .add("removeUser", () => <TestSuite icon32={RemoveUserIcon32} multiIcon={RemoveUserIcon} />)
    .add("security", () => <TestSuite icon32={SecurityIcon32} multiIcon={SecurityIcon} />)
    .add("settings", () => <TestSuite icon32={SettingsIcon32} multiIcon={SettingsIcon} />)
    .add("share", () => <TestSuite icon32={ShareIcon32} multiIcon={ShareIcon} />)
    .add("signin", () => <TestSuite icon32={SigninIcon32} multiIcon={SigninIcon} />)
    .add("signout", () => <TestSuite icon32={SignoutIcon32} multiIcon={SignoutIcon} />)
    .add("trashbox", () => <TestSuite icon32={TrashboxIcon32} multiIcon={TrashboxIcon} />)
    .add("upload", () => <TestSuite icon32={UploadIcon32} multiIcon={UploadIcon} />)
    .add("user", () => <TestSuite icon32={UserIcon32} multiIcon={UserIcon} />)
    .add("verticalDots", () => <TestSuite icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />)
    .add("videoFile", () => <TestSuite icon32={VideoFileIcon32} multiIcon={VideoFileIcon} />)
    .add("view", () => <TestSuite icon32={ViewIcon32} multiIcon={ViewIcon} />)
    .add("warning", () => <TestSuite icon32={WarningIcon32} multiIcon={WarningIcon} />);
