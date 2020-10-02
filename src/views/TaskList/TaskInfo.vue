<template>
    <v-container>
        <v-card light>
            <v-container>
                <v-row :no-gutters="!this.$vuetify.breakpoint.mobile">
                    <v-col align-self="center" cols="12">
                        <v-btn class="float-right mr-4" icon @click="editSelectedTask"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                    </v-col>
                    <v-col>
                        <span class="text-h3" v-if="!selectedTask.uuid">Task Not Found</span>
                        <span class="text-h3" v-else>
                            Task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }} Info
                        </span>
                    </v-col>
                </v-row>
                <template v-if="selectedTask.uuid">
                    <v-row>
                        <v-col cols="12">
                            <span class="text-h4">{{ selectedTask.description }}</span>
                        </v-col>
                        <v-col cols="12" v-if="selectedTask.project">
                            <span class="text-h6">Project: </span><v-chip large label outlined color="primary">{{ selectedTask.project }} </v-chip>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <span class="text-h6">Status: </span><span class="text-h6 font-weight-light">{{ selectedTask.status }} </span>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <span class="text-h6">Urgency: </span><span class="text-h6 font-weight-light">{{ selectedTask.urgency.toFixed(2) }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="selectedTask.due">
                            <span class="text-h6">Due: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.due) }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="selectedTask.scheduled">
                            <span class="text-h6">Scheduled: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.until) }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="selectedTask.until">
                            <span class="text-h6">Keep until: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.until) }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="selectedTask.recur">
                            <span class="text-h6">Recur every: </span><span class="text-h6 font-weight-light">{{ selectedTask.recur }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="selectedTask.parent">
                            <span class="text-h6">Parent task: </span><span class="text-h6 font-weight-light">{{ selectedTask.parent.id }}</span>
                        </v-col>
                    </v-row>
                    <v-row v-if="selectedTask.tags">
                        <v-col cols="12" sm="2">
                            <h3>Tags: </h3>
                        </v-col>
                        <v-col>
                            <div id="task-chip-container">
                                <v-chip
                                 v-for="(tag, index) in selectedTask.tags"
                                 depressed
                                 style="margin: 0 5px 5px 0"
                                 color="accent"
                                 :key="index"
                                 class="text-none">
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                class="float-right mr-4"
                                icon
                                @click="showExtra = !showExtra"
                            >
                                <v-icon>{{ showExtra ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-col>

                    </v-row>
                    <v-expand-transition>
                    <v-row v-show="showExtra">
                        <v-col cols="12" sm="6">
                            <span class="text-h6">Entry: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.entry) }}</span>
                        </v-col>
                        <v-col v-if="selectedTask.end" cols="12" sm="6">
                            <span class="text-h6">End: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.end) }}</span>
                        </v-col>
                        <v-col cols="12">
                            <h3>Annotations: </h3>
                            <v-simple-table>
                                <template v-slot:default>
                                    <colgroup>
                                        <col span="1" style="width: 15%;">
                                        <col span="1" style="width: 80%;">
                                        <col span="1" style="width: 5%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Entry</th>
                                            <th class="text-left">Descripition</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(annotation, index) in selectedTask.annotations" :key="index">
                                                <td>
                                                    {{ formatDateTimeString(annotation.entry) }}
                                                </td>
                                                <td>{{ annotation.description }}</td>
                                                <td>
                                                    <v-btn
                                                        icon
                                                        @click="onRemoveAnnotation(annotation)"
                                                        >
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                </td>
                                                <td class="pa-0">
                                                <v-text-field
                                                clearable
                                                                dense
                                                class="pa-0 rounded-0"
                                                v-model="annotationTextBox"
                                                placeholder="Add annotation..."
                                                @keydown.enter="onAddAnnotation"
                                                >
                                                </v-text-field>
                                                        </td>
                                                    <td>
                                                <v-btn
                                                    icon
                                                    @click="onAddAnnotation"
                                                    :disabled="annotationTextBox === ''">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                </td>
                                            </tr>
                                                <v-divider dark ></v-divider>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                        <v-col cols="12">
                            <h3>Depends on: </h3>
                            <v-simple-table>
                                <template v-slot:default>
                                    <colgroup>
                                        <col span="1" style="width: 15%;">
                                        <col span="1" style="width: 80%;">
                                        <col span="1" style="width: 5%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="text-left">ID</th>
                                            <th class="text-left">Descripition</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(dependency, index) in selectedTask.depends" :key="index">
                                                <td>
                                                    {{ dependency.id }}
                                                </td>
                                                <td>{{ dependency.description }}</td>
                                                <td>
                                                    <v-btn
                                                        icon
                                                        @click="onRemoveDepends(dependency)"
                                                        >
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                </td>
                                                <td class="pa-0">
                                                <v-select
                                                    :items="tasks"
                                                                dense
                                                class="pa-0 rounded-0"
                                                v-model="selectedDependency"
                                                placeholder="Add dependency..."
                                                >
                                                <template slot="selection" slot-scope="data">
                                                    <span style="white-space:nowrap" class="pl-2">{{ data.item.description }}</span>
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    {{ data.item.id }} - {{ data.item.description }}
                                                </template>
                                                </v-select>
                                                        </td>
                                                    <td>
                                                <v-btn
                                                    icon
                                                    @click="onAddDepends"
                                                    @keydown.enter="onAddDepends"
                                                    :disabled="!selectedDependency">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                </td>
                                            </tr>
                                                <v-divider dark ></v-divider>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    </v-expand-transition>
                    <v-row>
                        <v-col cols="12" sm="6" class="align-self-center" v-if="selectedTask.start">
                            <span class="text-h6">Started: </span><span class="text-h6 font-weight-light">{{ formatDateTimeString(selectedTask.start) }}</span>
                        </v-col>
                        <v-col cols="12">
                            <task-options
                               :disabled="!!selectedTask.notFound"
                               :completed="selectedTask.status === 'completed'"
                               :started="!!selectedTask.start"
                               :id="selectedTask.id"
                               :uuid="selectedTask.uuid"
                               >
                            </task-options>
                        </v-col>
                    </v-row>

                </template>
            </v-container>
        </v-card>
    </v-container>
