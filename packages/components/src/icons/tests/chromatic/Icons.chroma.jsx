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
import { TestSuite } from "./TestSuite";

export default {
    title: "Chromatic/Icons"
};

export const Add = () => (
    <TestSuite icon24={AddIcon24} icon32={AddIcon32} multiIcon={AddIcon} />
);

Add.storyName = "add";

export const Arrow = () => (
    <TestSuite icon24={ArrowIcon24} icon32={ArrowIcon32} multiIcon={ArrowIcon} />
);

Arrow.storyName = "arrow";

export const Calendar = () => (
    <TestSuite icon24={CalendarIcon24} icon32={CalendarIcon32} multiIcon={CalendarIcon} />
);

Calendar.storyName = "calendar";

export const Caret = () => (
    <TestSuite icon24={CaretIcon24} icon32={CaretIcon32} multiIcon={CaretIcon} />
);

Caret.storyName = "caret";

export const IconCheck = () => (
    <TestSuite icon24={CheckIcon24} icon32={CheckIcon32} multiIcon={CheckIcon} />
);

IconCheck.storyName = "check";

export const CheckCircle = () => (
    <TestSuite icon24={CheckCircleIcon24} icon32={CheckCircleIcon32} multiIcon={CheckCircleIcon} />
);

CheckCircle.storyName = "check circle";

export const Chevron = () => (
    <TestSuite icon24={ChevronIcon24} icon32={ChevronIcon32} multiIcon={ChevronIcon} />
);

Chevron.storyName = "chevron";

export const Clear = () => (
    <TestSuite icon24={ClearFilterIcon24} icon32={ClearFilterIcon32} multiIcon={ClearFilterIcon} />
);

Clear.storyName = "clear";

export const Cross = () => (
    <TestSuite icon24={CrossIcon24} icon32={CrossIcon32} multiIcon={CrossIcon} />
);

Cross.storyName = "cross";

export const Csv = () => (
    <TestSuite icon24={CsvIcon24} icon32={CsvIcon32} multiIcon={CsvIcon} />
);

Csv.storyName = "csv";

export const Dash = () => (
    <TestSuite icon24={DashIcon24} icon32={DashIcon32} multiIcon={DashIcon} />
);

Dash.storyName = "dash";

export const Download = () => (
    <TestSuite icon32={DownloadIcon32} multiIcon={DownloadIcon} />
);

Download.storyName = "download";

export const Edit = () => (
    <TestSuite icon24={EditIcon24} icon32={EditIcon32} multiIcon={EditIcon} />
);

Edit.storyName = "edit";

export const IconEmail = () => (
    <TestSuite icon24={EmailIcon24} icon32={EmailIcon32} multiIcon={EmailIcon} />
);

IconEmail.storyName = "email";

export const EmailReminder = () => (
    <TestSuite icon24={EmailReminderIcon24} icon32={EmailReminderIcon32} multiIcon={EmailReminderIcon} />
);

EmailReminder.storyName = "email reminder";

export const Eye = () => (
    <TestSuite icon24={EyeIcon24} icon32={EyeIcon32} multiIcon={EyeIcon} />
);

Eye.storyName = "eye";

export const File = () => (
    <TestSuite icon24={FileIcon24} icon32={FileIcon32} multiIcon={FileIcon} />
);

File.storyName = "file";

export const Filter = () => (
    <TestSuite icon24={FilterIcon24} icon32={FilterIcon32} multiIcon={FilterIcon} />
);

Filter.storyName = "filter";

export const Flag = () => (
    <TestSuite icon24={FlagIcon24} icon32={FlagIcon32} multiIcon={FlagIcon} />
);

Flag.storyName = "flag";

export const Folder = () => (
    <TestSuite icon24={FolderIcon24} icon32={FolderIcon32} multiIcon={FolderIcon} />
);

Folder.storyName = "folder";

export const Gear = () => (
    <TestSuite icon24={GearIcon24} icon32={GearIcon32} multiIcon={GearIcon} />
);

Gear.storyName = "gear";

export const Group = () => (
    <TestSuite icon24={GroupIcon24} icon32={GroupIcon32} multiIcon={GroupIcon} />
);

Group.storyName = "group";

export const GuestAdd = () => (
    <TestSuite icon24={GuestAddIcon24} icon32={GuestAddIcon32} multiIcon={GuestAddIcon} />
);

GuestAdd.storyName = "guest add";

export const GuestRemove = () => (
    <TestSuite icon24={GuestRemoveIcon24} icon32={GuestRemoveIcon32} multiIcon={GuestRemoveIcon} />
);

