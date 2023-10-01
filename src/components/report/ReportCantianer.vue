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
            style="width: 40%"
            :style="
                $q.platform.is.mobile
                    ? 'height: 95%'
                    : 'height: calc(100vh - ' +
                      ($q.screen.height >= 700
                          ? $q.screen.height - 380
                          : $q.screen.height <= 470
                          ? $q.screen.height - 200
                          : $q.screen.height - 300) +
                      'px)'
            "
        >
            <!-- <div class="col col-md-4 col-sm-6 col-xs-12 self-center"> -->
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.start_date"
                    type="text"
                    label="Datum Wählen"
                >
                    <template #append>
                        <q-icon
                            name="event_available"
                            right
                            class="border-icon cursor-pointer"
                        >
                            <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                                v-model="showDate"
                            >
                                <q-date
                                    v-model="report.start_date"
                                    mask="YYYY-MM-DD"
                                    color="primary"
                                    v-close-popup
                                />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
            <div class="row">
                <label for="eventAddTag"></label>
                <q-select
                    outlined
                    rounded
                    dense
                    v-model="report.tags"
                    fill-input
                    input-debounce="10"
                    :options="tags"
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon report-chip"
                    label="Add Tag"
                    use-chips
                    multiple
                    stack-label
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.title"
                    type="text"
                    label="Event Wählen"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-select
                    outlined
                    rounded
                    dense
                    label="Projekt Wählen"
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.project_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="10"
                    :options="projects"
                    emit-value
                    map-options
                    option-label="title"
                    option-value="id"
                    @keydown="onDeleteProject"
                >
                    <template v-slot:append>
                        <q-icon
                            v-if="report.project_id != ''"
                            name="close"
                            @click.stop.prevent="report.project_id = ''"
                            class="cursor-pointer"
                        />
                    </template>
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                Keine Ergebnisse
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
            <div class="row">
                <q-select
                    outlined
                    rounded
                    dense
                    label="Firma Wählen"
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.company_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="10"
                    :options="companies"
                    emit-value
                    map-options
                    option-label="title"
                    option-value="id"
                    @keydown="onDeleteCompany"
                >
                    <template v-slot:append>
                        <q-icon
                            v-if="report.company_id != ''"
                            name="close"
                            @click.stop.prevent="report.company_id = ''"
                            class="cursor-pointer"
                        />
                    </template>
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                Keine Ergebnisse
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>

            <div class="row justify-center">
                <q-btn
                    flat
                    label="Speichern"
                    class="text-white q-px-xl q-my-md btn-save-modal"
                    no-caps
                    @click="exportReport"
                />
            </div>
            <!-- </div> -->
        </q-scroll-area>
    </div>
</template>
<script setup lang="ts">
import { EventService } from 'src/api';
import { onBeforeMount, ref } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';
import { CalenderEvent, ReportType } from 'src/types';
import { Loading } from 'quasar';

const report = ref<ReportType>({
    start_date: '',
    end_date: '',
    project_id: '',
    title: '',
    company_id: '',
    tags: [],
});

const showDate = ref(false);
const companies = ref<{ id: string; title: string }[]>([]);
const projects = ref<{ id: string; title: string }[]>([]);
const tags = ref<string[]>([]);

const onDeleteProject = (event: any) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
        report.value.project_id = '';
    }
};
const onDeleteCompany = (event: any) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
        report.value.company_id = '';
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
const addedExcellHeaderListFirst = [
    'Title',
    'Details',
    'Project',
    'Company',
    'Tags',
    'Event start date and time',
    'Event end date and time',
];
const exportReport = async () => {
    const wb = XLSX.utils.book_new();
    const res = await EventService.search(report.value);
    let dataHeader: string[] = [];
    let fullArray = [];
    for (let i = 0; i < addedExcellHeaderListFirst.length; i++) {
        dataHeader.push(addedExcellHeaderListFirst[i]);
    }
    fullArray.push(dataHeader);
    for (const item of res) {
        const data: CalenderEvent = item as CalenderEvent;

        let dataArray: string[] = [];
        if (data) {
            dataArray.push(data.title + '');
            dataArray.push(data.details + '');
            if (data.project && data.project.title) {
                dataArray.push(data.project.title + '');
            } else {
                dataArray.push('-');
            }
            if (data.company && data.company.title) {
                dataArray.push(data.company.title + '');
            } else {
                dataArray.push('-');
            }
            let tags = '';
            if (data.tags) {
                for (let j = 0; j < data.tags.length; j++) {
                    tags =
                        tags +
                        (data.tags[j] as { id: string; tag: string }).tag +
                        ', ';
                }
            }
            dataArray.push(tags);
            dataArray.push(data.date + ' ' + data.time);
            dataArray.push(data.end + ' ');
        }
        fullArray.push(dataArray);
    }

    const ws = XLSX.utils.aoa_to_sheet(fullArray);

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const fileName = 'report.xlsx'; // Export file name
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
};

const loadTags = async () => {
    try {
        Loading.show();
        tags.value = await EventService.loadTags();
    } catch {
        tags.value = [];
    } finally {
        Loading.hide();
    }
};
onBeforeMount(() => {
    loadTags();
    loadCompanies();
    loadProjects();
});
</script>
<style>
.q-field--outlined .q-field__control:before {
    border-color: #424242;
}
.q-icon.border-icon {
    color: #8ca5ff;
}
.border-icon {
    border: 2px solid #8ca5ff;
    border-radius: 50%;
    padding: 6px;
}
.with-icon .q-field__control.relative-position.row.no-wrap {
    padding-right: 0;
}
.clx-height-page {
    height: calc(100vh - 200px);
}
</style>
