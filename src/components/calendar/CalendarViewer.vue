<template>
    <q-scroll-area
        class="clx-height1"
        v-if="modelValue.selectedCalendarShape.toLowerCase() == 'month'"
    >
        <q-calendar-month
            ref="calendar"
            :key="modelValue.keyValue"
            v-touch-swipe.mouse.left.right="handleSwipe"
            :model-value="selectDate"
            header
            @update:model-value="(e:string) => onUpdateDate(e)"
            :locale="modelValue.locale"
            class="corners calendar"
            :interval-minutes="modelValue.calendarTimeShape"
            :interval-height="modelValue.intervalHeight"
            month-label-size="md"
            date-align="right"
            :short-month-label="modelValue.shortMonthLabel"
            :show-month-label="modelValue.showMonthLabel"
            :short-weekday-label="modelValue.shortWeekdayLabel"
            :interval-count="intervalCount()"
            :day-height="modelValue.dayHeightMontgly"
            :hour24-format="modelValue.hour24Format"
            :show-curent-time="
                modelValue.selectedCalendarShape.toLowerCase() != 'month'
            "
            hoverable
            animated
            @change="onChangeDate"
            @moved="onMoved"
            @click-date="onClickDate"
            @click-time="onClickTime"
            @click-interval="onClickInterval"
            @click-head-intervals="onClickHeadIntervals"
            @click-head-day="onClickHeadDay"
        >
            <!-- :drag-leave-func="onDragLeave"
            :drop-func="onDrop" -->
            <!-- :drag-over-func="onDragOver"
            :drag-enter-func="onDragEnter"-->
            <template
                #day-body="{
                    scope: { timestamp, timeStartPos, timeDurationHeight },
                }"
            >
                <template
                    v-for="event in getEvents(timestamp.date)"
                    :key="event.id"
                >
                    <q-badge
                        v-if="event.time"
                        @click.stop.prevent="onEventSelect(event)"
                        class="my-event"
                        :class="badgeClasses(event, 'body')"
                        :style="
                            badgeStyles(
                                event,
                                'body',
                                timeStartPos,
                                timeDurationHeight
                            )
                        "
                        :draggable="true"
                    >
                        <!-- @dragstar="(e:any) => onDragStart(e, event)"
                        @dragenter="(e:any) => onDragEnter(e, event)"
                        @dragend="(e:any) => onDragEnd(e, event)" -->
                        <q-icon
                            v-if="!!event.icon"
                            :name="event.icon"
                            class="q-mr-xs"
                            :size="event.duration > 25 ? 'sm' : 'xs'"
                        ></q-icon
                        ><span
                            class="ellipsis"
                            :class="event.duration > 25 ? 'text-subtitle1' : ''"
                            >{{ event.title }}</span
                        >
                    </q-badge>
                </template>
            </template>
            <template #day-container="{ scope: { days } }">
                <template v-if="hasDate(days)">
                    <div
                        class="day-view-current-time-indicator"
                        :style="style"
                    />
                    <div class="day-view-current-time-line" :style="style" />
                </template>
            </template>
            <template #week="{ scope: { week, weekdays, month } }">
                {{ month }}
                <template
                    v-for="(computedEvent, index) in getWeekEvents(
                        week,
                        weekdays
                    )"
                    :key="index"
                >
                    <div
                        :class="badgeClassesWeek(computedEvent)"
                        :style="badgeStylesWeek(computedEvent, week.length)"
                        @click="onEventSelect(computedEvent.event)"
                    >
                        <div
                            v-if="
                                computedEvent.event &&
                                computedEvent.event.details
                            "
                            class="title q-calendar__ellipsis"
                            :draggable="true"
                            @dragstart="(e:Event) => onDragStart(e, computedEvent.event)"
                            @dragend="(e:Event) => onDragEnd(e, computedEvent.event)"
                            @dragenter="(e:Event) => onDragEnter(e, computedEvent.event)"
                            @touchmove="(e:Event) => {}"
                        >
                            <q-icon
                                v-if="!!computedEvent.event.icon"
                                :name="computedEvent.event.icon"
                                class="q-mr-xs"
                                size="sm"
                            ></q-icon>
                            {{
                                computedEvent.event.title +
                                (computedEvent.event.time
                                    ? ' - ' + computedEvent.event.time
                                    : '')
                            }}
                            <q-tooltip>{{
                                computedEvent.event.details
                            }}</q-tooltip>
                        </div>
                    </div>
                </template>
            </template>
        </q-calendar-month>
    </q-scroll-area>
    <div style="display: flex" class="clx-height1">
        <q-calendar
            v-if="modelValue.selectedCalendarShape.toLowerCase() != 'month'"
            ref="calendar"
            :key="modelValue.keyValue"
            v-touch-swipe.mouse.left.right="handleSwipe"
            :model-value="selectDate"
            header
            @update:model-value="(e:string) => onUpdateDate(e)"
            :view="modelValue.selectedCalendarShape.toLowerCase()"
            :mode="modelValue.selectedCalendarShape.toLowerCase()"
            :locale="modelValue.locale"
            class="corners calendar"
            :interval-minutes="modelValue.calendarTimeShape"
            :interval-height="modelValue.intervalHeight"
            :short-month-label="modelValue.shortMonthLabel"
            :short-weekday-label="modelValue.shortWeekdayLabel"
            :interval-count="intervalCount()"
            :day-height="modelValue.dayHeightMontgly"
            :hour24-format="modelValue.hour24Format"
            :show-month-label="modelValue.showMonthLabel"
            :show-curent-time="
                modelValue.selectedCalendarShape.toLowerCase() != 'month'
            "
            hoverable
            animated
            @change="onChangeDate"
            @moved="onMoved"
            @click-date="onClickDate"
            @click-time="onClickTime"
            @click-interval="onClickInterval"
            @click-head-intervals="onClickHeadIntervals"
            @click-head-day="onClickHeadDay"
        >
            <!-- :drag-leave-func="onDragLeave"
            :drop-func="onDrop" -->
            <!-- :drag-over-func="onDragOver"
            :drag-enter-func="onDragEnter"-->
            <template
                #day-body="{
                    scope: { timestamp, timeStartPos, timeDurationHeight },
                }"
            >
                <template
                    v-for="event in getEvents(timestamp.date)"
                    :key="event.id"
                >
                    <q-badge
                        v-if="event.time"
                        @click.stop.prevent="onEventSelect(event)"
                        class="my-event"
                        :class="badgeClasses(event, 'body')"
                        :style="
                            badgeStyles(
                                event,
                                'body',
                                timeStartPos,
                                timeDurationHeight
                            )
                        "
                        :draggable="true"
                    >
                        <!-- @dragstar="(e:any) => onDragStart(e, event)"
                        @dragenter="(e:any) => onDragEnter(e, event)"
                        @dragend="(e:any) => onDragEnd(e, event)" -->
                        <q-icon
                            v-if="!!event.icon"
                            :name="event.icon"
                            class="q-mr-xs"
                            :size="event.duration > 25 ? 'sm' : 'xs'"
                        ></q-icon
                        ><span
                            class="ellipsis"
                            :class="event.duration > 25 ? 'text-subtitle1' : ''"
                            >{{ event.title }}</span
                        >
                    </q-badge>
                </template>
            </template>
            <template #day-container="{ scope: { days } }">
                <template v-if="hasDate(days)">
                    <div
                        class="day-view-current-time-indicator"
                        :style="style"
                    />
                    <div class="day-view-current-time-line" :style="style" />
                </template>
            </template>
            <template #week="{ scope: { week, weekdays, month } }">
                {{ month }}
                <template
                    v-for="(computedEvent, index) in getWeekEvents(
                        week,
                        weekdays
                    )"
                    :key="index"
                >
                    <div
                        :class="badgeClassesWeek(computedEvent)"
                        :style="badgeStylesWeek(computedEvent, week.length)"
                        @click="onEventSelect(computedEvent.event)"
                    >
                        <div
                            v-if="
                                computedEvent.event &&
                                computedEvent.event.details
                            "
                            class="title q-calendar__ellipsis"
                            :draggable="true"
                            @dragstart="(e:Event) => onDragStart(e, computedEvent.event)"
                            @dragend="(e:Event) => onDragEnd(e, computedEvent.event)"
                            @dragenter="(e:Event) => onDragEnter(e, computedEvent.event)"
                            @touchmove="(e:Event) => {}"
                        >
                            <q-icon
                                v-if="!!computedEvent.event.icon"
                                :name="computedEvent.event.icon"
                                class="q-mr-xs"
                                size="sm"
                            ></q-icon>
                            {{
                                computedEvent.event.title +
                                (computedEvent.event.time
                                    ? ' - ' + computedEvent.event.time
                                    : '')
                            }}
                            <q-tooltip>{{
                                computedEvent.event.details
                            }}</q-tooltip>
                        </div>
                    </div>
                </template>
            </template>
        </q-calendar>
        <q-dialog v-model="showAddEventDialog" persistent>
            <EventComponent
                v-model="newEvent"
                @on-add-event="onAddEvent"
            ></EventComponent>
        </q-dialog>
    </div>
