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
                          ? $q.screen.height - 430
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
                    v-model="report.date"
                    type="text"
                    label="Datum Wählen"
                >
                    <template v-slot:append>
                        <q-icon
                            name="event_available"
                            right
                            class="border-icon"
                        />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="col col-md-6 col-sm-6 col-xs-12 with-icon"
                    v-model="report.project"
                    type="text"
                    label="Projekt Wählen"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>

                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="col col-md-6 col-sm-6 col-xs-12 with-icon"
                    v-model="report.event"
                    type="text"
                    label="Event Wählen"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.customer"
                    type="text"
                    label="Wählen Wie Ihren Kunden aus der Liste aus!"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.dataType"
                    type="text"
                    label="wählen Sie bitte den Datentyp!"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="report.sysAddress"
                    type="text"
                    label="Wo möchten Sie Ihren bericht speichern?"
                >
                    <template v-slot:append>
                        <q-icon name="search" right class="border-icon" />
                    </template>
                </q-input>
            </div>
            <div class="row justify-center">
                <q-btn
                    flat
                    label="Speichern"
                    class="text-white q-px-xl q-my-md btn-save-modal"
                    no-caps
                />
            </div>
            <!-- </div> -->
        </q-scroll-area>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
interface ReportType {
    date: string;
    project: string;
    event: string;
    customer: string;
    dataType: string;
    sysAddress: string;
}
const report = ref<ReportType>({
    date: '',
    project: '',
    event: '',
    customer: '',
    dataType: '',
    sysAddress: '',
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
