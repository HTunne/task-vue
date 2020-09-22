<template>
    <v-container>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <span class="text-h3" v-if="!editTask.uuid">Task Not Found</span>
                        <span class="text-h3" v-else>
                            Edit Task {{ editTask.id > 0 ? editTask.id : editTask.uuid.slice(0,8) }}
                        </span>
                    </v-col>
                    <v-col align-self="center" cols="1">
                        <v-btn class="float-right mr-8" icon @click="resetEditTask"><v-icon>mdi-refresh</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <task-form :task.sync="editTask"/>
            <v-container>
                <v-row>
                    <v-col cols="12">
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
                            <v-spacer></v-spacer>
                            <v-btn
                                :disabled="editTask.notFound"
                                @click="deletePromptOverlay = true"
                               fab
                               color="error">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                            <v-btn
                                :disabled="editTask.notFound"
                                @click="stopTask(editTask.uuid)"
                                fab
                                color="warning"
                                v-if="selectedTask.start">
                                <v-icon> mdi-stop</v-icon>
                            </v-btn>
                            <v-btn
                                :disabled="editTask.notFound"
                                @click="startTask(editTask.uuid)"
                                fab
                                color="info"
                                v-else>
                                <v-icon>mdi-play</v-icon>
                            </v-btn>
                            <v-btn
                                :disabled="editTask.notFound"
                                @click="doneTask(editTask.uuid)"
                                fab
                                color="success">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-overlay
            :value="deletePromptOverlay"
            v-if="selectedTask.uuid">
            <v-card light>
                <v-card-title v-if="!editTask.notFound">
                    Delete task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }}
                </v-card-title>
                <v-card-actions>
                    <v-btn
                              color="warning"
                              @click="deletePromptOverlay = false">
                        Cancel
                    </v-btn>
                    <v-btn
                              color="error"
                              @click="deleteTask(editTask.uuid)">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import taskForm from '@/components/TaskForm.vue';

export default {
    name: 'taskEdit',
    components: {
        taskForm
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
        ...mapActions(['updateTask', 'deleteTask', 'doneTask', 'startTask', 'stopTask']),
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

<style scoped>
#task-chip-container {
    display: flex;
    align-items: center;
    height: 100%;
    flex-wrap: wrap;
}

#task-chip-container > span {
    flex: 0 0 auto;
}
</style>