</template>
<script setup lang="ts">
import {
    CalenderOptionsData,
    CalenderEvent,
    CalenderOptionsDataDefault,
} from 'src/types';
import {
    QCalendarMonth,
    QCalendar,
    addToDate,
    parseTimestamp,
    isBetweenDates,
    parsed,
    parseTime,
    parseDate,
    indexOf,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import EventComponent from 'src/components/calendar/EventComponent.vue';
import {
    Timestamp,
    daysBetween,
    isOverlappingDates,
} from '@quasar/quasar-ui-qcalendar';
import lodash from 'lodash';

interface MyProps {
    modelValue?: CalenderOptionsData;
    selectDate: string;
    events: CalenderEvent[];
}
const currentDate = ref(null);
const currentTime = ref(null);
const timeStartPos = ref(0);
let intervalId: string | number | null | NodeJS.Timeout = null;
const props = withDefaults(defineProps<MyProps>(), {
    modelValue: CalenderOptionsDataDefault,
});

const eventsMap = (): { [key: string]: CalenderEvent[] } => {
    const map: { [key: string]: CalenderEvent[] } = {};
    props.events.forEach((event: CalenderEvent) => {
        if (!map[event.start]) {
            map[event.start] = [];
        }
        map[event.start].push(event);
        if (event.days) {
            let timestamp: Timestamp = parseTimestamp(event.start);
            let days: number = event.days;
            do {
                timestamp = addToDate(timestamp, { day: 1 });
                if (!map[timestamp.date]) {
                    map[timestamp.date] = [];
                }
                map[timestamp.date].push(event);
            } while (--days > 0);
        }
    });
    return map;
};

const getEvents = (dt: string) => {
    let eventsRes = eventsMap()[dt] || [];
    if (eventsRes.length === 1) {
        eventsRes[0].side = 'full';
    } else if (eventsRes.length === 2) {
        const startTime = addToDate(parsed(eventsRes[0].date), {
            minute: parseTime(eventsRes[0].time),
        });
        const endTime = addToDate(startTime, {
            minute: eventsRes[0].duration,
        });
        const startTime2 = addToDate(parsed(eventsRes[1].date), {
            minute: parseTime(eventsRes[1].time),
        });
        const endTime2 = addToDate(startTime2, {
            minute: eventsRes[1].duration,
        });
        if (
            isBetweenDates(startTime2, startTime, endTime, true) ||
            isBetweenDates(endTime2, startTime, endTime, true)
        ) {
            eventsRes[0].side = 'left';
            eventsRes[1].side = 'right';
        } else {
            eventsRes[0].side = 'full';
            eventsRes[1].side = 'full';
        }
    }

    return eventsRes;
};

const badgeClasses = (event: CalenderEvent, type: string) => {
    const isHeader = type === 'header';
    return {
        ['text-white']: true,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right',
        'rounded-border': true,
    };
};
const badgeStyles = (
    event: CalenderEvent,
    type: string,
    timeStartPos: any | undefined = undefined,
    timeDurationHeight: any | undefined = undefined
): { [key: string]: string | number } => {
    const s: { [key: string]: string | number } = {};
    if (timeStartPos !== undefined && timeDurationHeight !== undefined) {
        s.top = timeStartPos(event.time) + 'px';
        s.height = timeDurationHeight(event.duration) + 'px';
    }
    s['align-items'] = event.duration <= 120 ? 'flex-center' : 'flex-start';
    s['background-color'] = event.bgcolor;
    return s;
};

const insertEvent = function (
    events: any,
    weekLength: any,
    infoWeek: any,
    index: any,
    availableDays: any,
    level: any
) {
    const iEvent = infoWeek[index];
    if (iEvent !== undefined && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
            // It is filled with empty events
            events.push({ size: iEvent.left - availableDays });
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event });

        if (level !== 0) {
            // If it goes into recursion, then the item is deleted
            infoWeek.splice(index, 1);
        }

        const currentAvailableDays = iEvent.left + iEvent.size;

        if (currentAvailableDays < weekLength) {
            const indexNextEvent = indexOf(
                infoWeek,
                (e: any) => e.id !== iEvent.id && e.left >= currentAvailableDays
            );

            insertEvent(
                events,
                weekLength,
                infoWeek,
                indexNextEvent !== -1 ? indexNextEvent : index,
                currentAvailableDays,
                level + 1
            );
        } // else: There are no more days available, end of iteration
    } else {
        events.push({ size: weekLength - availableDays });
        // end of iteration
    }
};

