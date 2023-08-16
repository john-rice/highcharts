/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type ColorString from '../../Core/Color/ColorString';
import type Globals from '../Globals';


/* *
 *
 *  Declarations
 *
 * */


export interface AccessibilityOptions extends Globals.AnyRecord {

}

export interface AnimationOptions extends Globals.AnyRecord {
}

export interface Axis {
    coll: AxisCollectionKey;
    dateTime?: unknown;
    hasNames?: boolean;
    max: (number|null);
    min: (number|null);
    names: Array<string>;
    options: Axis;
    series: Array<Series>;
    setExtremes(
        newMin?: number,
        newMax?: number,
        redraw?: boolean,
        animation?: (boolean|Partial<AnimationOptions>),
        eventArguments?: any
    ): void;
    update(
        options: Partial<AxisOptions>,
        redraw?: boolean
    ): void;
}

export type AxisCollectionKey = ('colorAxis'|'xAxis'|'yAxis'|'zAxis');

export interface AxisExtremesObject {
    dataMax: number;
    dataMin: number;
    max: number;
    min: number;
    userMax?: number;
    userMin?: number;
}

export interface AxisOptions extends Globals.AnyRecord {
    id?: string;
    events?: EventsOptionsFor<Axis>;
}

export interface BBoxObject extends PositionObject, SizeObject {
}

export interface Chart {
    /* eslint-disable-next-line  @typescript-eslint/no-misused-new */
    new (
        renderTo: (string|globalThis.HTMLElement),
        options: Partial<Options>,
        callback?: Function
    ): Chart;
    axes: Array<Axis>;
    chartHeight: number;
    chartWidth: number;
    margin: Array<number>;
    navigator?: Navigator;
    options: Options;
    plotHeight: number;
    plotWidth: number;
    resetZoomButton?: DOMElement;
    series: Array<Series>;
    tooltip: Tooltip;
    userOptions: Partial<Options>;
    xAxis: Array<Axis>;
    yAxis: Array<Axis>;
    addSeries(
        options: SeriesOptions,
        redraw?: boolean,
        animation?: (boolean|Partial<AnimationOptions>)
    ): Series;
    destroy(): void;
    redraw(
        animation?: (boolean|Partial<AnimationOptions>)
    ): void;
    reflow(
        e?: Event
    ): void;
    setSize(
        width?: (number|null),
        height?: (number|null),
        animation?: (boolean|Partial<AnimationOptions>)
    ): void;
    showResetZoom(): void;
    update(
        options: Partial<Options>,
        redraw?: boolean,
        oneToOne?: boolean,
        animation?: (boolean|Partial<AnimationOptions>)
    ): void;
    zoomOut(): void;
}

export interface ChartOptions extends Globals.AnyRecord {
    animation?: (boolean|AnimationOptions);
    backgroundColor?: ColorString;
    events?: EventsOptionsFor<Chart>;
    type?: string;
}

export interface CreditsOptions extends Globals.AnyRecord {
    enabled?: boolean;
}

export interface DOMElement {
    element: Element;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
    getBBox(
        reload?: boolean,
        rot?: number
    ): BBoxObject
}

export type EventsOptionsFor<T> = Partial<Record<string, ((this: T) => void)>>;

export interface LangOptions {
    [key: string]: (string|LangOptions|undefined);
}

export interface LegendOptions extends Globals.AnyRecord {
    enabled?: boolean;
}

export interface Navigator {
    chart: Chart;
    navigatorSeries: Series;
    height: number;
    options: NavigatorOptions;
    scrollbarHeight: number;
    series?: Array<Series>;
    xAxis: Axis;
    yAxis: Axis;
    update(
        options: Partial<NavigatorOptions>
    ): void;
}

export interface NavigatorOptions extends Globals.AnyRecord {
    enabled?: boolean;
}

export interface Options extends Globals.AnyRecord {
    accessibility?: AccessibilityOptions;
    chart?: ChartOptions;
    credits?: CreditsOptions;
    lang?: LangOptions;
    legend?: LegendOptions;
    navigator?: NavigatorOptions;
    plotOptions?: Record<string, Omit<SeriesOptions, ('data'|'id'|'name')>>;
    series?: Array<SeriesOptions>;
    sonification?: SonificationOptions;
    title?: TitleOptions;
    tooltip?: TooltipOptions;
    xAxis?: AxisOptions;
    yAxis?: AxisOptions;
}

export interface Point {
    index: number;
    isInside?: boolean;
    x: number;
    y: (number|null);
    series: Series;
}

export interface PointOptions extends Globals.AnyRecord {
    events?: EventsOptionsFor<Point>;
}

export type PointShortOptions = (
    number|
    string|
    Array<(number|string|null)>|
    null
);

export interface PositionObject {
    x: number;
    y: number;
}

export interface Series {
    /* eslint-disable-next-line  @typescript-eslint/no-misused-new */
    new (options: SeriesOptions): Series;
    data: Array<PointShortOptions>;
    options: SeriesOptions;
    points: Array<Point>;
    type: string;
    visible?: boolean;
    destroy(): void;
    remove(
        redraw?: boolean,
        animation?: (boolean|Partial<AnimationOptions>),
        withEvent?: boolean,
        keepEvents?: boolean
    ): void;
    setData(
        data: Array<(PointOptions|PointShortOptions)>,
        redraw?: boolean,
        animation?: (boolean|Partial<AnimationOptions>),
        updatePoints?: boolean
    ): void;
    setVisible(
        vis?: boolean,
        redraw?: boolean
    ): void;
    update(
        options: Partial<SeriesOptions>,
        redraw?: boolean
    ): void;
}

export interface SeriesMarkerOptions extends Globals.AnyRecord {
    enabled?: boolean;
}

export interface SeriesOptions extends Globals.AnyRecord {
    data?: Array<(PointOptions|PointShortOptions)>;
    id?: string;
    events?: EventsOptionsFor<Series>;
    name?: string;
    marker?: SeriesMarkerOptions;
    point?: PointOptions;
    type?: string;
}

export interface SizeObject {
    height: number;
    width: number;
}

export interface SonificationOptions extends Globals.AnyRecord {

}

export interface TitleOptions extends Globals.AnyRecord {
    text?: string;
}

export interface Tooltip {
    options: TooltipOptions;
    hide(
        delay?: number
    ): void;
    refresh(
        pointOrPoints: (Point|Array<Point>),
        mouseEvent?: PointerEvent
    ): void;
}

export interface TooltipOptions extends Globals.AnyRecord {
    outside?: boolean;
}


/* *
 *
 *  Namespace
 *
 * */


export declare namespace Highcharts {

    export function chart(
        renderTo: (string|globalThis.HTMLElement),
        options: Partial<Options>,
        callback?: Function
    ): Chart;

    export function ganttChart(
        renderTo: (string|globalThis.HTMLElement),
        options: Partial<Options>,
        callback?: Function
    ): Chart;

    export function mapChart(
        renderTo: (string|globalThis.HTMLElement),
        options: Partial<Options>,
        callback?: Function
    ): Chart;

    export function stockChart(
        renderTo: (string|globalThis.HTMLElement),
        options: Partial<Options>,
        callback?: Function
    ): Chart;

}


/* *
 *
 *  Default Export
 *
 * */


export default Highcharts;
