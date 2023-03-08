import {
    AddMajorIcon,
    AlertMajorIcon,
    ArrowMajorIcon,
    ArrowMinorIcon,
    BurgerMajorIcon,
    CalendarMajorIcon,
    CheckMajorIcon,
    ChevronMajorIcon,
    ChevronMinorIcon,
    ChevronUpDownMajorIcon,
    ChevronUpDownMinorIcon,
    CrossMajorIcon,
    CrossMinorIcon,
    DuplicateMajorIcon,
    DownloadMajorIcon,
    EmailMajorIcon,
    ExternalLinkMajorIcon,
    ExternalLinkMinorIcon,
    EyeMajorIcon,
    FileMajorIcon,
    FileCsvMajorIcon,
    FileMusicMajorIcon,
    FilePdfMajorIcon,
    FileVideoMajorIcon,
    FileZipMajorIcon,
    FilterMajorIcon,
    FolderMajorIcon,
    GearMajorIcon,
    GrabMajorIcon,
    GroupMajorIcon,
    HelpMajorIcon,
    HomeMajorIcon,
    HorizontalDotsMajorIcon,
    ImageMajorIcon,
    InfoCircleMajorIcon,
    InfoCircleMinorIcon,
    LightbulbMajorIcon,
    LinkMajorIcon,
    LinkRemoveMajorIcon,
    MagnifierMajorIcon,
    NotificationMajorIcon,
    NotificationOffMajorIcon,
    NotificationRingingMajorIcon,
    PencilMajorIcon,
    PlaceholderMajorIcon,
    PlaceholderMinorIcon,
    PadlockLockedMajorIcon,
    PadlockUnlockedMajorIcon,
    RevertMajorIcon,
    SigninMajorIcon,
    SignoutMajorIcon,
    StarFillMajorIcon,
    StarOutlineMajorIcon,
    TrashMajorIcon,
    TrashMinorIcon,
    UserAddMajorIcon,
    UserAddMinorIcon,
    VerticalDotsMajorIcon,
    WarningMajorIcon,
    UfoMajorIcon,
    RocketMajorIcon,
    TelescopeMajorIcon
} from "@components/icons";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TestSuite } from "./TestSuite";
import { Flex } from "@components/layout";

export default {
    title: "Chromatic/Icons",
    component: TestSuite
} as ComponentMeta<typeof TestSuite>;

type IconsStory = ComponentStoryObj<typeof TestSuite>;

export const IconAddMajor: IconsStory = {
    storyName: "Add Major",
    render: () => (
        <TestSuite icon={AddMajorIcon} />
    )
};

export const IconAlertMajor: IconsStory = {
    storyName: "Alert Major",
    render: () => (
        <TestSuite icon={AlertMajorIcon} />
    )
};

export const IconArrowMajor: IconsStory = {
    storyName: "Arrow Major",
    render: () => (
        <TestSuite icon={ArrowMajorIcon} />
    )
};

export const IconArrowMinor: IconsStory = {
    storyName: "Arrow Minor",
    render: () => (
        <TestSuite icon={ArrowMinorIcon} />
    )
};

export const IconBurgerMajor: IconsStory = {
    storyName: "Burger Major",
    render: () => (
        <TestSuite icon={BurgerMajorIcon} />
    )
};

export const IconCalendarMajor: IconsStory = {
    storyName: "Calendar Major",
    render: () => (
        <TestSuite icon={CalendarMajorIcon} />
    )
};

export const IconCheckMajor: IconsStory = {
    storyName: "Check Major",
    render: () => (
        <TestSuite icon={CheckMajorIcon} />
    )
};

export const IconChevronMajor: IconsStory = {
    storyName: "Chevron Major",
    render: () => (
        <TestSuite icon={ChevronMajorIcon} />
    )
};

export const IconChevronMinor: IconsStory = {
    storyName: "Chevron Minor",
    render: () => (
        <TestSuite icon={ChevronMinorIcon} />
    )
};

export const IconChevronUpDownMajor: IconsStory = {
    storyName: "ChevronUpDown Major",
    render: () => (
        <TestSuite icon={ChevronUpDownMajorIcon} />
    )
};

export const IconChevronUpDownMinor: IconsStory = {
    storyName: "ChevronUpDown Minor",
    render: () => (
        <TestSuite icon={ChevronUpDownMinorIcon} />
    )
};

