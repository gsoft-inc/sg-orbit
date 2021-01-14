import { FocusTarget } from "@react-components/shared";
import { Item } from "@react-components/placeholders";
import { ListboxBase } from "@react-components/listbox";
import { storiesOfBuilder } from "@stories/utils";
import { useCollectionBuilder } from "@react-components/collection";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ListboxBase")
        .segment(segment)
        .build();
}

stories()
    .add("autofocus key", () => {
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
                autoFocus
                autoFocusTarget="mercury"
            />
        );
    })
    .add("autofocus first", () => {
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
                autoFocus
                autoFocusTarget={FocusTarget.first}
            />
        );
    })
    .add("autofocus last", () => {
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
                autoFocus
                autoFocusTarget={FocusTarget.last}
            />
        );
    });
