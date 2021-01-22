import "./date-range-picker-presets.css";

import { Button } from "../../../button";
import { Icon } from "../../../icons";
import { PresetsCalendarIcon } from "../assets";
import { PureComponent } from "react";
import { arrayOf, bool, func, object, shape, string } from "prop-types";
import { isNil } from "lodash";
import { isSameDay } from "../shared";
import { mergeClasses } from "../../../shared";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
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

        const classes = mergeClasses(
            "ma1",
            isSelected && "primary-500"
        );

        return (
            <li className="flex justify-center pa1 mb2 lh1">
                <Choose>
                    <When condition={isBlocked}>
                        <span className="f7 cloud-400 outline-0">{preset.text}</span>
                    </When>
                    <Otherwise>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={this.handleClick}
                            className={classes}
                            data-testid={`date-range-picker-presets-${preset.text}`}
                        >
                            {preset.text}
                        </Button>
                    </Otherwise>
                </Choose>
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
        presets: arrayOf(shape(PRESET_SHAPE))
    };

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

    renderPresets() {
        const { onSelectPreset, presets } = this.props;

        return presets.map(x => {
            const isSelected = this.isPresetSelected(x);
            const isBlocked = this.isPresetBlocked(x);

            return <Preset key={x.text} preset={x} onSelectPreset={onSelectPreset} isSelected={isSelected} isBlocked={isBlocked} />;
        });
    }

    render() {
        const { presets, className } = this.props;

        if (presets.length > 0) {
            const classes = mergeClasses(
                "o-ui presets flex flex-column pt8 ph8 br o-ui-border-1",
                className
            );

            return (
                <div className={classes}>
                    <div className="self-center mb6">
                        <Icon type={PresetsCalendarIcon} size="xl" className="fill-marine-900" />
                    </div>
                    <ul className="values">
                        {this.renderPresets()}
                    </ul>
                </div>
            );
        }

        return null;
    }
}
