import { PRESET_SHAPE } from "./presets";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, object, shape, string } from "prop-types";
import { isNil } from "lodash";
import { isSameDay } from "./utils";
import cx from "classnames";

class Preset extends PureComponent {
    static propTypes = {
        preset: shape(PRESET_SHAPE).isRequired,
        onSelectPreset: func,
        isSelected: bool,
        isBlocked: bool
    };

    handleClick = event => {
        const { preset, onSelectPreset } = this.props;

        onSelectPreset(event, preset);
    };

    render() {
        const { preset, isSelected, isBlocked } = this.props;

        return (
            <li className="pa2 mb2 lh-solid">
                <Choose>
                    <When condition={isBlocked}>
                        <span className="f7 cloud-400 outline-0">{preset.text}</span>
                    </When>
                    <Otherwise>
                        <button
                            type="button"
                            onClick={this.handleClick}
                            className={cx("f7 marine-700 outline-0 pointer hover-primary-500", { "primary-500": isSelected })}
                        >
                            {preset.text}
                        </button>
                    </Otherwise>
                </Choose>

                <style jsx>{`
                    li {

                    }
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
        startDate: object,
        endDate: object,
        minDate: object,
        maxDate: object,
        onSelectPreset: func,
        presets: arrayOf(shape(PRESET_SHAPE)),
        icon: node,
        className: string
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
            return this.isDayBlocked(preset.startDate) && this.isDayBlocked(preset.endDate);
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
        const { presets, icon, className } = this.props;

        const defaultClasses = "presets flex flex-column pt8 ph8 br b--cloud-100";
        const classes = isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;

        if (presets.length > 0) {
            return (
                <div className={classes}>
                    <div className="self-center mb8">{icon}</div>
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
