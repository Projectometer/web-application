<template>
    <div
        class="row bg-calendar-report justify-center clx-height-page my-form"
        :style="
            $q.platform.is.mobile
                ? 'height: calc(100vh - 250)px'
                : 'height: calc(100vh - 200)px'
        "
    >
        <q-scroll-area
            class="col bg-calendar-report self-center"
            :class="$q.platform.is.mobile ? '' : 'col-md-4 col-sm-6 col-xs-12'"
            :style="
                $q.platform.is.mobile
                    ? 'height: 95%'
                    : 'height: calc(100vh - ' +
                      ($q.screen.height >= 700
                          ? $q.screen.height - 550
                          : $q.screen.height <= 470
                          ? $q.screen.height - 200
                          : $q.screen.height - 300) +
                      'px)'
            "
        >
            <div class="full-width setting-calender">
                <q-card-section>
                    <div class="text-h6">Tune Kalendar</div>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section>
                    <div class="tune-card-selection-style">
                        <q-btn
                            @click="showSelectLocationModal = true"
                            icon="public"
                            label="Choose location"
                            outline
                        >
                        </q-btn>
                    </div>
                    <div class="row" v-if="!$q.platform.is.mobile">
                        <q-select
                            :options="calendarTimeShapeList"
                            v-model="setting.calendarTimeShape"
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
                            v-model="setting.selectedCalendarShape"
                            class="q-py-none q-px-md text-size-fixed-16 width-130"
                            dense
                            outlined
                        ></q-select>
                    </div>
                    <div class="tune-card-selection-style">
                        <q-toggle
                            label="Show Month label"
                            v-model="setting.showMonthLabel"
                        ></q-toggle>
                    </div>
                    <div class="tune-card-selection-style">
                        <q-toggle
                            label="Short Month label"
                            v-model="setting.shortMonthLabel"
                        ></q-toggle>
                    </div>
                    <div class="tune-card-selection-style">
                        <q-toggle
                            label="Short Week label"
                            v-model="setting.shortWeekdayLabel"
                        ></q-toggle>
                    </div>
                    <div class="tune-card-selection-style">
                        <q-toggle
                            label="24hr interval labels"
                            v-model="setting.hour24Format"
                        ></q-toggle>
                    </div>
                    <div class="tune-card-selection-style style-left">
                        <q-badge class="calendar-tune-range-badge-style">
                            Interval height (Daily)
                        </q-badge>
                        <q-slider
                            v-model="setting.intervalHeight"
                            :min="20"
                            :max="70"
                        ></q-slider>
                    </div>
                    <div class="tune-card-selection-style style-left">
                        <q-badge class="calendar-tune-range-badge-style">
                            Day height (Monthly)
                        </q-badge>
                        <q-slider
                            v-model="setting.dayHeightMontgly"
                            :min="50"
                            :max="350"
                        ></q-slider>
                    </div>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-actions class="justify-center q-py-md">
                    <q-btn
                        flat
                        label="Aktualisieren"
                        v-close-popup
                        class="text-white btn-abort-modal"
                        @click="onCancel"
                        no-caps
                    />
                    <q-btn
                        flat
                        label="Speichern"
                        v-close-popup
                        class="text-white q-px-xl q-my-md btn-save-modal"
                        @click="onSaveSetting"
                        no-caps
                    />
                </q-card-actions>
            </div>
        </q-scroll-area>
        <q-dialog v-model="showSelectLocationModal">
            <q-card class="my-card q-card-calendar-tune-style height-240">
                <q-card-section>
                    <div class="text-h6">Choose location</div>
                </q-card-section>
                <q-separator dark inset></q-separator>
                <q-card-section>
                    <div class="tune-card-selection-style">
                        <q-select
                            color="primary"
                            :options="locales"
                            v-model="setting.locale"
                            option-label="label"
                            option-value="value"
                            class="my-select"
                        >
                        </q-select>
                    </div>
                </q-card-section>
                <q-separator dark inset></q-separator>
                <q-card-actions class="justify-center q-py-md">
                    <q-btn
                        flat
                        label="Abbrechen"
                        @click="onCancel"
                        class="btn-abort-modal"
                    />
                    <q-btn
                        flat
                        label="Speichern"
                        class="btn-save-modal"
                        @click.stop="onSaveSetting"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup lang="ts">
import {
    LocalesItem,
    CalenderOptionsData,
    CalenderOptionsDataDefault,
} from 'src/types';
import { onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { Loading, Notify } from 'quasar';
import { SettingService } from 'src/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';

const showSelectLocationModal = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const setting = ref<CalenderOptionsData>(cloneDeep(CalenderOptionsDataDefault));

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
const calendarTimeShapeList = ref([
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '60', label: '60 min' },
]);
const calendarShapeItems = ['day', 'week', 'month'];
const onSaveSetting = async () => {
    try {
        Loading.show();
        await SettingService.saveSetting(setting.value);
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onCancel = () => {
    setting.value = cloneDeep(CalenderOptionsDataDefault);
    onSaveSetting();
};
const loadSetting = async function () {
    try {
        Loading.show();
        const res = await SettingService.loadSetting();
        if (res.settings.calendarTimeShape) {
            setting.value = res.settings;
        }
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
onMounted(() => {
    loadSetting();
});
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
