<template>
    <v-container>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <h1>Add task...</h1>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col align-self="center" cols="2">
                        <v-btn icon @click="resetNewTask"><v-icon>mdi-refresh</v-icon></v-btn>
                    </v-col>
                </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field required clearable v-model="newTask.description" label="Desc: "></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field clearable v-model="newTask.project" label="Project: "></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                               label="priority"
                               clearable
                               v-model="newTask.priority"
                               :items="priorities"
                               >
                            </v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="newTask.status" mandatory :items="status"></v-select>
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
                            <div id="task-chip-container" v-if="newTask.tags">
                                <v-chip
                                      v-for="(tag, index) in newTask.tags"
                                      small
                                      depressed
                                      close
                                      style="margin: 0 5px 5px 0"
                                      color="primary"
                                      :key="index"
                                      @click:close="newTask.tags = newTask.tags.filter(value => (value != tag))"
                                      class="text-none">
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Due" :dateTimeString.sync="newTask.due"/>
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
                            <date-time-menu title="Hide until" :dateTimeString.sync="newTask.until"/>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Entered" :dateTimeString.sync="newTask.enter"/>
                        </v-col>
                        <v-col cols="12">
                            <date-time-menu title="Start" :dateTimeString.sync="newTask.start"/>
                        </v-col>
                    </v-row>
                        </v-expand-transition>
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
import dateTimeMenu from '@/components/DateTimeMenu.vue';

export default {
    name: 'taskAdd',
    components: {
        dateTimeMenu,
    },
    data() {
        return {
            priorities: ['H', 'M', 'L'],
            status: ['pending', 'completed'],
            newTask: {},
            tagField: undefined,
            showExtra: false
        }
    },
    methods: {
        ...mapActions(["addTask"]),
        onAddTask () {
            this.addTask(this.newTask);
            this.resetNewTask();
        },
        appendTag () {
            let tag = this.tagField.trim();
            console.log('append ' + tag);
            if (!(this.newTask.tags)) {
                this.newTask.tags = [tag]
            } else if (!(this.newTask.tags.includes(tag))) {
                this.newTask.tags.push(tag);
            }
            this.tagField = undefined;
        },
        resetNewTask () {
            this.newTask = {};
        },
        onChangeTag (event) {
            console.log('change');
            console.log(event);
        },
        onInputTag (event) {
            console.log('input');
            console.log(event);
            this.tagField = event.replace('j','');
        }
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
