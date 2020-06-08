import { CalendarIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/item"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function createMale(props = {}) {
    return { key: "Male", text: "Male", value: "Male", ...props };
}

function createFemale(props = {}) {
    return { key: "Female", text: "Female", value: "Female", ...props };
}

const GENDERS = [createMale(), createFemale()];

function createSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    open: true
                })}
            </div>
            <div>
                {createSelect({
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("active", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    open: true
                })}
            </div>
            <div>
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("selected", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    open: true
                })}
            </div>
            <div>
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    open: true
                })}
            </div>
            <div>
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("description", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!" })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!" })],
                    open: true
                })}
            </div>
            <div>
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!" })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("icons left", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    size: "small",
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    size: "small",
                    open: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    open: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    size: "large",
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    size: "large",
                    open: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], disabled: true })],
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("icon right", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    size: "small",
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "small",
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!", icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "small",
                    open: true,
                    fluid: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!", icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    open: true,
                    fluid: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    size: "large",
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "large",
                    open: true,
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ description: "To infinite and beyond!", icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "large",
                    fluid: true,
                    open: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right", disabled: true })],
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    size: "small",
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    size: "small",
                    open: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    open: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    size: "large",
                    open: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    size: "large",
                    open: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" />, disabled: true }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" />, disabled: true })],
                    open: true
                })}
            </div>
        </div>
    )
    .add("overflow", () =>
        <div className="flex" style={{ marginBottom: "150px" }}>
            {createSelect({
                options: [
                    createMale(),
                    createFemale({ text: "Super long text that will not fit without overflowing" })
                ],
                defaultOpen: true,
                wrapperClassName: "mr5"
            })}
            {createSelect({
                options: [
                    createMale(),
                    createFemale({ description: "Super long text that will not fit without overflowing" })
                ],
                defaultOpen: true
            })}
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            {createSelect({
                options: [
                    createMale(),
                    createFemale({ text: "Super long text that will not fit without overflowing", className: "bg-red" })
                ],
                defaultOpen: true,
                wrapperClassName: "mr5"
            })}
            {createSelect({
                options: [
                    createMale(),
                    createFemale({ text: "Super long text that will not fit without overflowing", style: { background: "red" } })
                ],
                defaultOpen: true,
                wrapperClassName: "mr5"
            })}
        </div>
    );
