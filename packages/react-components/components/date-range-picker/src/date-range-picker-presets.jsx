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
        isSelected: bool
    };

    handleClick = event => {
        const { preset, onSelectPreset } = this.props;

        onSelectPreset(event, preset);
    };

    render() {
        const { preset, isSelected } = this.props;

        return (
            <li>
                {/* prettier-ignore */}
                <button
                    type="button"
                    onClick={this.handleClick}
                    className={cx("f7 jet-dark lh-solid pa2 mb2 outline-0 pointer hover-primary", { primary: isSelected })}
                >
                    {preset.text}
                </button>
            </li>
        );
    }
}

export class DateRangePickerPresets extends PureComponent {
    static propTypes = {
        startDate: object,
        endDate: object,
        onSelectPreset: func,
        presets: arrayOf(shape(PRESET_SHAPE)),
        icon: node,
        className: string
    };

    renderPresets() {
        const { startDate, endDate, onSelectPreset, presets } = this.props;

        return presets.map(x => {
            const isSelected = isSameDay(x.startDate, startDate) && isSameDay(x.endDate, endDate);

            return <Preset key={x.text} preset={x} onSelectPreset={onSelectPreset} isSelected={isSelected} />;
        });
    }

    render() {
        const { presets, icon, className } = this.props;

        const defaultClasses = "presets flex flex-column pt8 ph8 br b--cloud-light";
        const classes = isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;

        if (presets.length > 0) {
            return (
                <div className={classes}>
                    <div className="self-center mb8">{icon}</div>
                    <ul>{this.renderPresets()}</ul>

                    <style jsx>{`
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