export const IconCrossMajor: IconsStory = {
    storyName: "Cross Major",
    render: () => (
        <TestSuite icon={CrossMajorIcon} />
    )
};

export const IconCrossMinor: IconsStory = {
    storyName: "Cross Minor",
    render: () => (
        <TestSuite icon={CrossMinorIcon} />
    )
};

export const IconDuplicateMajor: IconsStory = {
    storyName: "Duplicate Major",
    render: () => (
        <TestSuite icon={DuplicateMajorIcon} />
    )
};

export const IconDownloadMajor: IconsStory = {
    storyName: "Download Major",
    render: () => (
        <TestSuite icon={DownloadMajorIcon} />
    )
};

export const IconEmailMajor: IconsStory = {
    storyName: "Email Major",
    render: () => (
        <TestSuite icon={EmailMajorIcon} />
    )
};

export const IconExternalLinkMajor: IconsStory = {
    storyName: "ExternalLink Major",
    render: () => (
        <TestSuite icon={ExternalLinkMajorIcon} />
    )
};

export const IconExternalLinkMinor: IconsStory = {
    storyName: "ExternalLink Minor",
    render: () => (
        <TestSuite icon={ExternalLinkMinorIcon} />
    )
};

export const IconEyeMajor: IconsStory = {
    storyName: "Eye Major",
    render: () => (
        <TestSuite icon={EyeMajorIcon} />
    )
};

export const IconFileMajor: IconsStory = {
    storyName: "File Major",
    render: () => (
        <TestSuite icon={FileMajorIcon} />
    )
};

export const IconFileCsvMajor: IconsStory = {
    storyName: "FileCsv Major",
    render: () => (
        <TestSuite icon={FileCsvMajorIcon} />
    )
};

export const IconFileMusicMajor: IconsStory = {
    storyName: "FileMusic Major",
    render: () => (
        <TestSuite icon={FileMusicMajorIcon} />
    )
};

export const IconFilePdfMajor: IconsStory = {
    storyName: "FilePdf Major",
    render: () => (
        <TestSuite icon={FilePdfMajorIcon} />
    )
};

export const IconFileVideoMajor: IconsStory = {
    storyName: "FileVideo Major",
    render: () => (
        <TestSuite icon={FileVideoMajorIcon} />
    )
};

export const IconFileZipMajor: IconsStory = {
    storyName: "FileZip Major",
    render: () => (
        <TestSuite icon={FileZipMajorIcon} />
    )
};

export const IconFilterMajor: IconsStory = {
    storyName: "Filter Major",
    render: () => (
        <TestSuite icon={FilterMajorIcon} />
    )
};

export const IconFolderMajor: IconsStory = {
    storyName: "Folder Major",
    render: () => (
        <TestSuite icon={FolderMajorIcon} />
    )
};

export const IconGearMajor: IconsStory = {
    storyName: "Gear Major",
    render: () => (
        <TestSuite icon={GearMajorIcon} />
    )
};

export const IconGrabMajor: IconsStory = {
    storyName: "Grab Major",
    render: () => (
        <TestSuite icon={GrabMajorIcon} />
    )
};

export const IconGroupMajor: IconsStory = {
    storyName: "Group Major",
    render: () => (
        <TestSuite icon={GroupMajorIcon} />
    )
};

export const IconHelpMajor: IconsStory = {
    storyName: "Help Major",
    render: () => (
        <TestSuite icon={HelpMajorIcon} />
    )
};

export const IconHomeMajor: IconsStory = {
    storyName: "Home Major",
    render: () => (
        <TestSuite icon={HomeMajorIcon} />
    )
};

export const IconHorizontalDotsMajor: IconsStory = {
    storyName: "HorizontalDots Major",
    render: () => (
        <TestSuite icon={HorizontalDotsMajorIcon} />
    )
};

export const IconImageMajor: IconsStory = {
    storyName: "Image Major",
    render: () => (
        <TestSuite icon={ImageMajorIcon} />
    )
};

export const IconInfoCircleMajor: IconsStory = {
    storyName: "InfoCircle Major",
    render: () => (
        <TestSuite icon={InfoCircleMajorIcon} />
    )
};

