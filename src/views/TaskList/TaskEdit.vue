<template>
    <v-container>
        <v-card>
            <v-container>
                <v-form :disabled="editTask.notFound">
                <v-row>
                    <v-col>
                        <h1 v-if="editTask.notFound">Task Not Found</h1>
                        <h1 v-else>
                            Edit Task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }}
                        </h1>
                    </v-col>
                    <v-col align-self="center" cols="2">
                        <v-btn icon @click="resetEditTask"><v-icon>mdi-refresh</v-icon></v-btn>
                    </v-col>
                </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field required clearable v-model="editTask.description" label="Desc: "></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field clearable v-model="editTask.project" label="Project: "></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                               label="priority"
                               clearable
                               v-model="editTask.priority"
                               :items="priorities"
                               >
                            </v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="editTask.status" mandatory :items="status"></v-select>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field
                               clearable
                               v-model="tagField"
                               label="Add tags..."
                               append-outer-icon="mdi-plus"
                               @click:append-outer="appendTag"
                               @keydown.enter="appendTag"
                               >
                            </v-text-field>
                        </v-col>
                        <v-col cols="7">
                            <div id="task-chip-container" v-if="editTask.tags">
                                <v-chip
                                      v-for="(tag, index) in editTask.tags"
                                      small
                                      depressed
                                      close
                                      style="margin: 0 5px 5px 0"
                                      color="primary"
                                      :key="index"
                                      @click:close="editTask.tags = editTask.tags.filter(value => (value != tag))"
                                      class="text-none">
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Due" :dateTimeString.sync="editTask.due"/>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-btn
                                icon
                                @click="showExtra = !showExtra"
                            >
                                <v-icon>{{ showExtra ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                        <v-expand-transition>
                    <v-row v-show="showExtra">
                        <v-col cols="12">
                            <date-time-menu title="Hide until" :dateTimeString.sync="editTask.until"/>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Start" :dateTimeString.sync="editTask.start"/>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Entered" :dateTimeString.sync="editTask.entry"/>
                        </v-col>
                    </v-row>
                        </v-expand-transition>
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
                                    :to="{ name: 'TaskNoneSelected' }">
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
                </v-form>
            </v-container>
       </v-card>
                                 <v-overlay
                                    :value="deletePromptOverlay"
                                    >
                                    <v-card light>
                                        <v-card-title v-if="!editTask.notFound">
                                            Delete task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }}
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn
                                                color="warning"
                                                @click="deletePromptOverlay = false"
                                            >
                                            Cancel
                                            </v-btn>
                                            <v-btn
                                                color="error"
                                                @click="deleteTask(editTask.uuid)"
                                            >
                                            Delete
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-overlay>
    </v-container>

</template>

<script>
import { mapActions } from "vuex";
import dateTimeMenu from '@/components/DateTimeMenu.vue';

export default {
    name: 'taskEdit',
    components: {
        dateTimeMenu,
    },
    data() {
        return {
            priorities: ['H', 'M', 'L'],
            status: ['pending', 'completed'],
            editTask: {},
            tagField: undefined,
            showExtra: false,
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
        appendTag () {
            if (this.tagField) {
                let tag = this.tagField.trim();
                console.log('append ' + tag);
                if (!(this.editTask.tags)) {
                    this.editTask.tags = [tag]
                } else if (!(this.editTask.tags.includes(tag))) {
                    this.editTask.tags.push(tag);
                }
                this.tagField = undefined;
            }
        },
        resetEditTask () {
            this.editTask = {...this.selectedTask};
            if (this.selectedTask.tags) {
                this.editTask.tags = this.selectedTask.tags.slice();
            }
        },
        onUpdateTask () {
            this.updateTask(this.editTask);
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
