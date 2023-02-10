import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { useDisableClick } from "../../src/useDisableClick";

test("handler is not called when boolean is true", async() => {
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


test("handler is not called when boolean is false", async() => {
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
