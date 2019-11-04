import {
    AddIcon,
    AddUserIcon,
    ArrowFullIcon,
    ArrowOutlineIcon,
    CancelIcon,
    CheckmarkIcon,
    ChevronIcon,
    CommunicationIcon,
    CsvIcon,
    DoNotDisturbIcon,
    DownloadIcon,
    EditIcon,
    FileIcon,
    FolderIcon,
    GarbageIcon,
    GearIcon,
    GroupIcon,
    HelpIcon24,
    HorizontalDotsIcon,
    ImageIcon,
    InfoIcon,
    LightbulbIcon24,
    MagnifierIcon,
    MusicIcon,
    NotificationIcon,
    PdfIcon,
    ReminderIcon,
    RemoveUserIcon,
    SignoutIcon24,
    VerticalDotsIcon,
    VideoIcon,
    ZipIcon
} from "@orbit-ui/icons";
import { SECTION } from "@stories/materials/icons/config";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories() {
    return storiesOfBuilder(module, `${SECTION}/chromatic`)
        .parameters(
            paramsBuilder()
                .sortLast()
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-center">
                     <div className="mb4 flex">
                         <ChevronIcon className="h3 w3" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowFullIcon className="w2 h2" />
                     </div>
                     <div className="mb4 flex">
                         <ArrowOutlineIcon className="w4 h4" />
                     </div>
                     <div className="mb4 flex">
                         <CancelIcon className="h3 w3" />
                     </div>
                     <div className="mb4 flex">
                         <AddIcon className="w4 h4" />
                     </div>
                     <div className="mb4 flex">
                         <MagnifierIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <InfoIcon className="w4 h4" />
                     </div>
                     <div className="mb4 flex">
                         <CheckmarkIcon className="w4 h4" />
                     </div>
                     <div className="mb4 flex">
                         <AddUserIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <CommunicationIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <CsvIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <DoNotDisturbIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <DownloadIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <EditIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <FileIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <FolderIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <GarbageIcon className="w7 h7" />
                     </div>
                 </div>
                 <div className="flex flex-column items-center">
                     <div className="mb4 flex">
                         <GearIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <GroupIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <HelpIcon24 className="w6 h6" />
                     </div>
                     <div className="mb4 flex">
                         <HorizontalDotsIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <ImageIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <LightbulbIcon24 className="w6 h6" />
                     </div>
                     <div className="mb4 flex">
                         <MagnifierIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <MusicIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <NotificationIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <PdfIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <ReminderIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <RemoveUserIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <SignoutIcon24 className="w6 h6" />
                     </div>
                     <div className="mb4 flex">
                         <VerticalDotsIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <VideoIcon className="w7 h7" />
                     </div>
                     <div className="mb4 flex">
                         <ZipIcon className="w7 h7" />
                     </div>
                 </div>
             </div>
    );
