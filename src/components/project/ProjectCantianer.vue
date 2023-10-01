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
            v-if="viewModeCompany == 'list' && viewMode == 'list'"
            style="min-width: 300px; height: 98%"
            :style="
                $q.platform.is.mobile
                    ? 'height: calc(100vh - 350)px'
                    : 'height: calc(100vh - 300)px'
            "
        >
            <q-item clickable v-ripple class="rounded-borders">
                <q-item-section>Projects list</q-item-section>
                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                            class="gt-xs add-btn"
                            size="12px"
                            flat
                            dense
                            round
                            icon="add"
                            @click="onCreateProject"
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
                    :active="link === item.id"
                    active-class="my-menu-link "
                    v-for="item in projects"
                    :key="item.id"
                    @click="link = item.id"
                >
                    <q-item-section>{{ item.title }}</q-item-section>
                    <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn
                                class="gt-xs delete-btn"
                                size="12px"
                                color="red"
                                flat
                                dense
                                round
                                icon="delete"
                                @click="onDeleteProject(item.id)"
                            />
                            <q-btn
                                class="gt-xs edit-btn"
                                size="12px"
                                flat
                                dense
                                round
                                icon="edit"
                                @click="onEditProject(item)"
                            />
                        </div>
                    </q-item-section>
                </q-item>
            </q-scroll-area>
        </q-list>
        <q-list
            bordered
            class="rounded-borders q-ml-xs my-list"
            v-if="viewModeCompany == 'list' && viewMode == 'list'"
            style="min-width: 300px; height: 98%"
            :style="
                $q.platform.is.mobile
                    ? 'height: calc(100vh - 350)px'
                    : 'height: calc(100vh - 300)px'
            "
        >
            <q-item clickable v-ripple class="rounded-borders">
                <q-item-section>Compay list</q-item-section>
                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                            class="gt-xs add-btn"
                            size="12px"
                            flat
                            dense
                            round
                            icon="add"
                            @click="onCreateCompany"
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
                    :active="link === item.id"
                    active-class="my-menu-link"
                    v-for="item in companies"
                    :key="item.id"
                    @click="link = item.id"
                >
                    <q-item-section>{{ item.title }}</q-item-section>
                    <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn
                                class="gt-xs delete-btn"
                                size="12px"
                                flat
                                dense
                                round
                                icon="delete"
                                @click="onDeleteCompany(item.id)"
                            />
                            <q-btn
                                class="gt-xs edit-btn"
                                size="12px"
                                flat
                                dense
                                round
                                icon="edit"
                                @click="onEditCompany(item)"
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
            <div class="row text-center justify-center">Project</div>
            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="project.title"
                    label="Beschreibung"
                >
                </q-input>
            </div>

            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="project.description"
                    type="textarea"
                    label="Beschreibung"
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
                    @click="onSaveProject"
                />
            </div>
        </q-scroll-area>
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
            v-if="viewModeCompany != 'list'"
        >
            <div class="row text-center justify-center">Company</div>

            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="company.title"
                    label="Beschreibung"
                >
                </q-input>
            </div>

            <div class="row">
                <q-input
                    outlined
                    rounded
                    dense
                    :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
                    class="full-width with-icon"
                    v-model="company.description"
                    type="textarea"
                    label="Beschreibung"
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
                    @click="onSaveCompany"
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
interface ProjectType {
    id?: string;
    title: string;
    description?: string;
}
const router = useRouter();
const authStore = useAuthStore();

const signOut = () => {
    authStore.logout();
    router.replace({ name: 'main' });
};
const project = ref<ProjectType>({ title: '', description: '' });
const company = ref<ProjectType>({ title: '', description: '' });
const projects = ref<{ id: string; title: string }[]>([]);
const companies = ref<{ id: string; title: string }[]>([]);
const link = ref('');
const viewMode = ref<'list' | 'new' | 'edit'>('list');
const viewModeCompany = ref<'list' | 'new' | 'edit'>('list');
const onCancel = async () => {
    viewMode.value = 'list';
    viewModeCompany.value = 'list';
};
const onCreateProject = async () => {
    viewMode.value = 'new';
    project.value = {
        title: '',
        description: '',
    };
};
const onCreateCompany = async () => {
    viewModeCompany.value = 'new';
    company.value = {
        title: '',
        description: '',
    };
};
const onEditProject = async (item: ProjectType) => {
    viewMode.value = 'edit';
    project.value = item;
};
const onEditCompany = async (item: ProjectType) => {
    viewModeCompany.value = 'edit';
    company.value = item;
};
const onSaveProject = async () => {
    try {
        Loading.show();

        await EventService.createProjects(
            project.value.title,
            project.value.description,
            project.value.id
        );
        viewMode.value = 'list';
        loadProjects();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onSaveCompany = async () => {
    try {
        Loading.show();
        await EventService.createCompanies(
            company.value.title,
            company.value.description,
            company.value.id
        );
        viewModeCompany.value = 'list';
        loadCompanies();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onDeleteProject = async (id: string) => {
    try {
        Loading.show();
        await EventService.deleteProjects(id);
        viewMode.value = 'list';
        loadProjects();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const onDeleteCompany = async (id: string) => {
    try {
        Loading.show();
        await EventService.deleteCompanies(id);
        viewModeCompany.value = 'list';
        loadCompanies();
    } catch {
        Notify.create({ message: 'Network error', color: 'negative' });
        signOut();
    } finally {
        Loading.hide();
    }
};
const loadCompanies = async () => {
    try {
        Loading.show();
        companies.value = await EventService.loadCompanies();
    } catch {
        companies.value = [];
    } finally {
        Loading.hide();
    }
};
const loadProjects = async () => {
    try {
        Loading.show();
        projects.value = await EventService.loadProjects();
    } catch {
        projects.value = [];
    } finally {
        Loading.hide();
    }
};
onBeforeMount(() => {
    loadCompanies();
    loadProjects();
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
