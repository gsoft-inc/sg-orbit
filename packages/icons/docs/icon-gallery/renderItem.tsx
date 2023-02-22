import { ReactElement } from "react";
import { IconItem } from "./IconItem";
import { CreatedIconProps } from "@components/icons";

export function renderItem(name: string, iconComponent: ReactElement<CreatedIconProps>) {
    return <IconItem
        name={name}
        iconComponent={iconComponent}
    />;
}

// TODO : alternative usage: usage
//   <IconItem name="mobile" iconFileName="aa">
//     <IconExample />
//   </IconItem>