</template>


<script>
import taskOptions from '@/components/TaskOptions.vue';
import { mapActions } from "vuex"

export default {
    name: 'taskInfo',
    components: {
        taskOptions
    },
    data () {
        return {
            annotationTextBox: '',
            showExtra: false,
            selectedDependency: null,
        }
    },
    computed: {
        tasks () {
            return this.$store.getters.getTasks.filter((task) => ((task.status === 'pending')));
        },
        selectedTask () {
            let task = this.$store.getters.getSelectedTask;
            if (task)
                return task;
            return { 'notFound': true };
        },
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        ...mapActions([]),
        editSelectedTask () {
            if (this.selectedTask.uuid) {
                let uuid = this.selectedTask.uuid;
                if (this.recurPage) this.$router.push({ name: 'TaskRecurEdit', params: { uuid } })
                else this.$router.push({ name: 'TaskEdit', params: { uuid } })
            }
        },
        async onAddDepends () {
            let taskUUID = this.selectedTask.uuid;
            let dependency = {
                uuid: this.selectedDependency.uuid
            };
            await this.addDependency({taskUUID, dependency})
        },
        async onRemoveDepends (dependency) {
            let taskUUID = this.selectedTask.uuid;
            await this.removeDependency({taskUUID, dependency})
        },
        async onAddAnnotation () {
            let taskUUID = this.selectedTask.uuid;
            let annotation = {
                description: this.annotationTextBox
            };
            await this.addAnnotation({taskUUID, annotation})
            this.annotationTextBox = '';
        },
        async onRemoveAnnotation (annotation) {
            let taskUUID = this.selectedTask.uuid;
            await this.removeAnnotation({taskUUID, annotation})
        },
        formatDateTimeString (dateTimeString) {
            let date = new Date(dateTimeString);
            if (Math.abs(date - Date.now()) > (24*60*60*1000)) {
                return this.toDate(date);
            } else {
                return this.toTime(date);
            }
        },
        toDate (date) {
            let pad = (val) => (val < 10 ? '0' + val : val)
            return date.getFullYear() +
                '-' + pad(date.getMonth() + 1) +
                '-' + pad(date.getDate());
        },
        toTime (date) {
            return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
        },
        ...mapActions([
            'addAnnotation',
            'removeAnnotation',
            'addDependency',
            'removeDependency'
        ])
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

