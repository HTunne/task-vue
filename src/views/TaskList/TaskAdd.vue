<template>
    <v-container>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <span class="text-h3">Add task...</span>
                    </v-col>
                     <v-col align-self="center" cols="1">
                        <v-btn class="float-right mr-8" icon @click="resetNewTask"><v-icon>mdi-refresh</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <task-form :task.sync="newTask"/>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card-actions>
                            <v-btn @click="onAddTask">Add task</v-btn>
                            <v-btn :to="{ name: 'TaskNoneSelected' }">Cancel</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import taskForm from '@/components/TaskForm.vue';

export default {
    name: 'taskAdd',
    components: {
        taskForm,
    },
    data() {
        return {
            newTask: {},
        }
    },
    methods: {
        ...mapActions(["addTask"]),
        onAddTask () {
            this.addTask(this.newTask);
            this.resetNewTask();
        },
        resetNewTask () {
            this.newTask = {};
        },
    },
    created: function () {
        this.$store.commit('set_selected_task_uuid', undefined)
        this.resetNewTask();
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
