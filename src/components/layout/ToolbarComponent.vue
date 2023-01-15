<template>
  <div class="row">

    <q-tabs inline-label v-if="userData === null">
      <q-route-tab class="col btn noselect justify-end" name="Login" icon="fingerprint" to="/Login" replace
        label="Login" />
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

    <q-space></q-space>

    <q-tabs inline-label v-if="userData !== null">
      <q-avatar>
        {{ userData.username }}
      </q-avatar>
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">
      <q-route-tab class="col col-1  btn-small noselect " name="Logout" icon="logout" to="/Timer" />
      <q-tooltip class="text-body2">Logout</q-tooltip>
    </q-tabs>



  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue'

const userData = ref({
  email: 'radin@ms.com',
  username: 'radin'
});
</script>
