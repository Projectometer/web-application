<template>
    <q-card class="my-card q-card-calendar-tune-style">
        <q-scroll-area style="height: 100%">
            <q-card-section>
                <div class="text-h6">Add Event</div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-section>
                <div class="q-pa-xs">
                    <label for="eventTitle">Title</label>
                    <q-input
                        :model-value="modelValue?.title"
                        @update:model-value="(e) => updateData(e, 'title')"
                        outlined
                        dense
                        name="eventTitle"
                        id="eventTitle"
                        ref="eventTitle"
                    ></q-input>
                </div>
                <div class="q-pa-xs">
                    <label for="eventDetails">Details</label>
                    <q-input
                        :model-value="modelValue?.details"
                        @update:model-value="(e) => updateData(e, 'details')"
                        outlined
                        dense
                        name="eventDetails"
                        id="eventDetails"
                        ref="eventDetails"
                    ></q-input>
                </div>
                <div class="row q-pa-xs justify-between">
                    <q-checkbox
                        :model-value="modelValue?.allDay"
                        @update:model-value="(e) => updateData(e, 'allDay')"
                        outlined
                        dense
                        label="All-Day Event"
                        name="eventAllDay"
                        id="eventAllDay"
                        ref="eventAllDay"
                    />
                    <div>
                        <q-btn
                            icon="store"
                            round
                            size="sm"
                            color="primary"
                            class="q-mx-xs"
                        >
                            <q-popup-proxy>
                                <q-card
                                    class="my-card q-card-calendar-tune-style"
                                >
                                    <q-card-section class="q-pb-none">
                                        <div class="q-pa-xs">
                                            <label for="eventAddTag"
                                                >Firma hinzufügen</label
                                            >
                                            <q-select
                                                outlined
                                                dense
                                                v-model="company"
                                                use-input
                                                hide-selected
                                                fill-input
                                                input-debounce="10"
                                                :options="companies"
                                                emit-value
                                                map-options
                                                option-label="title"
                                                option-value="id"
                                            >
                                                <template v-slot:no-option>
                                                    <q-item>
                                                        <q-item-section
                                                            class="text-grey"
                                                        >
                                                            Keine Ergebnisse
                                                        </q-item-section>
                                                    </q-item>
                                                </template>
                                            </q-select>
                                            <div
                                                class="row justify-between q-mt-xs"
                                            >
                                                <q-btn
                                                    flat
                                                    label="Abbrechen"
                                                    v-close-popup
                                                    class="btn-abort-modal"
                                                    @click="company = ''"
                                                />
                                                <q-btn
                                                    flat
                                                    label="Speichern"
                                                    v-close-popup
                                                    class="btn-save-modal"
                                                    @click="setCompany"
                                                />
                                            </div>
                                        </div>
                                    </q-card-section>
                                    <q-card-section class="q-pt-none">
                                        <q-btn
                                            icon="add"
                                            label="Add new company"
                                            color="primary"
                                            no-caps
                                        >
                                            <q-popup-proxy>
                                                <q-card
                                                    class="my-card q-card-calendar-tune-style"
                                                >
                                                    <q-card-section>
                                                        <div class="q-pa-xs">
                                                            <label
                                                                for="eventAddTag"
                                                                >Name der
                                                                Firma</label
                                                            >
                                                            <q-input
                                                                outlined
                                                                dense
                                                                v-model="
                                                                    newCompany
                                                                "
                                                                use-input
                                                                hide-selected
                                                                fill-input
                                                                input-debounce="10"
                                                            >
                                                            </q-input>
                                                        </div>
                                                    </q-card-section>
                                                    <q-card-section
                                                        class="row justify-around"
                                                    >
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
                                                            @click="
                                                                addNewCompany
                                                            "
                                                        />
                                                    </q-card-section>
                                                </q-card>
                                            </q-popup-proxy>
                                        </q-btn>
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-btn>
                        <q-btn icon="folder" round size="sm" color="primary">
                            <q-popup-proxy>
                                <q-card
                                    class="my-card q-card-calendar-tune-style"
                                >
                                    <q-card-section class="q-pb-none">
                                        <div class="q-pa-xs">
                                            <label for="eventAddTag"
                                                >Projekt hinzufügen</label
                                            >
                                            <q-select
                                                outlined
                                                dense
                                                v-model="project"
                                                use-input
                                                hide-selected
                                                fill-input
                                                input-debounce="10"
                                                :options="projects"
                                                emit-value
                                                map-options
                                                option-label="title"
                                                option-value="id"
                                            >
                                                <template v-slot:no-option>
                                                    <q-item>
                                                        <q-item-section
                                                            class="text-grey"
                                                        >
                                                            Keine Ergebnisse
                                                        </q-item-section>
                                                    </q-item>
                                                </template>
                                            </q-select>
                                            <div
                                                class="row justify-between q-mt-xs"
                                            >
                                                <q-btn
                                                    flat
                                                    label="Abbrechen"
                                                    v-close-popup
                                                    class="btn-abort-modal"
                                                    @click="project = ''"
                                                />
                                                <q-btn
                                                    flat
                                                    label="Speichern"
                                                    v-close-popup
                                                    class="btn-save-modal"
                                                    @click="setProject"
                                                />
                                            </div>
                                        </div>
                                    </q-card-section>
                                    <q-card-section class="q-pt-none">
                                        <q-btn
                                            icon="add"
                                            label="Add new project"
                                            color="primary"
                                            no-caps
                                        >
                                            <q-popup-proxy>
                                                <q-card
                                                    class="my-card q-card-calendar-tune-style"
                                                >
                                                    <q-card-section>
                                                        <div class="q-pa-xs">
                                                            <label
                                                                for="eventAddTag"
                                                                >Projektname</label
                                                            >
                                                            <q-input
                                                                outlined
                                                                dense
                                                                v-model="
                                                                    newProject
                                                                "
                                                                use-input
                                                                hide-selected
                                                                fill-input
                                                                input-debounce="10"
                                                            >
                                                            </q-input>
                                                        </div>
                                                    </q-card-section>
                                                    <q-card-section
                                                        class="row justify-around"
                                                    >
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
                                                            @click="
                                                                addNewProject
                                                            "
                                                        />
                                                    </q-card-section>
                                                </q-card>
                                            </q-popup-proxy>
                                        </q-btn>
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-btn>
                    </div>
                </div>
                <div
                    class="row q-pa-xs items-center"
                    v-if="modelValue.company_id"
                >
                    <div for="eventTag">Company</div>
                    <q-chip
                        removable
                        color="primary"
                        text-color="white"
                        :label="getCompanyName(modelValue.company_id)"
                        :title="getCompanyName(modelValue.company_id)"
                        name="eventCompany"
                        id="eventCompany"
                        ref="eventCompany"
                        @remove="removeCompanyFromEvent()"
                    />
                </div>
                <div
                    class="row q-pa-xs items-center"
                    v-if="modelValue.project_id"
                >
                    <div for="eventTag">Project</div>
                    <q-chip
                        removable
                        color="primary"
                        text-color="white"
                        :label="getProjectName(modelValue.project_id)"
                        :title="getProjectName(modelValue.project_id)"
                        name="eventproject"
                        id="eventproject"
                        ref="eventproject"
                        @remove="removeProjectFromEvent()"
                    />
                </div>
                <div class="q-pa-xs">
                    <div for="eventTag">Tags</div>
                    <q-chip
                        v-for="tag in modelValue.tags"
                        :key="tag"
                        removable
                        color="primary"
                        text-color="white"
                        :label="tag"
                        :title="tag"
                        name="eventtag"
                        id="eventtag"
                        ref="eventtag"
                        @remove="removeTagFromEvent(tag)"
                    />
                </div>
                <div class="q-pa-xs">
                    <label for="eventAddTag">Add Tag</label>
                    <q-select
                        outlined
                        dense
                        v-model="tag"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="10"
                        :options="tags"
                        @filter="filterFn"
                        @input-value="(e) => setTag(e)"
                        @keyup.enter="addTagToEvent"
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    No results
                                </q-item-section>
                            </q-item>
                        </template>
                        <template #append>
                            <q-btn
                                icon="add"
                                round
                                size="sm"
                                color="primary"
                                @click="addTagToEvent"
                            >
                            </q-btn>
                        </template>
                    </q-select>
                </div>
                <div class="q-pa-xs">
                    <label for="eventStartDate"
                        >Event start date and time</label
                    >
                    <q-input
                        name="eventStartDate"
                        id="eventStartDate"
                        :model-value="modelValue.start"
                        ref="eventStartDate"
                        dense
                        mask="####-##-## ##:##"
                        @update:model-value="(e) => updateData(e, 'start')"
                        :rules="[
                            (val) =>
                                checkDateTimeStart() ||
                                'Start time cannot come after end time',
                        ]"
                        outlined
                        color="blue-6"
                        hide-bottom-space
                    >
                        <template #append>
                            <q-icon
                                name="event"
                                color="primary"
                                class="cursor-pointer"
                            >
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                    v-model="showDateStart"
                                >
                                    <q-date
                                        :model-value="modelValue.start"
                                        @update:model-value="
                                            (e) => {
                                                updateData(e, 'start');
                                                showDateStart = false;
                                                showTimeStart = true;
                                            }
                                        "
                                        mask="YYYY-MM-DD HH:mm"
                                        color="primary"
                                    />
                                </q-popup-proxy>
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                    v-model="showTimeStart"
                                >
                                    <q-time
                                        :model-value="modelValue.start"
                                        @update:model-value="
                                            (e) => updateData(e, 'start')
                                        "
                                        format24h
                                        mask="YYYY-MM-DD HH:mm"
                                        color="primary"
                                        @close="
                                            () => {
                                                showTimeStart = false;
                                            }
                                        "
                                        minimal
                                    >
                                        <div
                                            class="row items-center justify-end q-gutter-sm"
                                        >
                                            <q-btn
                                                label="OK"
                                                color="primary"
                                                v-close-popup
                                            /></div
                                    ></q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="q-pa-xs">
                    <label for="eventEndDate">Event end date and time</label>
                    <q-input
                        name="eventEndDate"
                        id="eventEndDate"
                        :model-value="modelValue.end"
                        ref="eventEndDate"
                        dense
                        mask="####-##-## ##:##"
                        @update:model-value="(e) => updateData(e, 'end')"
                        :rules="[
                            (val) =>
                                checkDateTimeEnd() ||
                                'Start time cannot come after end time',
                        ]"
                        outlined
                        color="blue-6"
                        hide-bottom-space
                    >
                        <template #append>
                            <q-icon
                                name="event"
                                color="primary"
                                class="cursor-pointer"
                            >
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                    v-model="showDateEnd"
                                >
                                    <q-date
                                        :model-value="modelValue.end"
                                        @update:model-value="
                                            (e) => {
                                                updateData(e, 'end');
                                                showDateEnd = false;
                                                showTimeEnd = true;
                                            }
                                        "
                                        mask="YYYY-MM-DD HH:mm"
                                        color="primary"
                                    />
                                </q-popup-proxy>
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                    v-model="showTimeEnd"
                                >
                                    <q-time
                                        :model-value="modelValue.end"
                                        @update:model-value="
                                            (e) => updateData(e, 'end')
                                        "
                                        format24h
                                        mask="YYYY-MM-DD HH:mm"
                                        color="primary"
                                        @close="
                                            () => {
                                                showTimeEnd = false;
                                            }
                                        "
                                        minimal
                                    >
                                        <div
                                            class="row items-center justify-end q-gutter-sm"
                                        >
                                            <q-btn
                                                label="OK"
                                                color="primary"
                                                v-close-popup
                                            /></div
                                    ></q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="q-pa-xs">
                    <label for="eventAddTag">Icon</label>
                    <q-input
                        :model-value="modelValue.icon"
                        @update:model-value="(e) => updateData(e, 'icon')"
                        outlined
                        clearable
                        dense
                    >
                        <template #append>
                            <q-icon
                                name="extension"
                                color="primary"
                                class="cursor-pointer"
                            >
                                <q-popup-proxy v-model="showIconPicker">
                                    <q-icon-picker
                                        :model-value="modelValue.icon"
                                        @update:model-value=" (e:string) =>
                                    updateData(e, 'icon') "
                                        :filter="modelValue.icon"
                                        icon-set="material-icons"
                                        tooltips
                                        v-model:model-pagination="pagination"
                                        :pagination-props="{
                                            maxPages: 5,
                                            input: false,
                                            color: 'primary',
                                            'direction-links': true,
                                            'boundary-links': true,
                                            'icon-first': 'skip_previous',
                                            'icon-last': 'skip_next',
                                            'icon-prev': 'fast_rewind',
                                            'icon-next': 'fast_forward',
                                        }"
                                        class="q-card-calendar-tune-style"
                                        style="height: 300px; width: 300px"
                                    />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="q-pa-xs">
                    <label for="eventAddColor">Color</label>
                    <q-input
                        :model-value="modelValue.bgcolor"
                        @update:model-value="(e) => updateData(e, 'bgcolor')"
                        outlined
                        clearable
                        dense
                    >
                        <template #append>
                            <q-icon
                                name="colorize"
                                color="primary"
                                class="cursor-pointer"
                            >
                                <q-popup-proxy>
                                    <q-color
                                        :model-value="modelValue.bgcolor"
                                        @update:model-value="
                                            (e) => updateData(e, 'bgcolor')
                                        "
                                        class="q-card-calendar-tune-style"
                                    ></q-color>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </q-card-section>
            <q-separator dark inset></q-separator>
            <q-card-actions class="justify-center q-py-md">
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
                    @click="onAddEvent"
                />
            </q-card-actions>
        </q-scroll-area>
    </q-card>
