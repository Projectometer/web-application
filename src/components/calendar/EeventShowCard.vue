<template>
    <q-card class="width-400">
        <q-card-section
            class="row items-center q-pa-xs text-white"
            :style="getCardBgColor"
        >
            <q-icon :name="modelValue.icon" size="sm" class="q-mx-sm" />
            {{ modelValue.title }}
            <q-space />
            <q-btn
                flat
                round
                icon="delete"
                @click="$emit('on-delete')"
                v-close-popup
            />
            <q-btn
                flat
                round
                icon="edit"
                @click="$emit('on-edit')"
                v-close-popup
            />
            <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section>{{ modelValue.details }}</q-card-section>
        <q-card-section v-if="modelValue.company"
            >Company: {{ modelValue.company.title }}</q-card-section
        >
        <q-card-section v-if="modelValue.project"
            >Project: {{ modelValue.project.title }}</q-card-section
        >
        <q-card-section
            ><q-chip
                v-for="tag in modelValue.tags"
                :key="tag"
                color="primary"
                text-color="white"
                :label="tag.tag ? tag.tag : tag"
                :title="tag.tag ? tag.tag : tag"
                name="eventtag"
                id="eventtag"
                ref="eventtag"
        /></q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { EventService } from 'src/api';
import { CalenderEvent } from 'src/types';
import { computed, onBeforeMount, ref } from 'vue';

interface MyProps {
    modelValue: CalenderEvent;
}
const props = defineProps<MyProps>();
defineEmits(['on-edit', 'on-delete']);
const getCardBgColor = computed(() => {
    return `background-color:${props.modelValue.bgcolor}`;
});
const companies = ref<{ id: string; title: string }[]>([]);
const projects = ref<{ id: string; title: string }[]>([]);

const loadCompanies = async () => {
    try {
        companies.value = await EventService.loadCompanies();
    } catch {
        companies.value = [];
    }
};
const loadProjects = async () => {
    try {
        projects.value = await EventService.loadProjects();
    } catch {
        projects.value = [];
    }
};
onBeforeMount(() => {
    loadCompanies();
    loadProjects();
});
</script>
