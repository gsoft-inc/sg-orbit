import {
    AddIcon,
    AddIcon24,
    AddIcon32,
    AlertIcon,
    AlertIcon24,
    AlertIcon32,
    ArrowIcon,
    ArrowIcon24,
    ArrowIcon32,
    CalendarIcon,
    CalendarIcon24,
    CalendarIcon32,
    CaretIcon,
    CaretIcon24,
    CaretIcon32,
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
    StarIcon,
    StarIcon24,
    StarIcon32,
    StarOutlineIcon,
    StarOutlineIcon24,
    StarOutlineIcon32,
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
} from "@components/icons";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TestSuite } from "./TestSuite";

export default {
    title: "Chromatic/Icons",
    component: TestSuite
} as ComponentMeta<typeof TestSuite>;

type IconsStory = ComponentStoryObj<typeof TestSuite>;

export const Add: IconsStory = {
    storyName: "add",
    render: () => (
        <TestSuite icon24={AddIcon24} icon32={AddIcon32} multiIcon={AddIcon} />
    )
};

export const Alert: IconsStory = {
    storyName: "alert",
    render: () => (
        <TestSuite icon24={AlertIcon24} icon32={AlertIcon32} multiIcon={AlertIcon} />
    )
};


export const Arrow: IconsStory = {
    storyName: "arrow",
    render: () => (
        <TestSuite icon24={ArrowIcon24} icon32={ArrowIcon32} multiIcon={ArrowIcon} />
    )
};

export const Calendar: IconsStory = {
    storyName: "calendar",
    render: () => (
        <TestSuite icon24={CalendarIcon24} icon32={CalendarIcon32} multiIcon={CalendarIcon} />
    )
};

export const Caret: IconsStory = {
    storyName: "caret",
    render: () => (
        <TestSuite icon24={CaretIcon24} icon32={CaretIcon32} multiIcon={CaretIcon} />
    )
};

export const IconCheck: IconsStory = {
    storyName: "check",
    render: () => (
        <TestSuite icon24={CheckIcon24} icon32={CheckIcon32} multiIcon={CheckIcon} />
    )
};

export const CheckCircle: IconsStory = {
    storyName: "check circle",
    render: () => (
        <TestSuite icon24={CheckCircleIcon24} icon32={CheckCircleIcon32} multiIcon={CheckCircleIcon} />
    )
};

export const Chevron: IconsStory = {
    storyName: "chevron",
    render: () => (
        <TestSuite icon24={ChevronIcon24} icon32={ChevronIcon32} multiIcon={ChevronIcon} />
    )
};

export const Clear: IconsStory = {
    storyName: "clear",
    render: () => (
        <TestSuite icon24={ClearFilterIcon24} icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />
    )
};

export const Cross: IconsStory = {
    storyName: "cross",
    render: () => (
        <TestSuite icon24={CrossIcon24} icon32={CrossIcon32} multiIcon={CrossIcon} />
    )
};


export const Csv: IconsStory = {
    storyName: "csv",
    render: () => (
        <TestSuite icon24={CsvIcon24} icon32={CsvIcon32} multiIcon={CsvIcon} />
    )
};

export const Dash: IconsStory = {
    storyName: "dash",
    render: () => (
        <TestSuite icon24={DashIcon24} icon32={DashIcon32} multiIcon={DashIcon} />
    )
};

export const Download: IconsStory = {
    storyName: "download",
    render: () => (
        <TestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />
    )
};

export const Edit: IconsStory = {
    storyName: "edit",
    render: () => (
        <TestSuite icon24={EditIcon24} icon32={EditIcon32} multiIcon={EditIcon} />
    )
};

export const IconEmail: IconsStory = {
    storyName: "email",
    render: () => (
        <TestSuite icon24={EmailIcon24} icon32={EmailIcon32} multiIcon={EmailIcon} />
    )
};

export const EmailReminder: IconsStory = {
    storyName: "email reminder",
    render: () => (
        <TestSuite icon24={EmailReminderIcon24} icon32={EmailReminderIcon32} multiIcon={EmailReminderIcon} />
    )
};

export const Eye: IconsStory = {
    storyName: "eye",
    render: () => (
        <TestSuite icon24={EyeIcon24} icon32={EyeIcon32} multiIcon={EyeIcon} />
    )
};

export const File: IconsStory = {
    storyName: "file",
    render: () => (
        <TestSuite icon24={FileIcon24} icon32={FileIcon32} multiIcon={FileIcon} />
    )
};

export const Filter: IconsStory = {
    storyName: "filter",
    render: () => (
        <TestSuite icon24={FilterIcon24} icon32={FilterIcon32} multiIcon={FilterIcon} />
    )
};

export const Flag: IconsStory = {
    storyName: "flag",
    render: () => (
        <TestSuite icon24={FlagIcon24} icon32={FlagIcon32} multiIcon={FlagIcon} />
    )
};

export const Folder: IconsStory = {
    storyName: "folder",
    render: () => (
        <TestSuite icon24={FolderIcon24} icon32={FolderIcon32} multiIcon={FolderIcon} />
    )
};

export const Gear: IconsStory = {
    storyName: "gear",
    render: () => (
        <TestSuite icon24={GearIcon24} icon32={GearIcon32} multiIcon={GearIcon} />
    )
};

