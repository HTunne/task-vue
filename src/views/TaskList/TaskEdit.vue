<template>
    <v-container>
        <v-card light>
            <v-container>
                <v-row :no-gutters="!this.$vuetify.breakpoint.mobile">
                    <v-col align-self="center" cols="12">
                        <v-btn class="float-right mr-4" icon @click="resetEditTask"><v-icon>mdi-refresh</v-icon></v-btn>
                    </v-col>
                    <v-col>
                        <span class="text-h3" v-if="!editTask.uuid">Task Not Found</span>
                        <span class="text-h3" v-else>
                            Edit Task {{ editTask.id > 0 ? editTask.id : editTask.uuid.slice(0,8) }}
                        </span>
                    </v-col>
                </v-row>
            </v-container>
            <task-form :task.sync="editTask"/>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-actions>
                            <v-btn
                                :disabled="editTask.notFound"
                                @click="onUpdateTask">
                                Update details
                            </v-btn>
                            <v-btn
                                :disabled="editTask.notFound"
                                :to="{ name: 'TaskInfo' }">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col cols="12" md="6">
                        <task-options
                            :disabled="!!editTask.notFound"
                            :completed="editTask.status === 'completed'"
                            :started="!!editTask.start"
                            :id="editTask.id"
                            :uuid="editTask.uuid"
                            >
                        </task-options>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import taskForm from '@/components/TaskForm.vue';
import taskOptions from '@/components/TaskOptions.vue';

export default {
    name: 'taskEdit',
    components: {
        taskForm,
        taskOptions
    },
    data() {
        return {
            editTask: {},
            deletePromptOverlay: false
        }
    },
    computed: {
        selectedTask () {
            let task = this.$store.getters.getSelectedTask;
            if (task)
                return task;
            return { 'notFound': true };
        },
    },
    methods: {
        ...mapActions(['updateTask', 'deleteTask']),
        resetEditTask () {
            this.editTask = {...this.selectedTask};
            if (this.selectedTask.tags) {
                this.editTask.tags = this.selectedTask.tags.slice();
            }
        },
        async onUpdateTask () {
            await this.updateTask(this.editTask);
            this.resetEditTask();
        }
    },
    watch: {
        selectedTask: function() {
            this.resetEditTask();
        }
    },
    created: function () {
        this.$store.commit('set_selected_task_uuid', this.$route.params.uuid)
        this.resetEditTask();
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.commit('set_selected_task_uuid', to.params.uuid);
        next();
    },
}
</script>