export const IconInfoCircleMinor: IconsStory = {
    storyName: "InfoCircle Minor",
    render: () => (
        <TestSuite icon={InfoCircleMinorIcon} />
    )
};

export const IconLightbulbMajor: IconsStory = {
    storyName: "Lightbulb Major",
    render: () => (
        <TestSuite icon={LightbulbMajorIcon} />
    )
};

export const IconLinkMajor: IconsStory = {
    storyName: "Link Major",
    render: () => (
        <TestSuite icon={LinkMajorIcon} />
    )
};

export const IconLinkRemoveMajor: IconsStory = {
    storyName: "LinkRemove Major",
    render: () => (
        <TestSuite icon={LinkRemoveMajorIcon} />
    )
};

export const IconMagnifierMajor: IconsStory = {
    storyName: "Magnifier Major",
    render: () => (
        <TestSuite icon={MagnifierMajorIcon} />
    )
};

export const IconNotificationMajor: IconsStory = {
    storyName: "Notification Major",
    render: () => (
        <TestSuite icon={NotificationMajorIcon} />
    )
};

export const IconNotificationOffMajor: IconsStory = {
    storyName: "NotificationOff Major",
    render: () => (
        <TestSuite icon={NotificationOffMajorIcon} />
    )
};

export const IconNotificationRingingMajor: IconsStory = {
    storyName: "Notification Ringing Major",
    render: () => (
        <TestSuite icon={NotificationRingingMajorIcon} />
    )
};

export const IconPencilMajor: IconsStory = {
    storyName: "Pencil Major",
    render: () => (
        <TestSuite icon={PencilMajorIcon} />
    )
};

export const IconPlaceholderMajor: IconsStory = {
    storyName: "Placeholder Major",
    render: () => (
        <TestSuite icon={PlaceholderMajorIcon} />
    )
};

export const IconPlaceholderMinor: IconsStory = {
    storyName: "Placeholder Minor",
    render: () => (
        <TestSuite icon={PlaceholderMinorIcon} />
    )
};

export const IconPrivacyPrivateMajor: IconsStory = {
    storyName: "PrivacyPrivate Major",
    render: () => (
        <TestSuite icon={PadlockLockedMajorIcon} />
    )
};

export const IconPrivacyPublicMajor: IconsStory = {
    storyName: "PrivacyPublic Major",
    render: () => (
        <TestSuite icon={PadlockUnlockedMajorIcon} />
    )
};

export const IconRevertMajor: IconsStory = {
    storyName: "Revert Major",
    render: () => (
        <TestSuite icon={RevertMajorIcon} />
    )
};

export const IconRocketMajor: IconsStory = {
    storyName: "Rocket Major",
    render: () => (
        <TestSuite icon={RocketMajorIcon} />
    )
};

export const IconSigninMajor: IconsStory = {
    storyName: "Signin Major",
    render: () => (
        <TestSuite icon={SigninMajorIcon} />
    )
};

export const IconSignoutMajor: IconsStory = {
    storyName: "Signout Major",
    render: () => (
        <TestSuite icon={SignoutMajorIcon} />
    )
};

export const IconStarFillMajor: IconsStory = {
    storyName: "Star Major",
    render: () => (
        <TestSuite icon={StarFillMajorIcon} />
    )
};

export const IconStarOutlineMajor: IconsStory = {
    storyName: "StarOutline Major",
    render: () => (
        <TestSuite icon={StarOutlineMajorIcon} />
    )
};

export const IconTelescopeMajor: IconsStory = {
    storyName: "Telescope Major",
    render: () => (
        <TestSuite icon={TelescopeMajorIcon} />
    )
};

export const IconTrashMajor: IconsStory = {
    storyName: "Trash Major",
    render: () => (
        <TestSuite icon={TrashMajorIcon} />
    )
};

export const IconTrashMinor: IconsStory = {
    storyName: "Trash Minor",
    render: () => (
        <TestSuite icon={TrashMinorIcon} />
    )
};

export const IconUfoMajor: IconsStory = {
    storyName: "Ufo Major",
    render: () => (
        <TestSuite icon={UfoMajorIcon} />
    )
};

export const IconUserAddMajor: IconsStory = {
    storyName: "UserAdd Major",
    render: () => (
        <TestSuite icon={UserAddMajorIcon} />
    )
};

