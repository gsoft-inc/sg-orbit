import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { useDisableClick } from "../../src";

test("returns click handler passed but prevents interaction if the boolean is true", async() => {
    const handler = jest.fn();

    function MockComponent() {
        const handleClick = useDisableClick(true, handler);

        return <button type="button" onClick={handleClick} />;
    }

    render(<MockComponent />);

    expect(handler).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button"));

    expect(handler).not.toHaveBeenCalled();
});


test("returns click handler passed but does not prevent interaction if the boolean is false", async() => {
    const handler = jest.fn();

    function MockComponent() {
        const handleClick = useDisableClick(false, handler);

        return <button type="button" onClick={handleClick} />;
    }

    render(<MockComponent />);

    expect(handler).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button"));

    expect(handler).toHaveBeenCalledTimes(1);
});
