<template>
  <div>

    <q-tabs inline-label v-if="userData === null">
      <!--  <q-route-tab icon="event" to="/Calendar" replace label="Timer" /> -->
      <q-route-tab class="loginStyle btn noselect" name="Login" icon="fingerprint" to="/Login" replace label="Login" />
    </q-tabs>

    <q-tabs inline-label v-if="userData !== null">

      <!--  <q-route-tab icon="event" to="/Calendar" replace label="Timer" /> -->
      <q-route-tab class="loginStyle btn noselect" name="Logout" icon="fingerprint" to="/Logout" replace
        label="Logout" />
    </q-tabs>

  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue'

const userData = ref({});
</script>
