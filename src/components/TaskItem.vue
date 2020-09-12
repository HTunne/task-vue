<template>
    <v-list-item :value="task.uuid" three-line disable>
        <v-window v-model="showDonePrompt" style="width: 100%">
            <v-window-item :value="0">
                <div style="{ flex-direction: row; display: flex; align-items: center;}" ref="taskdiv">
                    <v-list-item-avatar :color="idAvatarColor">{{ task.id }}</v-list-item-avatar>
                    <v-list-item-content>
                        <v-btn depressed small outlined left color="primary" v-if="'project' in task" v-text="task.project" class="project-btn text-none font-weight-bold" @click.stop="$emit('update:search', 'p:' + task.project)">
                        </v-btn>
                        <v-list-item-title v-text="task.description">
                        </v-list-item-title>
                        <v-item-group v-if="'tags' in task">
                            <v-btn
                                      v-for="tag in task.tags"
                                      rounded
                                      x-small
                                      depressed
                                      style="margin: 0 5px 5px 0"
                                      color="primary"
                                      :key="tag"
                                      @click.stop="$emit('update:search', '+' + tag)"
                                      class="text-none">
                                {{ tag }}
                            </v-btn>
                        </v-item-group>
                    </v-list-item-content>
                    <v-list-item-avatar class="urgency-avatar" v-text="task.urgency"></v-list-item-avatar>
                    <v-list-item-action>
                        <v-btn fab depressed :disabled="task.status === 'completed'" @click.stop="showDonePrompt = 1"><v-icon>mdi-check</v-icon></v-btn>
                    </v-list-item-action>
                </div>
            </v-window-item>
            <v-window-item :value="1">
                <div>

                    <v-list-item-content>
                        <v-list-item-title>
                            Confirm Task {{ task.id }} Done?
                        </v-list-item-title>
                        <v-item-group>
                            <v-btn
                                small
                                depressed
                                color="success"
                                style="margin: 0 5px 5px 0"
                                @click.stop="showDonePrompt = 0">
                                Confirm
                            </v-btn>
                                <v-btn
                                    small
                                    depressed
                                    color="error"
                                    style="margin: 0 5px 5px 0"
                                    @click.stop="showDonePrompt = 0">
                                    Cancel
                                </v-btn>
                        </v-item-group>
                    </v-list-item-content>
                </div>
            </v-window-item>
        </v-window>
    </v-list-item>
</template>

<script>
export default {
    name: 'taskItem',
    props: {
        task: Object
    },
    methods: {
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
        divheight() {
            return this.$refs.taskdiv.clientHeight;
        }
    },
    data () {
        return {
            showDonePrompt: 0,
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

.urgency-avatar {
    color: red !important;
}
</style>
