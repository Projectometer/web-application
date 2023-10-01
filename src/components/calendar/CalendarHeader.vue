<template>
    <div class="row items-center height-60 c-header">
        <q-btn
            @click="onShowCalendarOptions"
            icon="tune"
            class="col col-1 clandar-tuner-button-style"
            :class="$q.platform.is.mobile ? 'q-mx-sm' : 'q-ml-sm q-mr-lg'"
        >
            <q-tooltip class="text-caption tooltip-around">Tuner</q-tooltip>
        </q-btn>
        <q-btn
            flat
            inline-label
            size="md"
            class="q-my-sm"
            :class="$q.platform.is.mobile ? 'q-mx-none q-px-none' : 'q-px-xs'"
            icon="reply"
            @click="onGotoToday"
        >
            <q-tooltip class="text-body2 tooltip-around"
                >Heute</q-tooltip
            ></q-btn
        >
        <div>
            <q-btn
                class="arrow-button-style"
                flat
                dense
                round
                icon="keyboard_arrow_left"
                @click="onPrevDay"
            ></q-btn>
            <q-tooltip class="text-body2 tooltip-around">Prev</q-tooltip>
        </div>
        <div>
            <q-btn
                flat
                dense
                round
                icon="keyboard_arrow_right"
                @click="onNextDay"
            ></q-btn>
            <q-tooltip class="text-body2 tooltip-around">Next</q-tooltip>
        </div>

        <q-space v-if="!$q.platform.is.mobile"></q-space>
        <div class="row" v-if="!$q.platform.is.mobile">
            <q-select
                :options="calendarTimeShapeList"
                :model-value="modelValue.calendarTimeShape"
                @update:model-value="
                    (e) => onUpdateData(e, 'calendarTimeShape')
                "
                option-label="label"
                option-value="value"
                class="q-py-none text-size-fixed-16"
                dense
                map-options
                emit-value
                outlined
                :class="$q.platform.is.mobile ? ' q-px-none' : 'q-px-xs'"
            ></q-select>

            <q-select
                :options="calendarShapeItems"
                :model-value="modelValue.selectedCalendarShape"
                @update:model-value="
                    (e) => onUpdateData(e, 'selectedCalendarShape')
                "
                class="q-py-none q-px-md text-size-fixed-16 width-130"
                dense
                outlined
            ></q-select>
        </div>
        <div class="col row justify-end q-mr-sm" v-if="$q.platform.is.mobile">
            <div>
                <q-btn
                    flat
                    dense
                    round
                    icon="settings"
                    @click="showItemCalender = true"
                ></q-btn>
                <q-tooltip class="text-body2 tooltip-around">Next</q-tooltip>
            </div>
        </div>
        <q-dialog v-model="showItemCalender">
            <q-card class="q-card-calendar-tune-style">
                <q-card-section class="row items-center">
                    <q-select
                        :options="calendarTimeShapeList"
                        :model-value="modelValue.calendarTimeShape"
                        @update:model-value="
                            (e) => onUpdateData(e, 'calendarTimeShape')
                        "
                        option-label="label"
                        option-value="value"
                        class="q-py-none text-size-fixed-16"
                        dense
                        map-options
                        emit-value
                        outlined
                        :class="
                            $q.platform.is.mobile ? ' q-px-none' : 'q-px-xs'
                        "
                    ></q-select>

                    <q-select
                        :options="calendarShapeItems"
                        :model-value="modelValue.selectedCalendarShape"
                        @update:model-value="
                            (e) => onUpdateData(e, 'selectedCalendarShape')
                        "
                        class="q-py-none q-px-md text-size-fixed-16 width-130"
                        dense
                        outlined
                    ></q-select>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup lang="ts">
import { CalendarView } from 'src/types';
import { ref } from 'vue';
import lodash from 'lodash';

interface MyProps {
    modelValue: {
        calendarTimeShape: string;
        selectedCalendarShape: CalendarView;
    };
}
const props = defineProps<MyProps>();
const emit = defineEmits([
    'on-show-calendar-options',
    'on-goto-today',
    'on-next-day',
    'on-prev-day',
    'update:model-value',
]);
const calendarTimeShapeList = ref([
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '60', label: '60 min' },
]);
const calendarShapeItems = ['day', 'week', 'month'];
const showItemCalender = ref(false);
const onShowCalendarOptions = function () {
    emit('on-show-calendar-options');
};
const onGotoToday = function () {
    emit('on-goto-today');
};
const onPrevDay = function () {
    emit('on-prev-day');
};
const onNextDay = function () {
    emit('on-next-day');
};
const onUpdateData = function (value: string | number | boolean, prop: string) {
    const newData = lodash.merge({}, props.modelValue);
    lodash.set(newData, prop, value);
    emit('update:model-value', newData);
    if (prop == 'selectedCalendarShape') {
        onGotoToday();
    }
};
</script>
