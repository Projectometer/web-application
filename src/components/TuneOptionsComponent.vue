<template>
    <q-card class="my-card q-card-calendar-tune-style">
        <q-scroll-area style="height: 100%; width: auto">
            <q-card-section>
                <div class="text-h6">Tune Kalendar</div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-section>
                <div class="tune-card-selection-style">
                    <q-btn
                        @click="showSelectLocationModal = true"
                        icon="public"
                        label="Choose location"
                    >
                    </q-btn>
                </div>

                <div class="tune-card-selection-style">
                    <q-toggle
                        label="Short Month label"
                        :model-value="modelValue.shortMonthLabel"
                        @update:model-value="
                            (e) => updateData(e, 'shortMonthLabel')
                        "
                    ></q-toggle>
                </div>
                <div class="tune-card-selection-style">
                    <q-toggle
                        label="Short Week label"
                        :model-value="modelValue.shortWeekdayLabel"
                        @update:model-value="
                            (e) => updateData(e, 'shortWeekdayLabel')
                        "
                    ></q-toggle>
                </div>
                <div class="tune-card-selection-style">
                    <q-toggle
                        label="24hr interval labels"
                        :model-value="modelValue.hour24Format"
                        @update:model-value="
                            (e) => updateData(e, 'hour24Format')
                        "
                    ></q-toggle>
                </div>
                <div
                    class="tune-card-selection-style style-left"
                    v-if="calendarMode != 'month'"
                >
                    <q-badge class="calendar-tune-range-badge-style">
                        Interval height (Daily)
                    </q-badge>
                    <q-slider
                        :model-value="modelValue.intervalHeight"
                        @update:model-value="
                            (e) => updateData(e, 'intervalHeight')
                        "
                        :min="20"
                        :max="70"
                    ></q-slider>
                </div>
                <div
                    class="tune-card-selection-style style-left"
                    v-if="calendarMode == 'month'"
                >
                    <q-badge class="calendar-tune-range-badge-style">
                        Interval height (Monthly)
                    </q-badge>
                    <q-slider
                        :model-value="modelValue.intervalHeightMontgly"
                        @update:model-value="
                            (e) => updateData(e, 'intervalHeightMontgly')
                        "
                        :min="0"
                        :max="50"
                    ></q-slider>
                </div>
                <div
                    class="tune-card-selection-style style-left"
                    v-if="calendarMode == 'month'"
                >
                    <q-badge class="calendar-tune-range-badge-style">
                        Day height (Monthly)
                    </q-badge>
                    <q-slider
                        :model-value="modelValue.dayHeightMontgly"
                        @update:model-value="
                            (e) => updateData(e, 'dayHeightMontgly')
                        "
                        :min="50"
                        :max="350"
                    ></q-slider>
                </div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-actions class="justify-center">
                <q-btn
                    flat
                    label="Abbrechen"
                    v-close-popup
                    class="btn-abort-modal"
                />
                <q-btn
                    flat
                    label="Speichern"
                    v-close-popup
                    class="btn-save-modal"
                />
            </q-card-actions>
        </q-scroll-area>
    </q-card>
    <q-dialog v-model="showSelectLocationModal">
        <q-card class="my-card q-card-calendar-tune-style">
            <q-card-section>
                <div class="text-h6">Choose location</div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-section>
                <div class="tune-card-selection-style">
                    <q-select
                        color="primary"
                        :options="locales"
                        :model-value="modelValue.locale"
                        @update:model-value="(e) => updateData(e, 'locale')"
                        map-options
                        emit-value
                        option-label="label"
                        option-value="value"
                        class="my-select"
                    >
                    </q-select>
                </div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-actions class="justify-center">
                <q-btn
                    flat
                    label="Abbrechen"
                    v-close-popup
                    class="btn-abort-modal"
                />
                <q-btn
                    flat
                    label="Speichern"
                    v-close-popup
                    class="btn-save-modal"
                    @click="onSaveSetting"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { CalendarView, LocalesItem, TineOptions } from 'src/types';
import { ref } from 'vue';
import lodash from 'lodash';

const showSelectLocationModal = ref(false);
interface MyProps {
    modelValue: TineOptions;
    calendarMode: CalendarView;
}
const props = defineProps<MyProps>();
const emit = defineEmits(['update:model-value', 'onSaveSetting']);

const locales = ref<LocalesItem[]>([
    { value: 'ar', label: 'العربية' },
    { value: 'bg', label: 'български език' },
    { value: 'ca', label: 'Català' },
    { value: 'cs', label: 'Čeština' },
    { value: 'da', label: 'Dansk' },
    { value: 'de', label: 'Deutsch' },
    { value: 'en-gb', label: 'English (UK)' },
    { value: 'en-us', label: 'English (US)' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'es', label: 'Español' },
    { value: 'fa-ir', label: 'فارسی' },
    { value: 'fi', label: 'Suomi' },
    { value: 'fr', label: 'Français' },
    { value: 'gn', label: "Avañe'ẽ" },
    { value: 'he', label: 'עברית' },
    { value: 'hr', label: 'Hrvatski jezik' },
    { value: 'hu', label: 'Magyar' },
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'it', label: 'Italiano' },
    { value: 'ja', label: '日本語 (にほんご)' },
    { value: 'km', label: 'ខ្មែរ' },
    { value: 'ko-kr', label: '한국어' },
    { value: 'lu', label: 'Kiluba' },
    { value: 'lv', label: 'Latviešu valoda' },
    { value: 'ml', label: 'മലയാളം' },
    { value: 'ms', label: 'Bahasa Melayu' },
    { value: 'nb-no', label: 'Norsk' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'pl', label: 'Polski' },
    { value: 'pt-br', label: 'Português (BR)' },
    { value: 'pt', label: 'Português' },
    { value: 'ro', label: 'Română' },
    { value: 'ru', label: 'русский' },
    { value: 'sk', label: 'Slovenčina' },
    { value: 'sl', label: 'Slovenski Jezik' },
    { value: 'sr', label: 'српски језик' },
    { value: 'sv', label: 'Svenska' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'th', label: 'ไทย' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'uk', label: 'Українська' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'zh-hans', label: '中文(简体)' },
    { value: 'zh-hant', label: '中文(繁體)' },
]);

const onSaveSetting = function () {
    emit('onSaveSetting');
};

const updateData = function (value: string | number, prop: string) {
    const newData = lodash.merge({}, props.modelValue);
    lodash.set(newData, prop, value);
    emit('update:model-value', newData);
};
</script>
<style>
.my-select span,
.my-select .q-select__dropdown-icon {
    color: #fff;
}

.q-menu.q-position-engine.q-menu--square {
    color: #fafafa;
    backdrop-filter: blur(6px) saturate(200%);
    -webkit-backdrop-filter: blur(6px) saturate(200%);
    background-color: rgba(51, 51, 51, 0.4);
    border-radius: 0.5rem !important;
    border: 1px solid #fafafa;
}
</style>
