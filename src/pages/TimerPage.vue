<template>
    <q-page class="q-px-md q-py-xl q-mt-36">
        <CalendarContainer
            :select-date="selectDate"
            @on-select-date="onUpdateDate"
        ></CalendarContainer>
    </q-page>
</template>
<script setup lang="ts">
import CalendarContainer from 'src/components/calendar/CalendarContainer.vue';
interface MyProps {
    selectDate: string;
}
defineProps<MyProps>();
const emit = defineEmits(['on-select-date']);

const onUpdateDate = function (day: string) {
    emit('on-select-date', day);
};
</script>
