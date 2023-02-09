import { useEffect, useMemo } from "react";
import { useControllableState } from "../../shared";

export interface OverlayTriggerState {
    readonly isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const tooltips:Record<string, () => void> = {};
let tooltipId = 0;


/*
 * Manages state for a tooltip trigger. Tracks whether the tooltip is open, and provides
 * methods to toggle this state. Ensures only one tooltip is open at a time
*/
export function useTooltipTriggerState(defaultOpen: boolean, open: boolean, defaultValue = false): OverlayTriggerState {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, defaultValue);
    const id = useMemo(() => `${++tooltipId}`, []);

    const ensureTooltipEntry = () => {
        tooltips[id] = () => setIsOpen(false);
    };

    const closeOpenTooltips = () => {
        for (const hideTooltipId in tooltips) {
            if (hideTooltipId !== id) {
                tooltips[hideTooltipId]();
                delete tooltips[hideTooltipId];
            }
        }
    };

    useEffect(() => {
        return () => {
            const tooltip = tooltips[id];
            if (tooltip) {
                delete tooltips[id];
            }
        };
    }, [id]);

    return {
        isOpen,
        setIsOpen: (value: boolean) => {
            if (value) {
                setIsOpen(true);
                closeOpenTooltips();
                ensureTooltipEntry();
            } else {
                setIsOpen(false);
            }
        }
    };
}
