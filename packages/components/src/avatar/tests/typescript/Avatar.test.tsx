import { AvatarProps } from "@components/avatar";
import { LaunchImage } from "./assets";
import { expectAssignable } from "@test-utils";

expectAssignable<AvatarProps>({ name: "Elon Musk", src: "./launch.png" });
expectAssignable<AvatarProps>({ name: "Elon Musk", src: LaunchImage });
