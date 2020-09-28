<template>
    <v-toolbar  dark color="secondary" flat extension-height="57px">
        <template v-slot:extension>
            <v-btn-toggle
                :value="sortBy"
                @change="updateSortBy"
                mandatory
                light>
                <v-btn value="alpha">
                    <v-icon>mdi-sort-alphabetical-ascending</v-icon>
                </v-btn>
                <v-btn value="urgency">
                    <v-icon>mdi-exclamation-thick</v-icon>
                </v-btn>
                <v-btn value="project">
                    <v-icon>mdi-shape-outline</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <v-btn v-show="!recurPage" icon @click="toggleShowHidden">
                <v-icon v-if="showHidden">mdi-eye-off-outline</v-icon>
                <v-icon v-else>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn icon @click="fetchTaskList">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon :retain-focus-on-click="false" @click="onAddTask">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-text-field
                :value="search"
                @input="updateSearch"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-filter-outline"
                label="Filter Tasks...">
            </v-text-field>
        </template>
    </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'task-list-header',
    props: ['search', 'sortBy', 'showHidden'],
    computed: {
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        ...mapActions(["fetchTaskList"]),
        updateSearch(value) {
            this.$emit('update:search', value);
        },
        updateSortBy(value) {
            this.$emit('update:sortBy', value);
        },
        toggleShowHidden() {
            console.log('toggle');
            this.$emit('update:showHidden', !(this.showHidden));
        },
        clearSelectedTaskUUID() {
            this.$store.commit('set_selected_task_uuid', undefined);
        },
        onAddTask() {
            this.clearSelectedTaskUUID();
            if (this.recurPage) this.$router.push({ name: 'TaskRecurAdd' });
            else this.$router.push({ name: 'TaskAdd'});
        }
    }
}
</script>