const getWeekEvents = function (week: any, weekdays: any) {
    const firstDay = parsed(week[0].date + ' 00:00');
    const lastDay = parsed(week[week.length - 1].date + ' 23:59');

    const eventsWeek: any = [];
    props.events.forEach((event, id) => {
        let startDate;
        let endDate;
        if (event.start.length < 16) {
            startDate = parsed(event.start + ' ' + event.time);
        } else {
            startDate = parsed(event.start);
            event.time = event.start.split(' ')[1];
        }
        if (event.end.length < 16) {
            endDate = parsed(event.end + ' 23:59');
        } else {
            endDate = parsed(event.end);
        }

        // if (startDate != null && endDate != null) {
        if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
            const left = daysBetween(firstDay, startDate);
            const right = daysBetween(endDate, lastDay);

            eventsWeek.push({
                id, // index event
                left, // Position initial day [0-6]
                right, // Number days available
                size: week.length - (left + right), // Size current event (in days)
                event, // Info
            });
        }
        // }
    });

    const events: any = [];
    if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a: any, b: any) => a.left - b.left);
        infoWeek.forEach((_, i) => {
            insertEvent(events, week.length, infoWeek, i, 0, 0);
        });
    }

    return events;
};

const badgeStylesWeek = function (computedEvent: any, weekLength: any) {
    const s: any = {};
    if (computedEvent.size !== undefined) {
        s.width = (100 / weekLength) * computedEvent.size + '%';
    }
    if (
        computedEvent.event !== undefined &&
        computedEvent.event.bgcolor !== undefined
    ) {
        s['background-color'] = computedEvent.event.bgcolor;
    }
    return s;
};
const badgeClassesWeek = function (computedEvent: any) {
    if (computedEvent.event !== undefined) {
        return {
            'my-event-week': true,
            'text-white': true,
            'rounded-border': true,
            'q-calendar__ellipsis': true,
        };
    }
    return {
        'my-void-event': true,
    };
};
const newEvent = ref<CalenderEvent>({
    id: '0',
    title: '',
    details: '',
    date: '',
    time: '',
    duration: 0,
    bgcolor: '',
    icon: '',
    days: 0,
    side: '',
    allDay: false,
    tags: [],
    end: '',
    start: '',
    user_id: '',
});

