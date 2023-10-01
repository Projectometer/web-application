<template>
    <div class="full-height">
        <div style="height: calc(100% - 150px); padding: 10px">
            <q-scroll-area style="height: 100%">
                <!-- /Engineers menu -->
                <q-list class="rounded-borders">
                    <q-item inline-label>
                        <div class="">
                            <q-item-section round class="col-auto q-btn-style">
                                <q-avatar size="3rem">
                                    <img
                                        :src="
                                            userData.userImage ??
                                            '/resources/images/user.png'
                                        "
                                    />
                                </q-avatar>
                            </q-item-section>

                            <div class="text-left">
                                <div class="row user-data-style-user">
                                    Willkommen {{ userData.username }}!
                                </div>
                                <div class="row txt-color user-data-style">
                                    {{ userData.mail }}
                                </div>
                            </div>
                        </div>
                    </q-item>
                    <q-separator dark />
                    <main-menu-item
                        title="Timer"
                        icon="schedule"
                        to="/Calendar"
                    ></main-menu-item>
                    <main-menu-item
                        title="Berichte"
                        icon="subject"
                        to="/Reports"
                    ></main-menu-item>
                    <main-menu-item
                        title="Projekt"
                        icon="work_outline"
                        to="/Project"
                    ></main-menu-item>
                    <main-menu-item
                        title="Tags"
                        icon="label_outline"
                        to="/Tags"
                    ></main-menu-item>
                    <main-menu-item
                        title="Einstellungen"
                        icon="settings"
                        to="/Setting"
                    ></main-menu-item>
                    <q-separator dark />

                    <main-menu-item
                        title="Abmelden"
                        @click="signOut"
                        icon="logout"
                    ></main-menu-item>
                </q-list>
                <!-- /Engineers menu -->
            </q-scroll-area>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Loading, Notify } from 'quasar';
import { SettingService } from 'src/api';
import MainMenuItem from 'src/components/common/MainMenuItem.vue';
import { useAuthStore } from 'src/stores/AuthStore';
import { UserProfile } from 'src/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const userImage = ref('/resources/images/user.png');

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
loadProfile();
loadProfileImage();
</script>