GuestRemove.storyName = "guest remove";

export const Help = () => (
    <TestSuite icon24={HelpIcon24} icon32={HelpIcon32} multiIcon={HelpIcon} />
);

Help.storyName = "help";

export const HorizontalDots = () => (
    <TestSuite icon24={HorizontalDotsIcon24} icon32={HorizontalDotsIcon32} multiIcon={HorizontalDotsIcon} />
);

HorizontalDots.storyName = "horizontal dots";

export const Info = () => (
    <TestSuite icon24={InfoIcon24} icon32={InfoIcon32} multiIcon={InfoIcon} />
);

Info.storyName = "info";

export const Lightbulb = () => (
    <TestSuite icon24={LightbulbIcon24} icon32={LightbulbIcon32} multiIcon={LightbulbIcon} />
);

Lightbulb.storyName = "lightbulb";

export const Magnifier = () => (
    <TestSuite icon24={MagnifierIcon24} icon32={MagnifierIcon32} multiIcon={MagnifierIcon} />
);

Magnifier.storyName = "magnifier";

export const Music = () => (
    <TestSuite icon24={MusicIcon24} icon32={MusicIcon32} multiIcon={MusicIcon} />
);

Music.storyName = "music";

export const IconNotification = () => (
    <TestSuite icon24={NotificationIcon24} icon32={NotificationIcon32} multiIcon={NotificationIcon} />
);

IconNotification.storyName = "notification";

export const NotificationOff = () => (
    <TestSuite icon24={NotificationOffIcon24} icon32={NotificationOffIcon32} multiIcon={NotificationOffIcon} />
);

NotificationOff.storyName = "notification off";

export const Pdf = () => (
    <TestSuite icon24={PdfIcon24} icon32={PdfIcon32} multiIcon={PdfIcon} />
);

Pdf.storyName = "pdf";

export const Image = () => (
    <TestSuite icon24={ImageIcon24} icon32={ImageIcon32} multiIcon={ImageIcon} />
);

Image.storyName = "image";

export const Printer = () => (
    <TestSuite icon24={PrinterIcon24} icon32={PrinterIcon32} multiIcon={PrinterIcon} />
);

Printer.storyName = "printer";

export const Privacy = () => (
    <TestSuite icon24={PrivacyIcon24} icon32={PrivacyIcon32} multiIcon={PrivacyIcon} />
);

Privacy.storyName = "privacy";

export const Signout = () => (
    <TestSuite icon24={SignoutIcon24} icon32={SignoutIcon32} multiIcon={SignoutIcon} />
);

Signout.storyName = "signout";

export const IconStar = () => (
    <TestSuite icon24={StarIcon24} icon32={StarIcon32} multiIcon={StarIcon} />
);

IconStar.storyName = "star";

export const StarOutline = () => (
    <TestSuite icon24={StarOutlineIcon24} icon32={StarOutlineIcon32} multiIcon={StarOutlineIcon} />
);

StarOutline.storyName = "star outline";

export const Sort = () => (
    <TestSuite icon24={SortIcon24} icon32={SortIcon32} multiIcon={SortIcon} />
);

Sort.storyName = "sort";

export const Trash = () => (
    <TestSuite icon24={TrashIcon24} icon32={TrashIcon32} multiIcon={TrashIcon} />
);

Trash.storyName = "trash";

export const UserAdd = () => (
    <TestSuite icon24={UserAddIcon24} icon32={UserAddIcon32} multiIcon={UserAddIcon} />
);

UserAdd.storyName = "user add";

export const UserRemove = () => (
    <TestSuite icon24={UserRemoveIcon24} icon32={UserRemoveIcon32} multiIcon={UserRemoveIcon} />
);

UserRemove.storyName = "user remove";

export const VerticalDots = () => (
    <TestSuite icon24={VerticalDotsIcon24} icon32={VerticalDotsIcon32} multiIcon={VerticalDotsIcon} />
);

VerticalDots.storyName = "vertical dots";

export const Video = () => (
    <TestSuite icon24={VideoIcon24} icon32={VideoIcon32} multiIcon={VideoIcon} />
);

Video.storyName = "video";

export const Warning = () => (
    <TestSuite icon24={WarningIcon24} icon32={WarningIcon32} multiIcon={WarningIcon} />
);

Warning.storyName = "warning";

export const Zip = () => (
    <TestSuite icon24={ZipIcon24} icon32={ZipIcon32} multiIcon={ZipIcon} />
);

Zip.storyName = "zip";
