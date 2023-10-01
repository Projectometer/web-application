<template>
    <div>test page</div>
</template>
<!-- <template>
    <div class="subcontent q-mt-xl q-pt-xl">
        <div class="row justify-center">
            <div
                style="
                    display: flex;
                    max-width: 800px;
                    width: 100%;
                    height: 600px;
                "
            >
                <q-calendar-day
                    ref="calendar"
                    v-model="selectedDate"
                    view="week"
                    animated
                    bordered
                    transition-next="slide-left"
                    transition-prev="slide-right"
                    no-active-date
                    :interval-minutes="15"
                    :interval-start="24"
                    :interval-count="120"
                    :interval-height="15"
                    @change="onChange"
                    @moved="onMoved"
                    @click-date="onClickDate"
                    @click-time="onClickTime"
                    @click-interval="onClickInterval"
                    @click-head-intervals="onClickHeadIntervals"
                    @click-head-day="onClickHeadDay"
                >
                    <template
                        #day-body="{
                            scope: {
                                timestamp,
                                timeStartPos,
                                timeDurationHeight,
                            },
                        }"
                    >
                        <template
                            v-for="event in getEvents(timestamp.date)"
                            :key="event.id"
                        >
                            <div
                                v-if="event.time !== undefined"
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
                            >
                                <div class="title q-calendar__ellipsis">
                                    {{ event.title }}
                                    <q-tooltip>{{
                                        event.time + ' - ' + event.details
                                    }}</q-tooltip>
                                </div>
                            </div>
                        </template>
                    </template>
                </q-calendar-day>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    QCalendarDay,
    addToDate,
    parseTimestamp,
    isBetweenDates,
    today,
    parsed,
    parseTime,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass';

import { ref } from 'vue';

const selectedDate = ref(today());
interface Event {
    id: number;
    title: string;
    details: string;
    date: string;
    time: string;
    duration: number;
    bgcolor: string;
    icon: string;
    days?: number;
    side?: string;
}
const events: Event[] = [
    {
        id: 1,
        title: 'Meeting',
        details: 'Time to pitch my idea to the company',
        date: today(),
        time: '08:00',
        duration: 45,
        bgcolor: 'red',
        icon: 'fas fa-handshake',
    },
    {
        id: 2,
        title: 'Lunch',
        details: 'Company is paying!',
        date: today(),
        time: '12:00',
        duration: 20,
        bgcolor: 'teal',
        icon: 'fas fa-hamburger',
    },
    {
        id: 3,
        title: 'Conference',
        details: 'Teaching Javascript 101',
        date: today(),
        time: '13:00',
        duration: 30,
        bgcolor: 'blue',
        icon: 'fas fa-chalkboard-teacher',
    },
    {
        id: 4,
        title: 'Girlfriend',
        details: 'Meet GF for dinner at Swanky Restaurant',
        date: today(),
        time: '19:00',
        duration: 40,
        bgcolor: 'teal-2',
        icon: 'fas fa-utensils',
    },
];

const eventsMap = (): { [key: string]: Event[] } => {
    const map: { [key: string]: Event[] } = {};
    events.forEach((event: Event) => {
        if (!map[event.date]) {
            map[event.date] = [];
        }
        map[event.date].push(event);
        if (event.days) {
            let timestamp: Date = parseTimestamp(event.date);
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

const getEvents = (dt) => {
    const events = eventsMap()[dt] || [];

    if (events.length === 1) {
        events[0].side = 'full';
    } else if (events.length === 2) {
        const startTime = addToDate(parsed(events[0].date), {
            minute: parseTime(events[0].time),
        });
        const endTime = addToDate(startTime, {
            minute: events[0].duration,
        });
        const startTime2 = addToDate(parsed(events[1].date), {
            minute: parseTime(events[1].time),
        });
        const endTime2 = addToDate(startTime2, {
            minute: events[1].duration,
        });
        if (
            isBetweenDates(startTime2, startTime, endTime, true) ||
            isBetweenDates(endTime2, startTime, endTime, true)
        ) {
            events[0].side = 'left';
            events[1].side = 'right';
        } else {
            events[0].side = 'full';
            events[1].side = 'full';
        }
    }

    return events;
};

const badgeClasses = (event: Event, type: string) => {
    const isHeader = type === 'header';
    return {
        [`text-white bg-${event.bgcolor}`]: true,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right',
        'rounded-border': true,
    };
};
const badgeStyles = (
    event: Event,
    type: string,
    timeStartPos: number | undefined = undefined,
    timeDurationHeight: number | undefined = undefined
): { [key: string]: string | number } => {
    const s: { [key: string]: string | number } = {};
    if (timeStartPos !== undefined && timeDurationHeight !== undefined) {
        s.top = timeStartPos(event.time) + 'px';
        s.height = timeDurationHeight(event.duration) + 'px';
    }
    s['align-items'] = 'flex-start';
    return s;
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

<style lang="sass" scoped>
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
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.rounded-border
  border-radius: 2px
</style> -->
