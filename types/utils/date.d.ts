export interface Day {
    d: number;
    current?: boolean;
    shadowDay: boolean;
    m?: number;
    y?: number;
}
export interface PickerDay extends Day {
    timestamp: number;
}
export interface DateDay {
    y: number;
    m: number;
    d: number;
}
export declare const getPreM: (y: number, m: number) => {
    y: number;
    m: number;
};
export declare const getNextM: (y: number, m: number) => {
    y: number;
    m: number;
};
export declare const getDays: ({ m, y, d, }: {
    y: number;
    m: number;
    d?: number | undefined;
}) => Day[];
export declare const getDateDay: (date: Date) => DateDay;
export declare const timeStampDay: (day: Day) => number;
export declare const isGreater: (day: Day, compareDay: Day) => boolean;
