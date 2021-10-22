import { AvatarProps } from "@components/avatar";
import { LaunchImage } from "./assets";
import { expectAssignable } from "@typescript/tests";

expectAssignable<AvatarProps>({ name: "Elon Musk", src: "./launch.png" });
expectAssignable<AvatarProps>({ name: "Elon Musk", src: LaunchImage });
