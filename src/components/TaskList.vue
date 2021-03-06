<template>
    <v-container
        id="task-container"
        class="pa-0"
        >
        <v-data-iterator
        id="task-data-iterator"
        :items="tasks"
        :search="search"
        :custom-filter="customFilter"
        :sort-by="sortBy"
        :custom-sort="customSort"
        sortDesc
        loading
        disable-pagination
        hide-default-footer>
            <template v-slot:header>
                <task-list-header :search.sync="search" :sortBy.sync="sortBy" :showHidden.sync="showHidden"/>
            </template>

            <template v-slot:default="props">
                <v-list three-line class="pa-0">
                    <v-list-item-group active-class="green lighten-5" v-model="selectedTaskUUID" @change="onSelectionChange($event)">
                        <template v-for="(task, index) in props.items">
                            <task-item :task="task" :key="task.uuid" @update:search="search = $event"/>
                            <v-divider :key="index"></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </template>
        </v-data-iterator>
    </v-container>
</template>

<script>
import taskItem from '@/components/TaskItem.vue';
import taskListHeader from '@/components/TaskListHeader.vue';

export default {
    name: 'taskList',
    components: {
        taskItem,
        taskListHeader
    },
    props: {
        tasks: Array,
        type: String
    },
    computed: {
        selectedTaskUUID: {
            get: function () {
                return this.$store.getters.getSelectedTaskUUID;
            },
            set: function(newUUID) {
                this.$store.commit('set_selected_task_uuid', newUUID);
            }
        },
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        onSelectionChange(newUUID) {
            this.selectedTaskUUID = newUUID;
            if (this.selectedTaskUUID) {
                let uuid = this.selectedTaskUUID;
                if (this.recurPage) this.$router.push({ name: 'TaskRecurInfo', params: { uuid } })
                else this.$router.push({ name: 'TaskInfo', params: { uuid } })
            } else {
                if (this.recurPage) this.$router.push({ name: 'TaskRecurNoneSelected' })
                else this.$router.push({ name: 'TaskNoneSelected' })
            }
        },
        customSort(items, sortBy) {
            switch(sortBy[0]) {
                case 'alpha':
                    return items.sort(
                        (a,b) => a.description.localeCompare(b.description)
                    );
                case 'urgency':
                    return items.sort(this.compareProject).sort(this.compareUrgency);
                case 'project':
                    return items.sort(this.compareProject);
                default:
                    return items
            }
        },
        customFilter(items, search) {
            items = items.filter(
                item => {
                    return !(
                        (!(this.showHidden))
                        && (item.status !== 'pending')
                        && (!this.recurPage)
                    )
                }
            );

            let searchList = search == null ? [] : search.toString().split(' ');
            searchList.forEach(searchItem => {
                if (searchItem.startsWith('+')) {
                    items = items.filter(
                        item => {
                            return (
                                ('tags' in item)
                                && (item.tags.includes(searchItem.slice(1)))
                            )
                        }
                    );
                } else if (
                    (searchItem.startsWith('project:'))
                    || (searchItem.startsWith('p:'))
                ) {
                    items = items.filter(
                        item => {
                            return (
                                ('project' in item)
                                && (item.project === searchItem.split(':')[1])
                            )
                        }
                    );
                } else if (/^\/.*\/$/.test(searchItem)) {
                    console.log(searchItem.slice(0,-1));
                    items = items.filter(
                        item => {
                            return (item.description.indexOf(searchItem.slice(1,-1))>0);
                        }
                    );
                }
            });
            return items;
        },
        compareUrgency: function(a, b) {
            return parseFloat(b.urgency) - parseFloat(a.urgency);
        },
        compareProject: function(a, b) {
            if (!('project' in a))
                return 1;
            else if (!('project' in b))
                return -1;
            else if (a.project > b.project)
                return -1;
            else if (a.project < b.project)
                return 1;
            return 0;
        }
    },
    data() {
        return {
            showHidden: false,
            sortBy: 'urgency',
            search: '',
        }
    }
}
</script>

<style scoped>
#task-container {
    height: 100%;
}
#task-data-iterator {
    display: flex;
    flex-flow: column;
    height: 100%;
    overflow: show;
}

.v-data-iterator > header {
    flex: 0 0 auto;
}

.v-data-iterator > div {
    display: flex;
    flex: 1 1 auto;
    overflow-y: scroll;
}

.v-data-iterator > div > div {
    width: 100%;
}
</style>
