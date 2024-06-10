import * as React from "react";
import { BarGraphProps, BarProps } from "./types";
declare const BarGraph: React.ForwardRefExoticComponent<BarGraphProps & React.RefAttributes<HTMLDivElement>>;
declare const Bar: React.ForwardRefExoticComponent<BarProps & React.RefAttributes<HTMLDivElement>>;
declare const BarLabel: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { BarGraph, Bar, BarLabel };
