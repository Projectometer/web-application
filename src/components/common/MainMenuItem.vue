<template>
    <q-item
        :inset-level="insetLevel"
        :to="to"
        active-class="tab-active"
        class="q-ma-none navigation-item"
        clickable
        exact
        v-ripple
    >
        <q-item-section avatar>
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
            {{ title }}
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainMenuItem',

    props: {
        insetLevel: { default: 0, type: Number },
        title: { default: () => '', type: String },
        icon: { default: () => '', type: String },
        to: { default: null, type: String },
    },

    setup(props) {
        return { props };
    },
});
</script>
