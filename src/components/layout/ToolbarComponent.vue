<template>
  <div class=" no-margin row">

    <q-tabs inline-label v-if="userData === null">
      <q-route-tab class="col btn noselect" name="Login" icon="fingerprint" to="/Login" replace label="Login" />
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect " name="Timer" icon="alarm" to="/Timer" />
      <q-tooltip class="text-body2">Timer</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect" name="Berichte" icon="grading" to="/Reports" />
      <q-tooltip class="text-body2">Berichte</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect" name="Project" icon="cases" to="/Project" />
      <q-tooltip class="text-body2">Projekt</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect" name="Tags" icon="bookmark_border" to="/Tags" />
      <q-tooltip class="text-body2">Tags</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1 btn-small noselect" name="Import/Export" icon="import_export" to="/ImportExport" />
      <q-tooltip class="text-body2">Import/Export</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1 btn-small noselect" name="Organisation" icon="schema" to="/Organisation" />
      <q-tooltip class="text-body2">Organisation</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1 btn-small noselect" name="Setting" icon="settings" to="/Setting" />
      <q-tooltip class="text-body2">Einstellungen</q-tooltip>
    </q-tabs>

    <div class="col col-2">
      <q-item-label class="text-h6 time-style">{{ time }}</q-item-label>
      <q-item-label class="text-body2 date-style">{{ date }}</q-item-label>
    </div>

    <q-space></q-space>

    <q-tabs class="col col-3" inline-label v-if="userData !== null">

      <div class="row">
        <q-tabs round class="col-auto q-btn-style">
          <q-avatar size="3rem">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-tabs>

        <q-avatar square class="col">
          <div class="text-left">
            <div class="user-data-style-user">Willkommen {{ userData.username }}! </div>
            <div class="txt-color user-data-style"> {{ userData.mail }} </div>
          </div>
        </q-avatar>
      </div>

    </q-tabs>




    <q-btn outline inline-label v-if="userData !== null" round class="sq-btn" color="$xxBlack20" icon="notifications">
    </q-btn>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect " name="Logout" icon="logout" to="/Timer" />
      <q-tooltip class="text-body2">Logout</q-tooltip>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { nowToDate, nowToTime } from 'src/helpers/date-time.helper'

const userData = ref({
  username: 'Radin',
  displayName: 'Adele Vance',
  givenName: 'Adele',
  jobTitle: 'Retail Manager',
  businessPhones: '+1 425 555 0109',
  mail: 'adele@contoso.onmicrosoft.com',
  mobilePhone: '+1 425 555 0109',
  officeLocation: '18/2111',
  preferredLanguage: 'en-US',
  surname: 'Vance',
  userPrincipalName: 'AdeleV@contoso.onmicrosoft.com',
  id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
  userImage: 'https://picsum.photos/200/300',
});

const time = ref(nowToTime());
setInterval(() => {
  time.value = nowToTime();
}, 1000)

const date = ref(nowToDate());
setInterval(() => {
  date.value = nowToDate();
}, 1000)

</script>