</template>
<script setup lang="ts">
import { CalenderEvent } from 'src/types';
import { onBeforeMount, ref } from 'vue';
import lodash from 'lodash';
import { Notify, QInput } from 'quasar';
import {
    Timestamp,
    getDayIdentifier,
    getTimeIdentifier,
    parseTimestamp,
} from '@quasar/quasar-ui-qcalendar';
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker';
import '@quasar/quasar-ui-qiconpicker/src/index.sass';
import { EventService } from 'src/api';

interface MyProps {
    modelValue: CalenderEvent;
    locale?: string;
}
const props = withDefaults(defineProps<MyProps>(), {
    locale: 'en-US',
});
const tags = ref<string[]>([]);
const tagsList = ref<string[]>([]);
const emit = defineEmits(['update:model-value', 'on-add-event']);
const eventStartDate = ref<QInput>();
const eventEndDate = ref<QInput>();
const tag = ref('');
const showDateStart = ref(false);
const showTimeStart = ref(false);
const showDateEnd = ref(false);
const showTimeEnd = ref(false);
const showIconPicker = ref(false);
const company = ref('');
const project = ref('');
const newCompany = ref('');
const newProject = ref('');
const companies = ref<{ id: string; title: string }[]>([]);
const projects = ref<{ id: string; title: string }[]>([]);
const pagination = ref({
    itemsPerPage: 35,
    page: 0,
});
const updateData = function (value: string | number | null, prop: string) {
    const newData = lodash.merge({}, props.modelValue);
    lodash.set(newData, prop, value);
    emit('update:model-value', newData);
};
const addTagToEvent = function () {
    tag.value = tag.value.trim();
    if (!!tag.value) {
        const newData = lodash.merge({}, props.modelValue);
        if (newData.tags?.filter((x) => x == tag.value).length == 0) {
            newData.tags?.push(tag.value);
            emit('update:model-value', newData);
            setTag('');
        }
    }
};
const removeTagFromEvent = function (value: string) {
    const newData = lodash.merge({}, props.modelValue);
    newData.tags = newData.tags?.filter((x) => x != value) as string[];
    emit('update:model-value', newData);
};
const checkDateTimeStart = function (/* val */) {
    try {
        eventStartDate.value?.resetValidation();
        if (props.modelValue.start && props.modelValue.end) {
            const timestampStart = parseTimestamp(props.modelValue.start);
            const timestampEnd = parseTimestamp(props.modelValue.end);

            const dayStart = timestampStart
                ? getDayIdentifier(timestampStart as Timestamp)
                : 0;
            const dayEnd = timestampEnd
                ? getDayIdentifier(timestampEnd as Timestamp)
                : 0;

            if (dayStart < dayEnd) {
                return true;
            } else if (dayStart > dayEnd) {
                return false;
            } else {
                const timeStart = getTimeIdentifier(
                    timestampStart as Timestamp
                );
                const timeEnd = getTimeIdentifier(timestampEnd as Timestamp);
                if (timeStart <= timeEnd) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    } catch {
        return false;
    }
};

const checkDateTimeEnd = function () {
    try {
        eventStartDate.value?.resetValidation();
        eventEndDate.value?.resetValidation();
        if (props.modelValue.start && props.modelValue.end) {
            const timestampEnd = parseTimestamp(props.modelValue.end);
            const timestampStart = parseTimestamp(props.modelValue.start);
            const dayEnd = timestampEnd
                ? getDayIdentifier(timestampEnd as Timestamp)
                : 0;
            const dayStart = timestampStart
                ? getDayIdentifier(timestampStart as Timestamp)
                : 0;
            if (dayEnd > dayStart) {
                return true;
            } else if (dayEnd < dayStart) {
                return false;
            } else {
                const timeEnd = getTimeIdentifier(timestampEnd as Timestamp);
                const timeStart = getTimeIdentifier(
                    timestampStart as Timestamp
                );
                if (timeEnd >= timeStart) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    } catch {
        return false;
    }
};
const onAddEvent = function () {
    emit('on-add-event');
};
const loadTags = async () => {
    try {
        tagsList.value = await EventService.loadTags();
        tags.value = tagsList.value;
    } catch {
        tagsList.value = [];
    }
};
const filterFn = (val: string, update: any) => {
    update(() => {
        const needle = val.toLocaleLowerCase();
        tags.value = tagsList.value.filter(
            (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
    });
};
const setTag = (val: string) => {
    tag.value = val;
};
const setCompany = () => {
    company.value = company.value.trim();
    if (!!company.value) {
        const newData = lodash.merge({}, props.modelValue);
        lodash.set(newData, 'company_id', company);
        emit('update:model-value', newData);
    }
};
const setProject = () => {
    project.value = project.value.trim();
    if (!!project.value) {
        const newData = lodash.merge({}, props.modelValue);
        lodash.set(newData, 'project_id', project);
        emit('update:model-value', newData);
    }
};
const loadCompanies = async () => {
    try {
        companies.value = await EventService.loadCompanies();
    } catch {
        companies.value = [];
    }
};
const loadProjects = async () => {
    try {
        projects.value = await EventService.loadProjects();
    } catch {
        projects.value = [];
    }
};
const addNewCompany = async () => {
    try {
        await EventService.createCompanies(newCompany.value);
        newCompany.value = '';
        company.value = '';
        loadCompanies();
    } catch {
        Notify.create({ message: 'failed', color: 'negative' });
    }
};
const addNewProject = async () => {
    try {
        await EventService.createProjects(newProject.value);
        newProject.value = '';
        project.value = '';
        loadProjects();
    } catch {
        Notify.create({ message: 'failed', color: 'negative' });
    }
};
const removeCompanyFromEvent = () => {
    const newData = lodash.merge({}, props.modelValue);
    lodash.set(newData, 'company_id', undefined);
    emit('update:model-value', newData);
};
const removeProjectFromEvent = () => {
    const newData = lodash.merge({}, props.modelValue);
    lodash.set(newData, 'project_id', undefined);
    emit('update:model-value', newData);
};
const getCompanyName = (id: string) => {
    return companies.value.find((x) => x.id == id)?.title ?? '-';
};
const getProjectName = (id: string) => {
    return projects.value.find((x) => x.id == id)?.title ?? '-';
};
onBeforeMount(() => {
    loadTags();
    loadCompanies();
    loadProjects();
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
