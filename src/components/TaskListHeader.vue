<template>
    <v-toolbar  dark color="grey" flat extension-height="57px">
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
            <v-btn icon @click="toggleShowCompleted">
                <v-icon v-if="showCompleted">mdi-eye-off-outline</v-icon>
                <v-icon v-else>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'TaskAdd'}" @click="clearSelectedTaskUUID">
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
export default {
    name: 'task-list-header',
    props: ['search', 'sortBy', 'showCompleted'],
    methods: {
        updateSearch(value) {
            this.$emit('update:search', value);
        },
        updateSortBy(value) {
            this.$emit('update:sortBy', value);
        },
        toggleShowCompleted() {
            console.log('toggle');
            this.$emit('update:showCompleted', !(this.showCompleted));
        },
        clearSelectedTaskUUID() {
            this.$store.commit('set_selected_task_uuid', undefined);
        }
    }
}
</script>
