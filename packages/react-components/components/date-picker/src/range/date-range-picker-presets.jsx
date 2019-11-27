import { PresetsCalendarIcon } from "../assets";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, object, shape, string } from "prop-types";
import { isNil } from "lodash";
import { isSameDay } from "../utils";
import { mergeClasses } from "@orbit-ui/react-components-shared";
import cx from "classnames";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const PRESET_SHAPE = {
    text: string.isRequired,
    startDate: object.isRequired,
    endDate: object.isRequired
};

class Preset extends PureComponent {
    static propTypes = {
        preset: shape(PRESET_SHAPE).isRequired,
        onSelectPreset: func,
        isSelected: bool,
        isBlocked: bool
    };

    handleClick = event => {
        const { preset, onSelectPreset } = this.props;

        onSelectPreset(event, preset, this.props);
    };

    render() {
        const { preset, isSelected, isBlocked } = this.props;

        return (
            <li className="pa2 mb2 lh1">
                <Choose>
                    <When condition={isBlocked}>
                        <span className="f7 cloud-400 outline-0">{preset.text}</span>
                    </When>
                    <Otherwise>
                        <button
                            onClick={this.handleClick}
                            className={cx("f7 marine-700 outline-0 pointer lh1 hover-primary-500", { "primary-500": isSelected })}
                            type="button"
                            data-testid={`date-range-picker-presets-${preset.text}`}
                        >
                            {preset.text}
                        </button>
                    </Otherwise>
                </Choose>

                <style jsx>{`
                    button {
                        background-color: transparent;
                        border: none;
                        padding: 0;
                    }
                `}</style>
            </li>
        );
    }
}

export class DateRangePickerPresets extends PureComponent {
    static propTypes = {
        /**
         * A controlled start date value.
         */
        startDate: object,
        /**
         * A controlled end date value.
         */
        endDate: object,
        /**
         * The minimum (inclusive) date available for selection.
         */
        minDate: object,
        /**
         * The maximum (inclusive) date available for selection.
         */
        maxDate: object,
        /**
         * Called when a preset is selected.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} preset - The selected preset.
         * @param {object} props - All the props.
         */
        onSelectPreset: func,
        /**
         * Array of pre-determined dates range.
         */
        presets: arrayOf(shape(PRESET_SHAPE)),
        /**
         * A custom React SVG component displayed on top of the presets list.
         */
        icon: node,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        icon: <PresetsCalendarIcon className="w8 h8 fill-marine-500" />
    }

    isDayBlocked = day => {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            return day.isBefore(minDate, "day") || day.isAfter(maxDate, "day");
        }

        if (!isNil(minDate)) {
            return day.isBefore(minDate, "day");
        }

        if (!isNil(maxDate)) {
            return day.isAfter(maxDate, "day");
        }

        return false;
    };

    isPresetBlocked(preset) {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) || !isNil(maxDate)) {
            return this.isDayBlocked(preset.startDate) || this.isDayBlocked(preset.endDate);
        }

        return false;
    }

    isPresetSelected(preset) {
        const { startDate, endDate } = this.props;

        return isSameDay(preset.startDate, startDate) && isSameDay(preset.endDate, endDate);
    }

    getCssClasses() {
        const { className } = this.props;

        return mergeClasses(
            "presets flex flex-column pt8 ph8 br b--cloud-100",
            className
        );
    }

    renderPresets() {
        const { onSelectPreset, presets } = this.props;

        return presets.map(x => {
            const isSelected = this.isPresetSelected(x);
            const isBlocked = this.isPresetBlocked(x);

            return <Preset key={x.text} preset={x} onSelectPreset={onSelectPreset} isSelected={isSelected} isBlocked={isBlocked} />;
        });
    }

    render() {
        const { presets, icon } = this.props;

        if (presets.length > 0) {
            return (
                <div className={this.getCssClasses()}>
                    <div className="self-center mb7">{icon}</div>
                    <ul>{this.renderPresets()}</ul>

                    <style jsx>{`
                        ul {
                            padding: 0;
                            margin: 0;
                            list-style-type: none;
                        }
                        .presets {
                            min-width: 200px;
                        }
                    `}</style>
                </div>
            );
        }

        return null;
    }
}
