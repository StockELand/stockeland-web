import clsx from "clsx";
import { useChartDimensions } from "../core/hooks/useChartDimensions";
import Tooltip from "../components/Tooltip";
import { ChartProps } from "../core/types";

const ChartBase = <T extends { label: string | Date; value: number }>({
  data,
  useChartHook,
  strokeColor = "text-sinature2",
  TooltipComponent,
  className = "",
  margin = { bottom: 10, left: 10, right: 10, top: 10 },
}: ChartProps<T>) => {
  const { ref, size, innerSize } = useChartDimensions(margin);
  const { svgRef, tooltip } = useChartHook(
    data,
    innerSize.width,
    innerSize.height,
    margin
  );

  return (
    <div ref={ref} className={clsx(`relative w-full h-full`, className)}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        className={strokeColor}
      />
      <Tooltip
        tooltip={tooltip}
        width={size.width}
        TooltipComponent={TooltipComponent}
      />
    </div>
  );
};

export default ChartBase;