const emit = defineEmits<{
    'on-select-date': [value: string];
    'on-select-event': [value: CalenderEvent];
    'on-add-new-event': [value: CalenderEvent];
}>();
const calendar = ref<QCalendar>();
const showAddEventDialog = ref(false);
const dragging = ref(false);
// const ignoreNextSwipe = ref(false);
const draggedEvent = ref<CalenderEvent>(newEvent.value);
// const onDragLeave = (
//     ev: any,
//     type: 'day' | 'interval',
//     day: { timestamp: Timestamp }
// ) => {
//     try {
//         if (day.timestamp.date && type != 'day') {
//             if (draggedEvent.value.end == draggedEvent.value.start) {
//                 draggedEvent.value.end = day.timestamp.date;
//             }
//             draggedEvent.value.date = day.timestamp.date;
//             draggedEvent.value.start = day.timestamp.date;

//             draggedEvent.value.time = day.timestamp.time;
//         }
//     } catch {}
// };
const onDragEnter = (ev: any, event: CalenderEvent | string) => {
    try {
        if ((event as string) != 'interval')
            draggedEvent.value = event as CalenderEvent;
    } catch {}
};
const onDragStart = (ev: any, event: CalenderEvent) => {
    try {
        if (event) {
            dragging.value = true;
            draggedEvent.value = lodash.cloneDeep(event);
        }
    } catch {}
};
const onDragEnd = (ev: any, event: CalenderEvent) => {
    // emit('on-add-new-event', draggedEvent.value);
    // emit('on-delete', event);
};
// const onDragOver = (ev: any, type: 'day' | 'interval', day: Timestamp) => {
//     if (type === 'day') {
//         return draggedEvent.value?.date !== day.date;
//     } else if (type === 'interval') {
//         return (
//             draggedEvent.value?.date !== day.date &&
//             draggedEvent.value?.time !== day.time
//         );
//     }
// };
// const onDrop = (ev: any, day: Timestamp, type: 'day' | 'interval') => {
//     ev.preventDefault();
//     ev.stopPropagation();
//     if (type === 'day') {
//         draggedEvent.value = {
//             ...draggedEvent.value,
//             date: day.date,
//             side: undefined,
//         };
//     } else if (type === 'interval') {
//         draggedEvent.value = {
//             ...draggedEvent.value,
//             date: day.date,
//             time: day.time,
//             side: undefined,
//         };
//     }
// };
// const resetDrag = () => {
//     draggedEvent.value = newEvent.value;
//     dragging.value = false;
//     if (Platform.is.desktop) {
//         ignoreNextSwipe.value = true;
//     }
// };

