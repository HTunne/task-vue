<template>
    <v-container>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <h1 v-if="selectedTask.notFound">Task Not Found</h1>
                        <h1 v-else>
                            Task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }} Info
                        </h1>
                    </v-col>
                    <v-col align-self="center" cols="2">
                        <v-btn icon @click="editSelectedTask"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-if="selectedTask.uuid">
                <v-row>
                    <v-col>
                        <h2>{{ selectedTask.description }}</h2>
                    </v-col>
                </v-row>
                <v-row v-if="selectedTask.project">
                    <v-col>
                        <v-chip large label outlined color="primary">{{ selectedTask.project }} </v-chip>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3> Status: {{ selectedTask.status }} </h3>
                    </v-col>
                    <v-col>
                        <h3> Urgency: {{ selectedTask.urgency.toFixed(2) }}</h3>
                    </v-col>
                </v-row>
                <v-row v-if="selectedTask.tags">
                    <v-col cols=2>
                        <h3>Tags: </h3>
                    </v-col>
                    <v-col>
                        <div id="task-chip-container">
                            <v-chip
                                v-for="(tag, index) in selectedTask.tags"
                                depressed
                                style="margin: 0 5px 5px 0"
                                color="primary"
                                :key="index"
                                class="text-none">
                                {{ tag }}
                            </v-chip>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="selectedTask.annotations">
                    <v-col>
                        <h3>Annotations: </h3>
                        <v-simple-table height="300px">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Entry</th>
                                        <th class="text-left">Descripition</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(annotation, index) in selectedTask.annotations" :key="index">
                                        <td>{{ annotation.entry }}</td>
                                        <td>{{ annotation.description }}</td>
                                        <td><v-btn><v-icon>mdi-close</v-icon></v-btn></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>


<script>
export default {
    name: 'taskInfo',
    computed: {
        selectedTask () {
            let task = this.$store.getters.getSelectedTask;
            if (task)
                return task;
            return { 'notFound': true };
        },
    },
    methods: {
        editSelectedTask () {
            if (this.selectedTask.uuid) {
                let uuid = this.selectedTask.uuid;
                this.$router.push({ name: 'TaskEdit', params: { uuid } })
            }
        }
    },
    created: function () {
        this.$store.commit('set_selected_task_uuid', this.$route.params.uuid)
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.commit('set_selected_task_uuid', to.params.uuid);
        next();
    }
}
</script>

