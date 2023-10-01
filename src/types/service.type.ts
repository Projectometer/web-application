export interface TineOptions {
    showMonthLabel: boolean;
    shortMonthLabel: boolean;
    shortWeekdayLabel: boolean;
    hour24Format: boolean;
    intervalHeight: number;
    intervalHeightMontgly: number;
    dayHeightMontgly: number;
    resourceHeightScheduler: number;
    resourceWidthScheduler: number;
    locale: string;
}

export interface LocalesItem {
    value: string;
    label: string;
}
export type CalendarAlign = 'left' | 'center' | 'right';
export type CalendarDateType = 'round' | 'rounded' | 'square';
export type CalendarFocusType =
    | 'day'
    | 'date'
    | 'weekday'
    | 'interval'
    | 'resource';
export type CalendarDateHeader = 'stacked' | 'inline' | 'inverted';
export type CalendarView = 'day' | 'week' | 'month';
export type CalendarMode =
    | 'day'
    | 'month'
    | 'agenda'
    | 'resource'
    | 'scheduler'
    | 'task';
export type CalendarAnimation =
    | 'roll-right'
    | 'slide-right'
    | 'jump-right'
    | 'fade'
    | 'roll-left'
    | 'slide-left'
    | 'jump-left'
    | 'scale'
    | 'roll-up'
    | 'slide-up'
    | 'jump-up'
    | 'rotate'
    | 'roll-down'
    | 'slide-down'
    | 'jump-down'
    | 'spin'
    | 'flip';

export interface ReportType {
    start_date: string;
    end_date: string;
    project_id: string;
    title: string;
    company_id: string;
    tags: string[];
}
