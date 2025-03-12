import { useTooltip } from "../core/hooks/useTooltip";
import { ChartData, CustomTooltipProps } from "../core/types";

interface TooltipProps<T extends ChartData = ChartData> {
  tooltip: CustomTooltipProps<T>;
  width: number;
  TooltipComponent?: React.ComponentType<CustomTooltipProps<T>>;
}

const Tooltip = <T extends { label: string | Date; value: number }>({
  tooltip,
  width,
  TooltipComponent,
}: TooltipProps<T>) => {
  const { tooltipRef, tooltipPos } = useTooltip(tooltip, width);
  return (
    <>
      {TooltipComponent && tooltip.visible && (
        <div
          ref={tooltipRef}
          className="absolute"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          <TooltipComponent {...tooltip} />
        </div>
      )}
    </>
  );
};

export default Tooltip;
