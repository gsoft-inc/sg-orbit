import { createRef, forwardRef, useEffect } from "react";
import { render } from "@testing-library/react";
import { useCollection } from "@react-components/tabs";

function List({ onCollection, children }) {
    const collection = [...useCollection(children)];

    useEffect(() => {
        onCollection(collection);
    }, [collection, onCollection]);

    return (
        <div>
            {children}
        </div>
    );
}

const Item = forwardRef(() => {
    return null;
});

Item.getCollectionNode = props => {
    return {
        type: "item",
        props
    };
};

test("support ref", () => {
    const ref = createRef();

    render(
        <List
            onCollection={x => {
                expect(x[0].ref).not.toBeNull();
            }}
        >
            <Item ref={ref}>Item</Item>
        </List>
    );
});

test("use key when provided", () => {
    render(
        <List
            onCollection={x => {
                expect(x[0].key).toBe("my-key");
            }}
        >
            <Item key="my-key">Item</Item>
        </List>
    );
});

test("when no key is provided, a unique key is generated", () => {
    render(
        <List
            onCollection={x => {
                expect(x[0].key).toBe("1");
                expect(x[1].key).toBe("2");
                expect(x[2].key).toBe("3");
            }}
        >
            <Item>Item</Item>
            <Item>Item</Item>
            <Item>Item</Item>
        </List>
    );
});
