<template>
    <v-container>
        <v-card>
            <v-container v-if="loading">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-progress-circular indeterminate>
                    </v-progress-circular>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
            <v-container v-else>
                <v-row>
                    <v-col>
                        <h1 v-if="!selectedTask.uuid">Task Not Found</h1>
                        <h1 v-else>
                            Task {{ selectedTask.id > 0 ? selectedTask.id : selectedTask.uuid.slice(0,8) }} Info
                        </h1>
                    </v-col>
                    <v-col align-self="center" cols="1">
                        <v-btn class="float-right pr-8" icon @click="editSelectedTask"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                    </v-col>
                </v-row>
                <template v-if="selectedTask.uuid">
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
                    <v-row>
                        <v-col>
                            <h3>Annotations: </h3>
                            <v-simple-table height="300px">
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
                                                    hkl
                                                </td>
                                                <td class="pa-0">
                                                <v-text-field
                                                clearable
                                                                dense
                                                class="pa-0 rounded-0"
                                                v-model="annotationTextBox"
                                                placeholder="Add annotation..."
                                                >
                                                </v-text-field>
                                                        </td>
                                                    <td>
                                                <v-btn
                                                    icon
                                                    @click="onAddAnnotation"
                                                    @keydown.enter="onAddAnnotation"
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
                    </v-row>
                </template>
            </v-container>
        </v-card>
    </v-container>
</template>


<script>
import { mapActions } from "vuex"

export default {
    name: 'taskInfo',
    data () {
        return {
            annotationTextBox: '',
            loading: false
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
        editSelectedTask () {
            if (this.selectedTask.uuid) {
                let uuid = this.selectedTask.uuid;
                this.$router.push({ name: 'TaskEdit', params: { uuid } })
            }
        },
        async onAddAnnotation () {
            this.loading =  true;
            let taskUUID = this.selectedTask.uuid;
            let annotation = {
                description: this.annotationTextBox
            };
            await this.addAnnotation({taskUUID, annotation})
            this.loading = false;
        },
        async onRemoveAnnotation (annotation) {
            this.loading =  true;
            let taskUUID = this.selectedTask.uuid;
            await this.removeAnnotation({taskUUID, annotation})
            this.loading = false;
        },
        formatDateTimeString (dateTimeString) {
            let yesterday = new Date(Date.now() - (24*60*60*1000));
            let date = new Date(dateTimeString);
            if (date < yesterday) {
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
        ...mapActions(
            ['addAnnotation','removeAnnotation','addDependency','removeDependency']
        )
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

