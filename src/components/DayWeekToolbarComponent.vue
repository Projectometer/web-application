<template>
    <div class="row items-center height-60">
        <q-btn
            flat
            color="white"
            icon="chevron_left"
            class="direction-button rounded-borders-10"
            @click="onPrev"
        />
        <transition :name="transition" appear>
            <div
                :key="parsedStart?.date"
                class="row justify-between items-center text-white overflow-hidden"
                style="width: calc(100% - 112px)"
            >
                <div
                    v-for="day in days"
                    :key="day.date"
                    :style="dayStyle"
                    class="col"
                >
                    <q-btn
                        flat
                        class="btn-week"
                        :class="dayClass(day)"
                        @click="onSelectDate(day.date)"
                    >
                        <q-badge
                            class="q-mt-sm bg-red text-black q-px-xs text-no-wrap text-size-fixed-9"
                            floating
                            >07</q-badge
                        >
                        <div
                            class="text-center text-bold day-name"
                            style="width: 100%"
                        >
                            {{ getDayName(day.weekday) }}
                        </div>
                        <div
                            class="text-center text-white"
                            style="width: 100%; font-size: 16px"
                        >
                            {{ getDay(day.day) }}
                        </div>
                    </q-btn>
                </div>
            </div>
        </transition>
        <q-btn
            flat
            color="white"
            icon="chevron_right"
            class="direction-button rounded-borders-10"
            @click="onNext"
        />
    </div>
</template>
<script setup lang="ts">
import QCalendar, { padNumber } from '@quasar/quasar-ui-qcalendar';
import { ref, computed } from 'vue';
const emit = defineEmits(['on-select-date']);
const CURRENT_DAY = new Date();

const getCurrentDay = function (day: number): string | undefined {
    const newDay = new Date(CURRENT_DAY);
    newDay.setDate(day);
    const tm = QCalendar.parseDate(newDay);
    return tm?.date;
};

const weekdays = ref([0, 1, 2, 3, 4, 5, 6]);
const selectedDate = ref<string | undefined>('');
selectedDate.value = getCurrentDay(CURRENT_DAY.getDate());

const transitionPrev = ref('slide-right');
const transitionNext = ref('slide-left');
const transition = ref('');

const getDay = function (day: number): string {
    return padNumber(day, 2);
};
const getDayName = function (day: number): string {
    const week = ['So', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];
    return week[day];
};

const weekdaySkips = computed(() => {
    return QCalendar.getWeekdaySkips(weekdays.value);
});

const parsedStart = computed((): QCalendar.Timestamp | undefined => {
    if (selectedDate.value) {
        const timeStamp = QCalendar.parseTimestamp(selectedDate.value);
        if (timeStamp && today.value) {
            return QCalendar.getStartOfWeek(
                timeStamp,
                weekdays.value,
                today.value
            );
        }
    }
    return undefined;
});

const parsedEnd = computed(() => {
    if (selectedDate.value) {
        const timeStamp = QCalendar.parseTimestamp(selectedDate.value);
        if (timeStamp && today.value) {
            const endWeek = QCalendar.getEndOfWeek(
                timeStamp,
                weekdays.value,
                today.value
            );
            return QCalendar.addToDate(endWeek, { day: 7 });
        }
    }
    return undefined;
});

const today = computed(() => {
    const newDay = new Date(CURRENT_DAY);
    const tm = QCalendar.parseDate(newDay);
    return tm;
});

const days = computed(() => {
    if (parsedStart.value && parsedEnd.value && today.value) {
        return QCalendar.createDayList(
            parsedStart.value,
            parsedEnd.value,
            today.value,
            weekdaySkips.value
        );
    }
    return [];
});

const dayStyle = function () {
    return {
        width: 100 / 14 + '%',
    };
};

const onPrev = function () {
    if (parsedStart.value) {
        const ts = QCalendar.addToDate(parsedStart.value, { day: -14 });
        selectedDate.value = ts.date;
        transition.value = 'q-transition--' + transitionPrev.value;
    }
};

const onNext = function () {
    if (parsedStart.value) {
        const ts = QCalendar.addToDate(parsedStart.value, { day: 14 });
        selectedDate.value = ts.date;
        transition.value = 'q-transition--' + transitionNext.value;
    }
};

const dayClass = function (day: { date: string }) {
    return {
        row: true,
        'justify-center': true,
        'selected-date': selectedDate.value === day.date,
        'q-mx-xs': true,
    };
};
const onSelectDate = function (day: string) {
    selectedDate.value = day;
    transition.value = '';
    emit('on-select-date', selectedDate.value);
};
const setDate = function (day: string) {
    selectedDate.value = day;
    transition.value = '';
};
defineExpose({ setDate });
</script>
