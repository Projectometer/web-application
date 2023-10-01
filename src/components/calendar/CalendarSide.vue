<template>
    <div class="column justify-center items-center full-height">
        <q-btn
            flat
            inline-label
            :icon="trackBtnData.icon"
            size="lg"
            class="q-my-lg no-padding square-btn"
            @click="onStratTrack"
            :class="trackBtnData.class"
        >
            <q-tooltip
                anchor="top right"
                :offset="[45, -15]"
                class="text-body2 tooltip-around q-px-lg"
                >{{ trackBtnData.title }}</q-tooltip
            ></q-btn
        >
        <q-btn
            flat
            round
            inline-label
            class="bg-grey-4 q-px-xs q-my-xs"
            icon="add"
            size="sm"
            @click="onSetManuallMode(true)"
        >
            <q-tooltip
                anchor="top right"
                :offset="[75, 2]"
                class="text-body2 tooltip-around"
                >Manuell Eingabe</q-tooltip
            ></q-btn
        >
        <q-btn
            flat
            round
            inline-label
            class="bg-grey-4 q-px-xs q-my-xs text-bold"
            icon="play_arrow"
            size="sm"
            @click="onSetManuallMode(false)"
        >
            <q-tooltip
                anchor="top right"
                :offset="[55, 3]"
                class="text-body2 tooltip-around"
                >Auto Track</q-tooltip
            ></q-btn
        >
        <q-btn
            flat
            round
            inline-label
            class="q-px-xs q-my-lg text-bold"
            icon="settings_backup_restore"
            size="md"
            @click="onResetSetting"
        >
            <q-tooltip
                anchor="top right"
                :offset="[60, -10]"
                class="text-body2 tooltip-around"
                >Aktualisieren</q-tooltip
            ></q-btn
        >
    </div>
</template>
<script setup lang="ts">
interface MyProps {
    manuallMode: boolean;
    trackMode: boolean;
    trackBtnData: { title: string; icon: string; class?: string };
}
defineProps<MyProps>();
const emit = defineEmits([
    'on-start-track',
    'on-set-manuall-mode',
    'on-reset-setting',
]);

const onStratTrack = function () {
    emit('on-start-track');
};
const onSetManuallMode = function (mode: boolean) {
    emit('on-set-manuall-mode', mode);
};
const onResetSetting = function () {
    emit('on-reset-setting');
};
</script>
<style></style>