export const IconUserAddMinor: IconsStory = {
    storyName: "UserAdd Minor",
    render: () => (
        <TestSuite icon={UserAddMinorIcon} />
    )
};

export const IconVerticalDotsMajor: IconsStory = {
    storyName: "VerticalDots Major",
    render: () => (
        <TestSuite icon={VerticalDotsMajorIcon} />
    )
};

export const IconWarningMajor: IconsStory = {
    storyName: "Warning Major",
    render: () => (
        <TestSuite icon={WarningMajorIcon} />
    )
};

export const IconFill: IconsStory = {
    storyName: "Fill over background",
    render: () => (
        <Flex inline backgroundColor="#008000" wrap="wrap" width="32rem">
            <WarningMajorIcon fill="#FFFF00" />
            <AddMajorIcon fill="#FFFF00" />
            <AlertMajorIcon fill="#FFFF00" />
            <ArrowMajorIcon fill="#FFFF00" />
            <ArrowMinorIcon fill="#FFFF00" />
            <BurgerMajorIcon fill="#FFFF00" />
            <CalendarMajorIcon fill="#FFFF00" />
            <CheckMajorIcon fill="#FFFF00" />
            <ChevronMajorIcon fill="#FFFF00" />
            <ChevronMinorIcon fill="#FFFF00" />
            <ChevronUpDownMajorIcon fill="#FFFF00" />
            <ChevronUpDownMinorIcon fill="#FFFF00" />
            <CrossMajorIcon fill="#FFFF00" />
            <CrossMinorIcon fill="#FFFF00" />
            <DuplicateMajorIcon fill="#FFFF00" />
            <DownloadMajorIcon fill="#FFFF00" />
            <EmailMajorIcon fill="#FFFF00" />
            <ExternalLinkMajorIcon fill="#FFFF00" />
            <ExternalLinkMinorIcon fill="#FFFF00" />
            <EyeMajorIcon fill="#FFFF00" />
            <FileMajorIcon fill="#FFFF00" />
            <FileCsvMajorIcon fill="#FFFF00" />
            <FileMusicMajorIcon fill="#FFFF00" />
            <FilePdfMajorIcon fill="#FFFF00" />
            <FileVideoMajorIcon fill="#FFFF00" />
            <FileZipMajorIcon fill="#FFFF00" />
            <FilterMajorIcon fill="#FFFF00" />
            <FolderMajorIcon fill="#FFFF00" />
            <GearMajorIcon fill="#FFFF00" />
            <GrabMajorIcon fill="#FFFF00" />
            <GroupMajorIcon fill="#FFFF00" />
            <HelpMajorIcon fill="#FFFF00" />
            <HomeMajorIcon fill="#FFFF00" />
            <HorizontalDotsMajorIcon fill="#FFFF00" />
            <ImageMajorIcon fill="#FFFF00" />
            <InfoCircleMajorIcon fill="#FFFF00" />
            <InfoCircleMinorIcon fill="#FFFF00" />
            <LightbulbMajorIcon fill="#FFFF00" />
            <LinkMajorIcon fill="#FFFF00" />
            <LinkRemoveMajorIcon fill="#FFFF00" />
            <MagnifierMajorIcon fill="#FFFF00" />
            <NotificationMajorIcon fill="#FFFF00" />
            <NotificationOffMajorIcon fill="#FFFF00" />
            <NotificationRingingMajorIcon fill="#FFFF00" />
            <PencilMajorIcon fill="#FFFF00" />
            <PlaceholderMajorIcon fill="#FFFF00" />
            <PlaceholderMinorIcon fill="#FFFF00" />
            <PadlockLockedMajorIcon fill="#FFFF00" />
            <PadlockUnlockedMajorIcon fill="#FFFF00" />
            <RevertMajorIcon fill="#FFFF00" />
            <SigninMajorIcon fill="#FFFF00" />
            <SignoutMajorIcon fill="#FFFF00" />
            <StarFillMajorIcon fill="#FFFF00" />
            <StarOutlineMajorIcon fill="#FFFF00" />
            <TrashMajorIcon fill="#FFFF00" />
            <TrashMinorIcon fill="#FFFF00" />
            <UserAddMajorIcon fill="#FFFF00" />
            <UserAddMinorIcon fill="#FFFF00" />
            <VerticalDotsMajorIcon fill="#FFFF00" />
        </Flex>
    )
};
