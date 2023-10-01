<template>
    <q-calendar
        class="corners full-height"
        ref="clander"
        :model-value="selectedDate"
        @update:model-value="(e) => onUpdateDate(e)"
        :dark="dark"
        :bordered="bordered"
        :locale="locale"
        :now="now"
        :weekdays="weekdays"
        :date-type="dateType"
        :weekday-align="weekdayAlign"
        :date-align="dateAlign"
        :no-active-date="noActiveDate"
        :disabled-days="disabledDays"
        :disabled-before="disabledBefore"
        :disabled-after="disabledAfter"
        :disabled-weekdays="disabledWeekdays"
        :no-header="noHeader"
        :no-scroll="noScroll"
        :labels="labels"
        :short-weekday-label="shortWeekdayLabel"
        :min-weekday-length="minWeekdayLength"
        :weekday-breakpoints="weekdayBreakpoints"
        :animated="animated"
        :transition-prev="transitionPrev"
        :transition-next="transitionNext"
        :hoverable="hoverable"
        :focusable="focusable"
        :focus-type="focusType"
        :selected-dates="selectedDates"
        :selected-start-end-dates="selectedStartEndDates"
        :mode="mode"
        :drag-enter-func="onDragEnter"
        :drag-over-func="onDragOver"
        :drag-leave-func="onDragleave"
        :drop-func="onDrop"
        :cell-width="dayCellWidth"
        :day-height="dayHeight"
        :day-min-height="dayMinHeight"
        :no-aria="noAria"
        :use-navigation="useNavigation"
        :date-header="dateHeader"
        :weekday-class="getWeekdayClass"
        :weekday-style="getWeekdayStyle"
        :max-days="maxDays"
        :view="view"
        :no-default-header-btn="noDefaultHeaderBtn"
        :no-default-header-text="noDefaultHeaderText"
        :hour24-format="hour24Format"
        :interval-count="intervalCount"
        :interval-height="intervalHeight"
        :interval-="intervalStart"
        :interval-minutes="intervalMinutes"
        @change="onChange"
        @moved="onMoved"
        @click-date="onClickDate"
        @click-time="onClickTime"
        @click-interval="onClickInterval"
        @click-head-intervals="onClickHeadIntervals"
        @click-head-day="onClickHeadDay"
    />
</template>
<script setup lang="ts">
import { QCalendar } from '@quasar/quasar-ui-qcalendar';
import {
    CalendarAlign,
    CalendarAnimation,
    CalendarDateHeader,
    CalendarDateType,
    CalendarFocusType,
    CalendarMode,
    CalendarView,
} from 'src/types';

interface MyProps {
    selectedDate: string;
    dark?: boolean;
    bordered?: boolean;
    locale?: string;
    now?: string;
    weekdays?: number[];
    dateType?: CalendarDateType;
    weekdayAlign?: CalendarAlign;
    dateAlign?: CalendarAlign;
    noActiveDate?: boolean;
    disabledDays?: string[];
    disabledBefore?: string;
    disabledAfter?: string;
    disabledWeekdays?: number[];
    noHeader?: boolean;
    noScroll?: boolean;
    labels?: string[];
    shortWeekdayLabel?: boolean;
    minWeekdayLength?: number | string;
    weekdayBreakpoints?: number[];
    animated?: boolean;
    transitionPrev?: CalendarAnimation;
    transitionNext?: CalendarAnimation;
    hoverable?: boolean;
    focusable?: boolean;
    focusType?: CalendarFocusType[];
    selectedDates?: string[];
    selectedStartEndDates?: string[];
    mode?: CalendarMode;
    dayCellWidth?: string;
    dayHeight?: number | string;
    dayMinHeight?: number | string;
    noAria?: boolean;
    useNavigation?: boolean;
    dateHeader?: CalendarDateHeader;
    maxDays?: number | string;
    view?: CalendarView;
    noDefaultHeaderBtn?: boolean;
    noDefaultHeaderText?: boolean;
    hour24Format?: boolean;
    intervalCount?: number | string;
    intervalHeight?: number | string;
    intervalStart?: number | string;
    intervalMinutes?: number | string;
}
withDefaults(defineProps<MyProps>(), {
    dark: false,
    bordered: false,
    locale: 'en-Us',
    weekdays: () => [0, 1, 2, 3, 4, 5, 6],
    dateType: 'round',
    weekdayAlign: 'center',
    dateAlign: 'right',
    noActiveDate: false,
    noHeader: false,
    transitionPrev: 'slide-right',
    transitionNext: 'slide-left',
    mode: 'day',
    view: 'day',
    hour24Format: true,
});
const emit = defineEmits(['on-update-date']);
const onUpdateDate = function (value: string) {
    emit('on-update-date', value);
};
const onDragEnter = function () {
    //
};
const onDragOver = function () {
    //
};
const onDragleave = function () {
    //
};
const onDrop = function () {
    //
};
const getWeekdayClass = function () {
    return { 'my-class': true };
};
const getWeekdayStyle = function () {
    return { color: '#ccc' };
};
const onChange = function () {
    //
};
const onMoved = function () {
    //
};
const onClickDate = function () {
    //
};
const onClickTime = function () {
    //
};
const onClickInterval = function () {
    //
};
const onClickHeadIntervals = function () {
    //
};
const onClickHeadDay = function () {
    //
};
</script>
