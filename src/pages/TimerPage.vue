<template>

  <q-page class="calendar-container">

    <div class="row ">

      <div class="col col col-1 calendar-padding bg-calendar-aside">
        <div class="row calendar-padding justify-center">

          <q-tabs vertical>
            <q-tab name="mails" icon="timer"></q-tab>
            <q-tab name="alarms" icon="play_for_work"></q-tab>
            <q-tab name="movies" icon="model_training"></q-tab>
            <q-tab name="actualing" icon="visibility"></q-tab>
            <q-tab name="dashboard" icon="dashboard"></q-tab>
            <q-tab name="sample" icon="lightbulb"></q-tab>
          </q-tabs>

        </div>
      </div>

      <div class="col col-11 calendar-padding bg-calendar-calendar">
        <div class="col ">
          <div class="row clendar-header-style items-center">

            <q-btn @click="showModal" icon="tune" class="col col-1 clandar-tuner-button-style ">
              <q-tooltip class="text-caption">Tuner</q-tooltip>
            </q-btn>

            <q-dialog v-model="tuneOptions">
              <q-card class="my-card calendar-padding-new q-card-calendar-tune-style">
                <q-scroll-area style="height: 100%; width: auto;">
                  <q-card-section>
                    <div class="text-h6">Tune Kalendar</div>
                  </q-card-section>
                  <q-separator dark inset></q-separator>
                  <q-card-section>
                    <div class="tune-card-selection-style">
                      <q-btn @click="showModal" icon="public" label="Choose location">
                      </q-btn>
                    </div>

                    <div class="tune-card-selection-style">
                      <q-toggle label="Short Month label" v-model="shortMonthLable"></q-toggle>
                    </div>
                    <div class="tune-card-selection-style">
                      <q-toggle label="Short Week label" v-model="shortWeekLable"></q-toggle>
                    </div>
                    <div class="tune-card-selection-style">
                      <q-toggle label="24hr interval labels" v-model="hrIntervalLable"></q-toggle>
                    </div>
                    <div class="tune-card-selection-style style-left">
                      <q-badge class="calendar-tune-range-badge-style">
                        Interval height (Daily)
                      </q-badge>
                      <q-slider v-model="intervalHeightDaily" :min="0" :max="50"></q-slider>
                    </div>
                    <div class="tune-card-selection-style style-left">
                      <q-badge class="calendar-tune-range-badge-style">
                        Interval height (Monthly)
                      </q-badge>
                      <q-slider v-model="intervalHeightMontgly" :min="0" :max="50"></q-slider>
                    </div>
                    <div class="tune-card-selection-style style-left">
                      <q-badge class="calendar-tune-range-badge-style">
                        Day height (Monthly)
                      </q-badge>
                      <q-slider v-model="dayHeightMontgly" :min="0" :max="50"></q-slider>
                    </div>
                    <div class="tune-card-selection-style style-left">
                      <q-badge class="calendar-tune-range-badge-style">
                        Team Height (Scheduler)
                      </q-badge>
                      <q-slider v-model="resourceHeightScheduler" :min="0" :max="50"></q-slider>
                    </div>
                    <div class="tune-card-selection-style style-left">
                      <q-badge class="calendar-tune-range-badge-style">
                        Team Width (Scheduler)
                      </q-badge>
                      <q-slider v-model="resourceWidthScheduler" :min="0" :max="50"></q-slider>
                    </div>
                  </q-card-section>
                  <q-separator dark inset></q-separator>
                  <q-card-actions align="right">
                    <q-btn flat label="Abbrechen" v-close-popup class="btn-abort-modal" />
                    <q-btn flat label="Speichern" v-close-popup class="tune-save-button-style btn-save-modal" />
                  </q-card-actions>
                </q-scroll-area>
              </q-card>
            </q-dialog>
            <div>
              <q-btn class="arrow-button-style" flat dense round icon="keyboard_arrow_left" @click="onPrev"></q-btn>
            </div>
            <div>
              <q-btn flat dense round icon="keyboard_arrow_right" @click="onNext"></q-btn>
            </div>
            <div class="calendar-toolbar-radio-style">
              <q-radio v-model="calendarShape" val="15 min" label="15 min" color="green-14"></q-radio>
              <q-radio v-model="calendarShape" val="30 min" label="30 min" color="green-14"></q-radio>
              <q-radio v-model="calendarShape" val="60 min" label="60 min" color="green-14"></q-radio>
            </div>
            <strong class="padding-left-test"> Your Selected Time Shape: {{ calendarShape }}</strong>
            <q-space></q-space>

            <q-btn-dropdown class="col col-2 q-btn-claendar-header justify-center" label="Day"></q-btn-dropdown>

          </div>
          <q-calendar class="calendar-calendar-padding "></q-calendar>
        </div>
      </div>
    </div>
  </q-page>

</template>

<script setup>
import { ref } from 'vue'
import { QCalendar } from '@quasar/quasar-ui-qcalendar'

const tuneOptions = ref(false);
const showModal = () => {
  tuneOptions.value = true;
}

const calendarShape = ref('calendarShape.value');

</script>
