import { CalendarView } from './service.type';

export interface CalenderOptionsData {
    calendarTimeShape: string;
    selectedCalendarShape: CalendarView;
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
    keyValue?: any;
    maxDays?: number;
    bordered?: boolean;
    onDragOver?: boolean;
    onDrop?: boolean;
    weekdays?: number[];
    showDayOfYearLabel?: boolean;
    direction?: string;
    hideHeader?: boolean;
    noScroll?: boolean;
    shortIntervalLabel?: boolean;
    resourceHeight?: number;
    resourceWidth?: number;
    dayHeight?: number;
    showWorkWeeks?: boolean;
    noDefaultHeaderBtn?: boolean;
    noDefaultHeaderText?: boolean;
    resources?: boolean;
    intervalRange?: { min: number; max: number };
    intervalRangeStep?: number;
    fiveDayWorkWeek?: boolean;
    firstDayMonday?: boolean;
}
export const CalenderOptionsDataDefault: CalenderOptionsData = {
    calendarTimeShape: '30',
    selectedCalendarShape: 'week',
    showMonthLabel: true,
    shortMonthLabel: false,
    shortWeekdayLabel: false,
    hour24Format: false,
    intervalHeight: 30,
    intervalHeightMontgly: 20,
    dayHeightMontgly: 150,
    resourceHeightScheduler: 20,
    resourceWidthScheduler: 20,
    locale: 'de',
    keyValue: 0,
    direction: 'next',
    showDayOfYearLabel: false,

    weekdays: [0, 1, 2, 3, 4, 5, 6],

    maxDays: 1,
    bordered: false,
    fiveDayWorkWeek: false,
    firstDayMonday: false,
    shortIntervalLabel: false,
    hideHeader: false,
    noScroll: false,
    showWorkWeeks: false,
    noDefaultHeaderBtn: false,
    noDefaultHeaderText: false,
    intervalRange: { min: 0, max: 24 },
    intervalRangeStep: 1,
    resourceHeight: 60,
    resourceWidth: 100,
    dayHeight: 100,
};

export interface CalenderEvent {
    id: string;
    title: string;
    details: string;
    date: string;
    time: string;
    duration: number;
    bgcolor: string;
    bg_color?: string;
    icon: string;
    days?: number;
    side?: string;
    allDay?: boolean;
    all_day?: boolean;
    tags?: string[] | { id: string; tag: string }[];
    start: string;
    company_id?: string;
    project_id?: string;
    project?: {
        id: string;
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
    company?: {
        id: string;
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
    end: string;
    user_id: string;
}
export interface CalenderEventList {
    id?: string;
    title: string;
    details: string;
    date: string;
    time: string;
    duration: number;
    bgcolor: string;
    icon: string;
    days: number;
    side?: string;
    allDay?: boolean;
    tags?: string[];
}
