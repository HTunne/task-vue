<template>
    <v-list-item :value="task.uuid" three-line>
                    <v-list-item-avatar size="56" :color="idAvatarColor">{{ task.id }}</v-list-item-avatar>
        <v-window v-model="windowIndex" style="width: 100%">
            <v-window-item :value="0">
                <div class="window-container">
                    <v-list-item-content>
                        <v-list-item-subtitle v-text="task.description">
                        </v-list-item-subtitle>
                        <v-btn depressed small outlined left color="primary" v-if="'project' in task" v-text="task.project" class="project-btn text-none font-weight-bold" @click.stop="$emit('update:search', 'p:' + task.project)">
                        </v-btn>
                        <v-item-group v-if="'tags' in task">
                            <v-btn
                                      v-for="tag in task.tags"
                                      rounded
                                      x-small
                                      depressed
                                      style="margin: 5px 5px 5px 0"
                                      color="primary"
                                      :key="tag"
                                      @click.stop="$emit('update:search', '+' + tag)"
                                      class="text-none">
                                {{ tag }}
                            </v-btn>
                        </v-item-group>
                    </v-list-item-content>
                    <v-list-item-avatar size="56" v-text="task.urgency.toFixed(2)" :style="{ color: urgencyColor }"></v-list-item-avatar>
                    <v-list-item-action>
                        <v-btn fab depressed :disabled="task.status === 'completed'" @click.stop="windowIndex = 1"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    </v-list-item-action>
                </div>
            </v-window-item>
            <v-window-item :value="1">
                <div class="window-container">
                    <v-spacer></v-spacer>
                    <v-list-item-action style="flex-direction: row">
                        <v-btn
                            :disabled="task.status === 'completed'"
                            @click.stop="windowIndex = 2"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0"
                            color="error">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                        <v-btn
                            :disabled="task.status === 'completed'"
                            @click.stop="stopTask(task.uuid)"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0"
                            color="warning"
                            v-if="task.start">
                            <v-icon> mdi-stop</v-icon>
                        </v-btn>
                        <v-btn
                            :disabled="task.status === 'completed'"
                            @click.stop="startTask(task.uuid)"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0"
                            color="info"
                            v-else>
                            <v-icon>mdi-play</v-icon>
                        </v-btn>
                        <v-btn
                            :disabled="task.status === 'completed'"
                            @click.stop="doneTask(task.uuid)"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0"
                            color="success">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                        <v-btn
                            @click.stop="windowIndex = 0"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-list-item-action>

                </div>
            </v-window-item>
            <v-window-item :value="2">
                <div class="window-container">
                    <v-list-item-action>
                        <v-btn
                            depressed
                            color="warning"
                            @click.stop="windowIndex = 0"
                            >
                            Cancel
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-btn
                            depressed
                            color="error"
                            @click.stop="deleteTask(editTask.uuid)"
                            >
                            Delete
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-btn
                            @click.stop="windowIndex = 0"
                            fab
                            depressed
                            style="margin: 0 5px 5px 0">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </div>
            </v-window-item>
        </v-window>
    </v-list-item>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: 'taskItem',
    props: {
        task: Object
    },
    computed: {
        idAvatarColor() {
            if (this.task.status == 'completed') {
                return "error";
            } else if (this.task.start) {
                return "success";
            } else {
                return "grey";
            }
        },
        urgencyColor() {
            let val = 1 - (this.task.urgency/this.$store.getters.getUrgencyScaleMax)
            val = Math.min(val * (val > 0) * 120, 120)

            return 'hsl(' + val + ',80%,50%)'
        },
        divheight() {
            return this.$refs.taskdiv.clientHeight;
        }
    },
    methods: mapActions(['doneTask']),
    data () {
        return {
            windowIndex: 0,
        }
    },

}
</script>

<style scoped>
#promptdiv {
}

.project-btn {
    flex: 0 1 auto;
}

.window-container {
    flex-direction: row;
    display: flex;
    align-items: center;
}

.window-container > div {
    align-self: center !important;
}
</style>
