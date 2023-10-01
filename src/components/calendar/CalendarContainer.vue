<template>
    <div
        class="row full-width"
        :class="$q.platform.is.mobile ? 'q-pa-xs' : 'q-pa-md'"
    >
        <div
            class="bg-calendar-aside"
            :class="$q.platform.is.mobile ? 'width-40' : 'width-80'"
        >
            <q-scroll-area style="height: 100%">
                <CalendarSide
                    @on-start-track="onStratTrack"
                    @on-set-manuall-mode="onSetManuallMode"
                    @on-reset-setting="onResetSetting"
                    :manuall-mode="manuallMode"
                    :track-mode="trackMode"
                    :track-btn-data="trackBtnData"
                ></CalendarSide>
            </q-scroll-area>
        </div>
        <div class="col bg-calendar-calendar">
            <CalendarHeader
                @on-show-calendar-options="onShowCalendarOptions"
                @on-goto-today="onGotoToday"
                @on-next-day="onNextDay"
                @on-prev-day="onPrevDay"
                v-model="calendarOptionsData"
            ></CalendarHeader>
            <div
                class="corners q-mx-sm q-mb-sm"
                :class="$q.platform.is.mobile ? 'width:100%' : 'clx-height'"
            >
                <CalendarViewer
                    v-model="calendarOptionsData"
                    :events="events"
                    :select-date="selectDate"
                    @on-select-date="onUpdateDate"
                    @on-select-event="onSelectEvent"
                    @on-add-new-event="onAddNewEvent"
                    ref="calendarViewComponent"
                ></CalendarViewer>
            </div>
        </div>
        <q-dialog v-model="showCalendarOptions">
            <CalendarOptions
                v-model="calendarOptionsData"
                :calendarMode="calendarOptionsData.selectedCalendarShape"
                @on-save-setting="onSaveSetting"
                @on-cancel="showCalendarOptions = true"
            ></CalendarOptions>
        </q-dialog>
        <q-dialog v-model="showEvent">
            <EeventShowCard
                v-model="selectedEvent"
                @on-delete="onDeleteEvent"
                @on-edit="onEditEventClick"
            ></EeventShowCard>
        </q-dialog>
        <q-dialog v-model="showEditEventDialog" persistent>
            <EventComponent
                v-model="selectedEvent"
                @on-add-event="onEditEvent"
            ></EventComponent>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CalendarOptions from 'src/components/calendar/CalendarOptions.vue';
import CalendarSide from 'src/components/calendar/CalendarSide.vue';
import CalendarHeader from 'src/components/calendar/CalendarHeader.vue';
import CalendarViewer from 'src/components/calendar/CalendarViewer.vue';
import {
    CalenderEvent,
    CalenderOptionsData,
    CalenderOptionsDataDefault,
} from 'src/types';
import { today } from '@quasar/quasar-ui-qcalendar/src/index.js';
import QCalendar from '@quasar/quasar-ui-qcalendar';
import EeventShowCard from './EeventShowCard.vue';
import lodash, { cloneDeep } from 'lodash';
import EventComponent from 'src/components/calendar/EventComponent.vue';
import {
    Timestamp,
    getDayIdentifier,
    getTimeIdentifier,
    parseTimestamp,
} from '@quasar/quasar-ui-qcalendar';
import { Loading, Notify } from 'quasar';
import { EventService, SettingService } from 'src/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
interface MyProps {
    selectDate: string;
}
const props = defineProps<MyProps>();

const emit = defineEmits(['on-select-date']);
const router = useRouter();
const authStore = useAuthStore();

const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const events = ref<CalenderEvent[]>([
    {
        id: '1',
        title: 'Meeting',
        details: 'Time to pitch my idea to the company',
        date: '2023-09-19',
        time: '02:00',
        duration: 60,
        bgcolor: 'red',
        icon: 'handshake',
        start: '2023-09-19',
        end: '2023-09-19',
        tags: [],
        allDay: false,
        user_id: 'test',
    },
]);

const showEditEventDialog = ref(false);

const calendarViewComponent = ref();
const calendarOptionsData = ref<CalenderOptionsData>(
    CalenderOptionsDataDefault
);
const showEvent = ref(false);
const selectedEvent = ref<CalenderEvent>({
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
});
const manuallMode = ref(false);
const trackMode = ref(false);
const trackBtnData = ref<{ title: string; icon: string; class?: string }>({
    icon: 'play_arrow',
    title: 'Track',
});

