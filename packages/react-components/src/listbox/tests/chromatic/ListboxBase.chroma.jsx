import { Item } from "@react-components/placeholders";
import { ListboxBase, useCollectionBuilder } from "@react-components/listbox";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ListboxBase")
        .segment(segment)
        .build();
}

stories()
    .add("autoFocus + defaultFocusKey", () => {
        const nodes = useCollectionBuilder(
            <>
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="uranus">Uranus</Item>
            </>
        );

        return (
            <ListboxBase
                nodes={nodes}
                defaultFocusedKey="mercury"
                autoFocus
            />
        );
    });
