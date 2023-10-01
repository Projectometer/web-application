<template>
    <div
        class="row bg-calendar-report justify-center clx-height-page my-form"
        :style="
            $q.platform.is.mobile
                ? 'height: calc(100vh - 250)px'
                : 'height: calc(100vh - 200)px'
        "
    >
        <q-list
            bordered
            class="rounded-borders my-list"
            v-if="viewMode == 'list'"
            style="min-width: 300px; height: 98%"
            :style="
                $q.platform.is.mobile
                    ? 'height: calc(100vh - 350)px'
                    : 'height: calc(100vh - 300)px'
            "
        >
            <q-item clickable v-ripple class="rounded-borders">
                <q-item-section>Tags list</q-item-section>
                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                            class="gt-xs add-btn"
                            size="12px"
                            flat
                            dense
                            round
                            icon="add"
                            @click="onCreateTags"
                        />
                    </div>
                </q-item-section>
            </q-item>
            <q-scroll-area
                class="self-center"
                :class="
                    $q.platform.is.mobile ? '' : 'col-md-4 col-sm-6 col-xs-12'
                "
                :style="'height: 91%'"
            >
                <q-item
                    clickable
                    v-ripple
                    :active="link === item"
                    active-class="my-menu-link"
                    v-for="item in tags"
                    :key="item"
                    @click="link = item"
                >
                    <q-item-section>{{ item }}</q-item-section>
                    <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn
                                class="gt-xs delete-btn"
                                size="12px"
                                flat
                                dense
                                round
                                icon="delete"
                                @click="onDeleteTags(item)"
                            />
                        </div>
                    </q-item-section>
                </q-item>
            </q-scroll-area>
        </q-list>
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
            v-if="viewMode != 'list'"
        >
            <div class="row text-center justify-center">Tags</div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="tag"
                    label="Title"
                >
                </q-input>
            </div>
            <div class="row justify-around">
                <q-btn
                    flat
                    label="Abbrechen"
                    class="text-white q-px-xl q-my-md btn-abort-modal"
                    @click="onCancel"
                />
                <q-btn
                    flat
                    label="Speichern"
                    class="text-white q-px-xl q-my-md btn-save-modal"
                    @click="onSaveTags"
                />
            </div>
        </q-scroll-area>
    </div>
</template>
<script setup lang="ts">
import { Loading, Notify } from 'quasar';
import { EventService } from 'src/api';
import { useAuthStore } from 'src/stores/AuthStore';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const tag = ref<string>('');
const tags = ref<string[]>([]);
const link = ref('');
const viewMode = ref<'list' | 'new' | 'edit'>('list');
const viewModeCompany = ref<'list' | 'new' | 'edit'>('list');
const onCancel = async () => {
    viewMode.value = 'list';
    viewModeCompany.value = 'list';
};
const onCreateTags = async () => {
    viewMode.value = 'new';
    tag.value = '';
};
const onSaveTags = async () => {
    try {
        Loading.show();

        await EventService.createTags(tag.value);
        viewMode.value = 'list';
        loadTags();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onDeleteTags = async (title: string) => {
    try {
        Loading.show();
        await EventService.deleteTags(title);
        viewMode.value = 'list';
        loadTags();
    } catch (err) {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const loadTags = async () => {
    try {
        Loading.show();
        tags.value = await EventService.loadTags();
    } catch {
        tags.value = [];
    } finally {
        Loading.hide();
    }
};
onBeforeMount(() => {
    loadTags();
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
.my-menu-link {
    color: white;
    background: #46dcff;
}
</style>