const onChangeDate = function () {
    //
};
const onMoved = function () {
    //
};
const onClickDate = function () {
    //
};
const onClickTime = function (data: { scope: { timestamp: Timestamp } }) {
    try {
        switch (props.modelValue.calendarTimeShape) {
            case '60':
                newEvent.value.time =
                    lodash.padStart(data.scope.timestamp.hour + '', 2, '0') +
                    ':00';
                break;
            case '30':
                if (data.scope.timestamp.minute >= 30) {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':30';
                } else {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':00';
                }
                break;
            case '15':
                if (data.scope.timestamp.minute < 15) {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':00';
                } else if (
                    data.scope.timestamp.minute > 15 &&
                    data.scope.timestamp.minute < 30
                ) {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':15';
                } else if (
                    data.scope.timestamp.minute > 30 &&
                    data.scope.timestamp.minute < 45
                ) {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':30';
                } else if (data.scope.timestamp.minute >= 45) {
                    newEvent.value.time =
                        lodash.padStart(
                            data.scope.timestamp.hour + '',
                            2,
                            '0'
                        ) + ':45';
                }
                break;
            default:
                newEvent.value.time =
                    lodash.padStart(data.scope.timestamp.hour + '', 2, '0') +
                    ':00';
        }
        newEvent.value.date = data.scope.timestamp.date;
        newEvent.value.start = newEvent.value.date + ' ' + newEvent.value.time;
        newEvent.value.end =
            newEvent.value.date +
            ' ' +
            lodash.padStart(data.scope.timestamp.hour + 1 + '', 2, '0') +
            ':00';
        showAddEventDialog.value = true;
        //
    } catch {}
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
const onPrevDay = function () {
    calendar.value?.prev();
};
const onNextDay = function () {
    calendar.value?.next();
};
const onUpdateDate = function (day: string) {
    emit('on-select-date', day);
};
const handleSwipe = function () {
    emit('on-select-date', 'day');
};
const intervalCount = function () {
    switch (props.modelValue.calendarTimeShape) {
        case '60':
            return 24;
        case '30':
            return 24 * 2;
        case '15':
            return 24 * 4;

        default:
            return 12;
    }
};
const onAddEvent = function () {
    // TODO: remove after connect service
    // newEvent.value.id = lodash.random(10, 1000, false)+'';
    emit('on-add-new-event', lodash.cloneDeep(newEvent.value));

    newEvent.value = {
        id: '0',
        title: '',
        details: '',
        date: '',
        time: '',
        duration: 0,
        bgcolor: '',
        icon: '',
        days: 0,
        side: '',
        allDay: false,
        tags: [],
        start: '',
        end: '',
        user_id: '',
    };
};
onMounted(() => {
    adjustCurrentTime();
    // now, adjust the time every minute
    intervalId = setInterval(() => {
        adjustCurrentTime();
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(intervalId as number);
});
function adjustCurrentTime() {
    try {
        if (props.modelValue.selectedCalendarShape.toLowerCase() != 'month') {
            const now = parseDate(new Date());
            currentDate.value = now.date;
            currentTime.value = now.time;
            timeStartPos.value = calendar.value.timeStartPos(
                currentTime.value,
                false
            );
        }
    } catch {}
}
const style = computed(() => {
    return {
        top: timeStartPos.value + 'px',
    };
});
const hasDate = function (days: Timestamp[]) {
    return currentDate.value
        ? days.find((day: Timestamp) => day.date === currentDate.value)
        : false;
};

const onEventSelect = function (event: CalenderEvent) {
    emit('on-select-event', event);
};
defineExpose({
    onPrevDay,
    onNextDay,
});
</script>
<style lang="sass">
.calendar-container
  position: relative

  .q-calendar-day__day-interval:hover.q-calendar__focus-helper
        background: #000000 !important

  .q-calendar-weekly__workweek:hover
    background: rgba(0,0,255,.1)

  .q-calendar-weekly__day:hover
    background: rgba(0,0,255,.1)

  .q-calendar-weekly__head-weekday:hover
    background: rgba(0,0,255,.1)

  .q-calendar-scheduler__day:hover
    background: rgba(0,0,255,.1)

  .q-calendar-resource__resource-interval:hover
    background: rgba(0,0,255,.1)

  .q-calendar-daily__day:hover
    background: rgba(0,0,255,.1)
    .clx-height
    height: calc(100vh - 300px)

.sq-btn-xs
    width: 1rem
    height: 0.75rem
    margin: 0.25rem

.select-text-white .field__native
    color: #fff !important


.my-event
  position: absolute
  font-size: 12px
  justify-content: center
  margin: 0 1px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
//   display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white


.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.day-view-current-time-indicator
  position: absolute
  left: -5px
  height: 10px
  width: 10px
  margin-top: -4px
  background-color: #eb0032aa
  border-radius: 50%

.day-view-current-time-line
  position: absolute
  left: 5px
  border-top: #eb0032aa 2px solid
  width: calc(100% - 5px)

.q-dark,
.body--dark,
.q-calendar--dark
  .day-view-current-time-indicator
    background-color: #ff2850aa

  .day-view-current-time-line
    border-top: #ff2850aa 2px solid
.my-event-week
  position: relative
  display: inline-flex
  white-space: nowrap
  font-size: 12px
  height: 30px
  max-height: 30px
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.my-void-event
  display: inline-flex
  white-space: nowrap
  height: 1px

.clx-height1
    height: calc(100vh - 265px )
</style>
