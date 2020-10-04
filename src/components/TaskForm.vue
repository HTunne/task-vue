<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field required clearable v-model="task.description" label="Desc: "></v-text-field>
            </v-col>
            <v-col cols="12" v-if="recurPage">
                <v-text-field required clearable v-model="task.recur" label="Recur every: "></v-text-field>
            </v-col>
            <v-col cols="12">
                <date-time-menu title="Due" :dateTimeString.sync="task.due"/>
            </v-col>
            <v-col cols="7">
                <v-text-field clearable v-model="task.project" label="Project: "></v-text-field>
            </v-col>
            <v-col cols="5">
                <v-select
                   label="priority"
                   clearable
                   v-model="task.priority"
                   :items="priorities"
                   >
                </v-select>
            </v-col>
            <v-col cols="12" sm="5">
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
            <v-col cols="11" sm="6">
                <div id="task-chip-container">
                    <v-chip
                                              v-for="(tag, index) in tagList"
                                              small
                                              depressed
                                              close
                                              style="margin: 0 5px 5px 0"
                                              color="accent"
                                              :key="index"
                                              @click:close="removeTag(tag)"
                                              class="text-none">
                                              {{ tag }}
                    </v-chip>
                </div>
            </v-col>
            <v-col cols="1" align-self="end">
                <v-btn
                   class="float-right"
                   icon
                   @click="showExtra = !showExtra">
                   <v-icon :class="{ rotated: showExtra }">mdi-chevron-down</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-expand-transition>
            <v-row v-show="showExtra">
                <v-col cols="12">
                    <date-time-menu title="Hide until" :dateTimeString.sync="task.until"/>
                </v-col>
                <v-col cols="12">
                    <date-time-menu title="Scheduled" :dateTimeString.sync="task.scheduled"/>
                </v-col>
                <v-col cols="12">
                    <date-time-menu title="Start" :dateTimeString.sync="task.start"/>
                </v-col>
            </v-row>
        </v-expand-transition>
    </v-container>
</template>


<script>
import dateTimeMenu from '@/components/DateTimeMenu.vue';

export default {
    name: 'taskForm',
    props: ['task'],
    components: {
        dateTimeMenu,
    },
    data () {
        return {
            priorities: ['H', 'M', 'L'],
            tagField: undefined,
            showExtra: false,
            tagList: []
        }
    },
    computed: {
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        appendTag () {
            let tag = this.tagField.trim().replace(/\s+/g, "-");
            console.log('append ' + tag);
            this.tagList.push(tag);
            this.tagField = undefined;
        },
        removeTag(tag) {
            console.log(tag)
            this.tagList = this.tagList.filter(item => item !== tag)
        }

    },
    watch: {
        tagList: function() {
            this.task.tags = this.tagList;
        }
    }
}
</script>

<style>
#task-chip-container {
    display: flex;
    align-items: center;
    height: 100%;
    flex-wrap: wrap;
}

#task-chip-container > span {
    flex: 0 0 auto;
}

.rotated {
    transform: rotate(180deg);
}
</style>
