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
            style="width: 60%"
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
            <div class="row col col-md-12 col-sm-12 col-xs-12 self-center">
                <div class="col col-md-6 col-sm-6 col-xs-12 self-center">
                    <div class="row">
                        <q-input
                            outlined
                            rounded
                            dense
                            class="full-width with-icon"
                            :class="
                                $q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'
                            "
                            v-model="report.date"
                            type="text"
                            label="Name des Tags"
                        >
                        </q-input>
                    </div>

                    <div class="row">
                        <q-input
                            outlined
                            rounded
                            dense
                            class="full-width with-icon"
                            :class="
                                $q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'
                            "
                            v-model="report.customer"
                            type="text"
                            label="Datum Wählen"
                        >
                            <template v-slot:append>
                                <q-icon
                                    name="search"
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
                            class="full-width with-icon"
                            :class="
                                $q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'
                            "
                            v-model="report.sysAddress"
                            type="textarea"
                            label="Ausgewählte Tags:"
                        >
                        </q-input>
                    </div>
                </div>
                <div class="col col-md-6 col-sm-6 col-xs-12 self-center">
                    <div class="row">
                        <q-input
                            outlined
                            rounded
                            dense
                            class="full-width with-icon"
                            :class="
                                $q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'
                            "
                            v-model="report.date"
                            type="textarea"
                            label="Ergebnisiliste:"
                        >
                        </q-input>
                    </div>
                </div>
            </div>
            <div
                class="row col col-md-12 col-sm-12 col-xs-12 items-center justify-around"
            >
                <div></div>
                <div></div>
                <q-btn
                    flat
                    label="Abbrechen"
                    class="text-white q-px-xl q-my-md btn-abort-modal"
                />
                <q-btn
                    flat
                    label="Speichern"
                    class="text-white q-px-xl q-my-md btn-save-modal"
                />
                <div></div>
                <div></div>
            </div>
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
.border-element {
    border: 1px solid #424242;
    border-radius: 30px;
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
