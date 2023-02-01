<template>

  <q-page class="calendar-container">

    <div class="row ">

      <div class="col col col-1 calendar-padding bg-calendar-aside">
        <div class="row calendar-padding justify-center">

          <q-tabs vertical>
            <q-tab name="mails" icon="timer"></q-tab>
            <q-tab name="alarms" icon="play_for_work"></q-tab>
            <q-tab name="movies" icon="model_training"></q-tab>
            <q-tab name="mails" icon="timer"></q-tab>
            <q-tab name="alarms" icon="play_for_work"></q-tab>
            <q-tab name="movies" icon="model_training"></q-tab>
          </q-tabs>

        </div>
      </div>

      <div class="col col-11 calendar-padding bg-calendar-calendar">
        <div class="col calendar-padding">
          <div class="row row1 clendar-header-style calendar-header-padding"></div>
          <q-calendar class="row row12 calendar-calendar-padding"></q-calendar>
        </div>
      </div>

    </div>

  </q-page>

</template>

<script setup lang="ts">
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
</script>
