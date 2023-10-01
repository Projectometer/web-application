<template>
    <div class="row justify-between">
        <template v-if="!isLoggedIn">
            <q-space></q-space>

            <div class="login-Style">
                <q-tabs inline-label>
                    <q-route-tab
                        class="col btn btn-small q-mx-xs noselect"
                        name="Login"
                        icon="fingerprint"
                        @click="signIn"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Anmelden</q-tooltip
                    >
                </q-tabs>
            </div>
        </template>
        <template v-if="isLoggedIn">
            <div class="row">
                <q-tabs inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect"
                        name="Timer"
                        icon="schedule"
                        to="/Calendar"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Timer</q-tooltip
                    >
                </q-tabs>

                <q-tabs inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect"
                        name="Berichte"
                        icon="subject"
                        to="/Reports"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Berichte</q-tooltip
                    >
                </q-tabs>

                <q-tabs inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect"
                        name="Project"
                        icon="work_outline"
                        to="/Project"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Projekt</q-tooltip
                    >
                </q-tabs>

                <q-tabs inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect icon-rotate-90"
                        name="Tags"
                        icon="label_outline"
                        to="/Tags"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Tags</q-tooltip
                    >
                </q-tabs>

                <q-tabs inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect"
                        name="Setting"
                        icon="settings"
                        to="/Setting"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Einstellungen</q-tooltip
                    >
                </q-tabs>
            </div>
            <div class="row">
                <div
                    class="items-center q-mt-xs"
                    :class="$q.screen.lg ? 'q-mx-xl' : 'q-mx-xs'"
                >
                    <q-item-label class="text-h6 time-style">{{
                        time
                    }}</q-item-label>
                    <q-item-label class="text-body2 date-style">{{
                        date
                    }}</q-item-label>
                </div>

                <q-tabs inline-label>
                    <div class="row">
                        <q-tabs round class="col-auto q-btn-style">
                            <q-avatar size="3rem">
                                <img :src="userImage" />
                            </q-avatar>
                        </q-tabs>

                        <q-avatar square class="col">
                            <div class="text-left">
                                <div class="user-data-style-user">
                                    Willkommen {{ userData.username }}!
                                </div>
                                <div class="txt-color user-data-style">
                                    {{ userData.mail }}
                                </div>
                            </div>
                        </q-avatar>
                    </div>
                </q-tabs>

                <q-btn
                    flat
                    inline-label
                    round
                    class="sq-btn"
                    color="grey-1"
                    icon="o_notifications"
                    v-if="isLoggedIn"
                >
                    <q-badge
                        rounded
                        class="q-badge-style hidden"
                        floating
                        inline-label
                        v-if="isLoggedIn"
                        >7</q-badge
                    >
                </q-btn>

                <q-tabs class="logout-Style" inline-label>
                    <q-route-tab
                        class="col col-1 btn-small q-mx-xs noselect"
                        name="Logout"
                        icon="logout"
                        @click="signOut"
                    />
                    <q-tooltip class="text-body2 tooltip-around"
                        >Abmelden</q-tooltip
                    >
                </q-tabs>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import { nowToDate, nowToTime } from 'src/helpers/date-time.helper';
import { AuthModule } from 'src/modules';
import { Loading, Notify } from 'quasar';
import { SettingService } from 'src/api';
import { UserProfile } from 'src/types';

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => {
    return authStore.isLoggedIn;
});

const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const userImage = ref('/resources/images/user.png');
const signIn = async () => {
    try {
        (window as any).location = await AuthModule.getAuthUrl();
    } catch (err) {
        console.error(err);
        alert('Error, Operation failed!');
    }
};

const userData = ref<UserProfile>({
    username: '',
    displayName: '',
    givenName: '',
    jobTitle: '',
    businessPhones: '',
    mail: '',
    mobilePhone: '',
    officeLocation: '',
    preferredLanguage: '',
    surname: '',
    userPrincipalName: '',
    id: '',
    userImage: '',
});

const loadProfile = async () => {
    try {
        Loading.show();
        userData.value = await SettingService.loadProfile();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const loadProfileImage = () => {
    try {
        Loading.show();
        userImage.value = SettingService.loadProfileImage();
    } catch {
        userImage.value = '/resources/images/user.png';
    } finally {
        Loading.hide();
    }
};

const time = ref(nowToTime());
const date = ref(nowToDate());

setInterval(() => {
    time.value = nowToTime();
    date.value = nowToDate();
}, 1000);
loadProfile();
loadProfileImage();
</script>