export const Group: IconsStory = {
    storyName: "group",
    render: () => (
        <TestSuite icon24={GroupIcon24} icon32={GroupIcon32} multiIcon={GroupIcon} />
    )
};

export const GuestAdd: IconsStory = {
    storyName: "guest add",
    render: () => (
        <TestSuite icon24={GuestAddIcon24} icon32={GuestAddIcon32} multiIcon={GuestAddIcon} />
    )
};


export const GuestRemove: IconsStory = {
    storyName: "guest remove",
    render: () => (
        <TestSuite icon24={GuestRemoveIcon24} icon32={GuestRemoveIcon32} multiIcon={GuestRemoveIcon} />
    )
};

export const Help: IconsStory = {
    storyName: "help",
    render: () => (
        <TestSuite icon24={HelpIcon24} icon32={HelpIcon32} multiIcon={HelpIcon} />
    )
};

export const HorizontalDots: IconsStory = {
    storyName: "horizontal dots",
    render: () => (
        <TestSuite icon24={HorizontalDotsIcon24} icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />
    )
};

export const Info: IconsStory = {
    storyName: "info",
    render: () => (
        <TestSuite icon24={InfoIcon24} icon32={InfoIcon32} multiIcon={InfoIcon} />
    )
};

export const Lightbulb: IconsStory = {
    storyName: "lightbulb",
    render: () => (
        <TestSuite icon24={LightbulbIcon24} icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />
    )
};

export const Magnifier: IconsStory = {
    storyName: "magnifier",
    render: () => (
        <TestSuite icon24={MagnifierIcon24} icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />
    )
};

export const Music: IconsStory = {
    storyName: "music",
    render: () => (
        <TestSuite icon24={MusicIcon24} icon32={MusicIcon32} multiIcon={MusicIcon} />
    )
};

export const IconNotification: IconsStory = {
    storyName: "notification",
    render: () => (
        <TestSuite icon24={NotificationIcon24} icon32={NotificationIcon32} multiIcon={NotificationIcon} />
    )
};

export const NotificationOff: IconsStory = {
    storyName: "notification off",
    render: () => (
        <TestSuite icon24={NotificationOffIcon24} icon32={NotificationOffIcon32} multiIcon={NotificationOffIcon} />
    )
};

export const Pdf: IconsStory = {
    storyName: "pdf",
    render: () => (
        <TestSuite icon24={PdfIcon24} icon32={PdfIcon32} multiIcon={PdfIcon} />
    )
};

export const Image: IconsStory = {
    storyName: "image",
    render: () => (
        <TestSuite icon24={ImageIcon24} icon32={ImageIcon32} multiIcon={ImageIcon} />
    )
};

export const Printer: IconsStory = {
    storyName: "printer",
    render: () => (
        <TestSuite icon24={PrinterIcon24} icon32={PrinterIcon32} multiIcon={PrinterIcon} />
    )
};

export const Privacy: IconsStory = {
    storyName: "privacy",
    render: () => (
        <TestSuite icon24={PrivacyIcon24} icon32={PrivacyIcon32} multiIcon={PrivacyIcon} />
    )
};

export const Signout: IconsStory = {
    storyName: "signout",
    render: () => (
        <TestSuite icon24={SignoutIcon24} icon32={SignoutIcon32} multiIcon={SignoutIcon} />
    )
};

export const IconStar: IconsStory = {
    storyName: "star",
    render: () => (
        <TestSuite icon24={StarIcon24} icon32={StarIcon32} multiIcon={StarIcon} />
    )
};

export const StarOutline: IconsStory = {
    storyName: "star outline",
    render: () => (
        <TestSuite icon24={StarOutlineIcon24} icon32={StarOutlineIcon32} multiIcon={StarOutlineIcon} />
    )
};

export const Sort: IconsStory = {
    storyName: "sort",
    render: () => (
        <TestSuite icon24={SortIcon24} icon32={SortIcon32} multiIcon={SortIcon} />
    )
};

export const Trash: IconsStory = {
    storyName: "trash",
    render: () => (
        <TestSuite icon24={TrashIcon24} icon32={TrashIcon32} multiIcon={TrashIcon} />
    )
};

export const UserAdd: IconsStory = {
    storyName: "user add",
    render: () => (
        <TestSuite icon24={UserAddIcon24} icon32={UserAddIcon32} multiIcon={UserAddIcon} />
    )
};

export const UserRemove: IconsStory = {
    storyName: "user remove",
    render: () => (
        <TestSuite icon24={UserRemoveIcon24} icon32={UserRemoveIcon32} multiIcon={UserRemoveIcon} />
    )
};

export const VerticalDots: IconsStory = {
    storyName: "vertical dots",
    render: () => (
        <TestSuite icon24={VerticalDotsIcon24} icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />
    )
};

export const Video: IconsStory = {
    storyName: "video",
    render: () => (
        <TestSuite icon24={VideoIcon24} icon32={VideoIcon32} multiIcon={VideoIcon} />
    )
};

export const Warning: IconsStory = {
    storyName: "warning",
    render: () => (
        <TestSuite icon24={WarningIcon24} icon32={WarningIcon32} multiIcon={WarningIcon} />
    )
};

export const Zip: IconsStory = {
    storyName: "zip",
    render: () => (
        <TestSuite icon24={ZipIcon24} icon32={ZipIcon32} multiIcon={ZipIcon} />
    )
};
