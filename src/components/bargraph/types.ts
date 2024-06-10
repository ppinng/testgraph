export type BarGraphProps = {
    children: React.ReactNode;
    maxValue?: number;
    className?: string;
  };
  
  export type BarValue = {
    value: number;
    colorClassName: string;
    label?: string;
  };
  
  export interface BarProps extends React.ComponentPropsWithoutRef<"div"> {
    values: BarValue[];
    label: string;
    labelclassname?: string;
    highestValue?: number;
    colors: string[];
  };