const showCalendarOptions = ref(false);
const onShowCalendarOptions = function () {
    showCalendarOptions.value = true;
};
const onSaveSetting = async function () {
    try {
        Loading.show();
        await SettingService.saveSetting(calendarOptionsData.value);
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const loadSetting = async function () {
    try {
        Loading.show();
        const res = await SettingService.loadSetting();
        if (res.settings.calendarTimeShape) {
            calendarOptionsData.value = res.settings;
        }
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onPrevDay = function () {
    calendarViewComponent.value?.onPrevDay();
};
const onNextDay = function () {
    calendarViewComponent.value?.onNextDay();
};
const onUpdateDate = function (day: string) {
    emit('on-select-date', day);
};
const trrackManual = ref<{ started_at: string } | null>(null);
const onStratTrack = async () => {
    if (manuallMode.value) {
        // Nothing to do
    } else {
        if (trackMode.value) {
            const date = new Date();

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const endDate = `${year}-${month}-${day} ${hour}:${minute}`;
            const startDate = new Date(trrackManual.value?.started_at + '');

            const hourStart = String(startDate.getHours()).padStart(2, '0');
            const minuteStart = String(startDate.getMinutes()).padStart(2, '0');
            await SettingService.stopActiveTimers();
            selectedEvent.value = {
                id: '-1',
                title: '',
                details: 'Track whith system',
                date: trrackManual.value?.started_at + '',
                time: hourStart + ':' + minuteStart,
                duration: 0,
                bgcolor: '',
                icon: '',
                days: 0,
                side: '',
                allDay: false,
                tags: [],
                start: trrackManual.value?.started_at + '',
                end: endDate,
                user_id: '',
            };
            showEditEventDialog.value = true;
            trackMode.value = false;
        } else {
            await SettingService.startActiveTimers();
            await loadActiveTimerStatus();
            trackMode.value = true;
        }
    }
    setTrackIcon();
};
const onResetSetting = () => {
    calendarOptionsData.value = cloneDeep(CalenderOptionsDataDefault);
    onSaveSetting();
};
const setTrackIcon = function () {
    if (manuallMode.value) {
        trackBtnData.value = {
            icon: 'add',
            title: 'Add Manuell Track',
            class: '',
        };
    } else if (trackMode.value) {
        trackBtnData.value = {
            icon: 'pause',
            title: 'Pause',
            class: 'custom-btn btn-11',
        };
    } else {
        trackBtnData.value = {
            icon: 'play_arrow',
            title: 'Track',
            class: '',
        };
    }
};

const onSetManuallMode = function (mode: boolean) {
    manuallMode.value = mode;
    trackMode.value = false;
    setTrackIcon();
};
const onSelectEvent = function (event: CalenderEvent) {
    try {
        showEvent.value = true;
        const endTime = event.time.split(':');
        if (event.duration >= 60) {
            const hour = event.duration / 60;
            const minute = event.duration % 60;
            endTime[0] = lodash.padStart(+endTime[0] + hour + '', 2, '0');
            endTime[1] = +endTime[1] + lodash.padStart(minute + '', 2, '0');
        }
        selectedEvent.value = {
            ...event,
            start: event.start + ' ' + event.time,
            end: event.end + ' ' + endTime.join(':') + '',
        };
    } catch {}
};
const onGotoToday = function () {
    onUpdateDate(today());
};
const weekdays = ref([0, 1, 2, 3, 4, 5, 6]);

const parsedStart = computed((): QCalendar.Timestamp | undefined => {
    try {
        const selectedDate = props.selectDate ?? today.value;
        if (selectedDate) {
            const timeStamp = QCalendar.parseTimestamp(selectedDate);
            if (timeStamp) {
                return QCalendar.getStartOfWeek(timeStamp, weekdays.value);
            }
        }
        return undefined;
    } catch {
        return undefined;
    }
});

const parsedEnd = computed(() => {
    try {
        const selectedDate = props.selectDate;
        if (selectedDate) {
            const timeStamp = QCalendar.parseTimestamp(selectedDate);
            if (timeStamp) {
                const endWeek = QCalendar.getEndOfWeek(
                    timeStamp,
                    weekdays.value
                );
                return QCalendar.addToDate(endWeek, { day: 7 });
            }
        }
        return undefined;
    } catch {
        return undefined;
    }
});

const loadEvens = async function () {
    try {
        Loading.show();
        const start = parsedStart.value;
        const end = parsedEnd.value;
        const res = await EventService.loadEvents(start?.date, end?.date);
        events.value = res.map((x) => {
            const startDate = x.date.split('/');
            startDate[1] = lodash.padStart(startDate[1], 2, '0');
            startDate[2] = lodash.padStart(startDate[2], 2, '0');
            return {
                id: x.id,
                title: x.title,
                details: x.details,
                date: startDate.join('-'),
                start: startDate.join('-'),
                time: x.time,
                duration: x.duration,
                bgcolor: x.bg_color ?? 'grey',
                company: x.company,
                project: x.project,
                icon: x.icon,
                end: x.end,
                tags: x.tags,
                allDay: x.all_day,
                user_id: x.user_id,
            };
        });
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onDeleteEvent = async function () {
    try {
        Loading.show();
        await EventService.deleteEvent(selectedEvent.value?.id ?? '');
        events.value = events.value.filter(
            (x) => x.id != selectedEvent.value?.id
        );
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};

const onEditEventClick = function () {
    showEditEventDialog.value = true;
};
const onEditEvent = async function () {
    if (selectedEvent.value?.id != '-1') {
        try {
            const index = events.value.findIndex(
                (x) => x.id == selectedEvent.value?.id
            );
            if (index >= 0 && selectedEvent.value) {
                const timestampStart = parseTimestamp(
                    selectedEvent.value.start
                );
                selectedEvent.value.time =
                    timestampStart?.time ?? selectedEvent.value.time;

                calcDurationEvent(selectedEvent.value);
                if (selectedEvent.value.allDay) {
                    selectedEvent.value.days = 365;
                } else {
                    selectedEvent.value.days = undefined;
                }
                try {
                    Loading.show();
                    await EventService.editEvent(selectedEvent.value);
                    events.value[index] = lodash.cloneDeep(selectedEvent.value);
                } catch {
                    Notify.create({
                        message: 'Network error',
                        color: 'negative',
                    });
                    signOut();
                } finally {
                    Loading.hide();
                }
                resetEventData();
            }
        } catch {}
    } else {
        onAddNewEvent(selectedEvent.value);
    }
};
const onAddNewEvent = async function (event: CalenderEvent) {
    calcDurationEvent(event);
    event.days = event.allDay ? 365 : undefined;
    try {
        Loading.show();
        events.value.push(lodash.cloneDeep(event));
        await EventService.saveEvent(event);
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
    resetEventData();
};
const calcDurationEvent = function (event: CalenderEvent) {
    try {
        if (event.start && event.end) {
            const timestampEnd = parseTimestamp(event.end);
            const timestampStart = parseTimestamp(event.start);
            const dayEnd = getDayIdentifier(timestampEnd as Timestamp);
            const dayStart = getDayIdentifier(timestampStart as Timestamp);
            event.start = timestampStart?.date ?? event.start;
            event.end = timestampEnd?.date ?? event.end;
            if (dayEnd > dayStart) {
                event.duration = dayEnd - dayStart;
            } else if (dayEnd < dayStart) {
                return false;
            } else {
                const timeEnd = getTimeIdentifier(timestampEnd as Timestamp);
                const timeStart = getTimeIdentifier(
                    timestampStart as Timestamp
                );

                if (timeEnd >= timeStart) {
                    event.duration = (timeEnd - timeStart) * 0.6;
                } else {
                    return false;
                }
            }
        }
    } catch {
        return false;
    }
};
const resetEventData = function () {
    selectedEvent.value = {
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
const loadActiveTimerStatus = async () => {
    try {
        Loading.show();
        trrackManual.value = await SettingService.getActiveTimers();
        trackMode.value = !!(
            trrackManual.value && trrackManual.value.started_at
        );
        setTrackIcon();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};

onMounted(() => {
    loadActiveTimerStatus();
    setTrackIcon();
    onGotoToday();
    loadSetting();
    loadEvens();
});
</script>

<style lang="sass" scoped>
.clx-height
    height: calc(100vh - 265px)
</style>
