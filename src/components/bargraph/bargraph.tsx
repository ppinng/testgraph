import * as React from "react";
import { cn } from "../../lib/utils";
import { BarGraphProps, BarValue, BarProps } from "./types";

const BarGraph = React.forwardRef<HTMLDivElement, BarGraphProps>(
  ({ className, children, maxValue, ...props }, ref) => {
    const bars = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<BarProps> =>
        React.isValidElement(child)
    );

    const highestValue =
      maxValue ||
      Math.max(
        ...bars.map((bar) =>
          bar.props.values.reduce(
            (acc: number, val: { value: number }) => acc + val.value,
            0
          )
        )
      );
    const yAxisLabels = Array.from(
      { length: 5 },
      (_, i) => (highestValue / 4) * (4 - i)
    );

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center w-full p-4", className)}
        {...props}
      >
        <div className="flex w-full">
          <div className="flex flex-col items-center mr-2">
            {yAxisLabels.map((label, index) => (
              <div key={index} className="flex-1 w-full text-right pr-2">
                {label.toFixed(0)}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full h-64 border-b-2 border-gray-300 items-end">
              {bars.map((child) =>
                React.cloneElement(child, {
                  style: {
                    ...child.props.style,
                    height: "100%",
                  },
                  highestValue,
                })
              )}
            </div>
            <div className="flex w-full mt-2">
              {bars.map((bar, index) => (
                <div key={index} className="flex-1 text-center">
                  {bar.props.label && (
                    <BarLabel className={bar.props.labelclassname}>
                      {bar.props.label}
                    </BarLabel>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
BarGraph.displayName = "BarGraph";

const Bar = React.forwardRef<HTMLDivElement, BarProps>(
  ({ className, values, highestValue, colors, ...props }, ref) => {
    const totalValue = values.reduce((acc, val) => acc + val.value, 0);
    return (
      <div
        ref={ref}
        className={cn("flex-1 mx-1 flex items-end relative", className)}
        {...props}
      >
        {values.map((segment, segmentIndex) => (
          <div
            key={segmentIndex}
            className={cn(
              segment.colorClassName,
              "w-full transition-all duration-300"
            )}
            style={{
              height: highestValue
                ? `${(segment.value / highestValue) * 100}%`
                : "auto",
              backgroundColor:
                colors && colors[segmentIndex]
                  ? colors[segmentIndex]
                  : "inherit",
            }}
            title={`${segment.label}: ${segment.value}`}
          ></div>
        ))}
      </div>
    );
  }
);
Bar.displayName = "Bar";

const BarLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center mt-2 text-sm", className)}
    {...props}
  >
    {children}
  </div>
));
BarLabel.displayName = "BarLabel";

export { BarGraph, Bar, BarLabel };
