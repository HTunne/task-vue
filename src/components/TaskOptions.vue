<template>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :disabled="disabled"
            @click="deletePromptOverlay = true"
            fab
            color="error">
            <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <template v-if="!recur">
            <template v-if="!completed">
                <v-btn
                      :disabled="disabled"
                      @click="stopTask(uuid)"
                      fab
                      color="warning"
                      v-if="started">
                    <v-icon> mdi-stop</v-icon>
                </v-btn>
                <v-btn
                      :disabled="disabled"
                      @click="startTask(uuid)"
                      fab
                      color="info"
                      v-else>
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn
                      v-if="!completed"
                      :disabled="disabled"
                      @click="doneTask(uuid)"
                      fab
                      color="success">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </template>
            <v-btn
                      v-else
                      :disabled="disabled"
                      @click="restoreTask(uuid)"
                      fab
                      color="warning">
                <v-icon>mdi-undo-variant</v-icon>
            </v-btn>
        </template>
        <v-overlay
            :value="deletePromptOverlay">
            <v-card light>
                <v-card-title>
                    Delete task {{ id > 0 ? id : uuidDisplay}}
                </v-card-title>
                <v-card-actions>
                    <v-btn
                              color="warning"
                              @click="deletePromptOverlay = false">
                        Cancel
                    </v-btn>
                    <v-btn
                              color="error"
                              @click="deleteTask(uuid)">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </v-card-actions>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "taskOptions",
    data() {
        return {
            deletePromptOverlay: false,
            uuidData: this.uuid,
        }
    },
    computed: {
        uuidDisplay() {
            if (this.uuidData) return this.uuidData.slice(0,8)
            else return ''
        }
    },
    methods: {
        ...mapActions(['doneTask', 'startTask', 'stopTask', 'deleteTask', 'restoreTask']),
    },
    props: ['disabled', 'completed', 'recur', 'started', 'id', 'uuid'],
}
</script>
