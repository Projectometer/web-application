<template>
  <div class="no-margin row">
    <q-space v-if="!isLoggedIn"></q-space>

    <div class="login-Style">
      <q-tabs inline-label v-if="!isLoggedIn">
        <q-route-tab class="col btn btn-small noselect" name="Login" icon="fingerprint" @click="signIn" />
        <q-tooltip class="text-body2">Anmelden</q-tooltip>
      </q-tabs>
    </div>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Timer" icon="alarm" to="/Calendar" />
      <q-tooltip class="text-body2">Timer</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Berichte" icon="grading" to="/Reports" />
      <q-tooltip class="text-body2">Berichte</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Project" icon="cases" to="/Project" />
      <q-tooltip class="text-body2">Projekt</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Tags" icon="bookmark_border" to="/Tags" />
      <q-tooltip class="text-body2">Tags</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Import/Export" icon="import_export" to="/ImportExport" />
      <q-tooltip class="text-body2">Import/Export</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Organisation" icon="schema" to="/Organisation" />
      <q-tooltip class="text-body2">Organisation</q-tooltip>
    </q-tabs>

    <q-tabs inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Setting" icon="settings" to="/Setting" />
      <q-tooltip class="text-body2">Einstellungen</q-tooltip>
    </q-tabs>

    <div class="col col-2" v-if="isLoggedIn">
      <q-item-label class="text-h6 time-style">{{ time }}</q-item-label>
      <q-item-label class="text-body2 date-style">{{ date }}</q-item-label>
    </div>

    <q-space v-if="isLoggedIn"></q-space>

    <q-tabs class="col col-3" inline-label v-if="isLoggedIn">
      <div class="row">
        <q-tabs round class="col-auto q-btn-style">
          <q-avatar size="3rem">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-tabs>

        <q-avatar square class="col">
          <div class="text-left">
            <div class="user-data-style-user">
              Willkommen {{ userData.username }}!
            </div>
            <div class="txt-color user-data-style">{{ userData.mail }}</div>
          </div>
        </q-avatar>
      </div>
    </q-tabs>

    <q-btn outline inline-label round class="sq-btn" color="$xxBlack20" icon="notifications" v-if="isLoggedIn">
      <q-badge rounded class="q-badge-style" floating inline-label v-if="isLoggedIn">7</q-badge>
    </q-btn>

    <q-tabs class="logout-Style" inline-label v-if="isLoggedIn">
      <q-route-tab class="col col-1 btn-small noselect" name="Logout" icon="logout" @click="signOut" />
      <q-tooltip class="text-body2">Abmelden</q-tooltip>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import { nowToDate, nowToTime } from 'src/helpers/date-time.helper';
import { AuthModule } from 'src/modules';

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => {
  console.log(authStore);
  return authStore.isLoggedIn;
});

const signOut = () => {
  authStore.logout();
  router.replace({ name: 'main' });
};

const signIn = async () => {
  try {
    (window as any).location = await AuthModule.getAuthUrl();
  } catch (err) {
    console.error(err);
    alert('Error, Operation failed!');
  }
};

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
const date = ref(nowToDate());

setInterval(() => {
  time.value = nowToTime();
  date.value = nowToDate();
}, 1000);
</script>
