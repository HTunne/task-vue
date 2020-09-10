<template>
  <v-container
    class="task-container pa-0"
  >
    <v-data-iterator
      :items="tasksSorted"
      :search="search"
      :custom-filter="customFilter"
      loading
      disable-pagination
      hide-default-footer>
      <template v-slot:header>
        <v-toolbar  dark color="grey" flat extension-height="57px">
          <template v-slot:extension>
            <v-btn-toggle v-model="sortType" mandatory light>
              <v-btn>
                <v-icon>mdi-sort-alphabetical-ascending</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-exclamation-thick</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-shape-outline</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <v-btn icon @click="showCompleted = !showCompleted">
              <v-icon v-if="showCompleted">mdi-eye-off-outline</v-icon>
              <v-icon v-else>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'TaskAdd'}" @click="selectedTaskUUID=undefined">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <template v-slot:default>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-filter-outline" label="Filter Tasks...">
            </v-text-field>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-list three-line class="pa-0">
          <v-list-item-group active-class="green lighten-5" v-model="selectedTaskUUID" @change="onSelectionChange($event)">
            <template v-for="(task, index) in props.items">
              <v-list-item :key="task.uuid" :value="task.uuid">
                <v-list-item-avatar v-if="task.status === 'completed'" color="error">{{ task.id }}</v-list-item-avatar>
                <v-list-item-avatar v-else-if="task.start" color="success">{{ task.id }}</v-list-item-avatar>
                <v-list-item-avatar v-else color="grey">{{ task.id }}</v-list-item-avatar>
                <v-list-item-content>
                  <v-btn depressed small outlined left color="primary" v-if="'project' in task" v-text="task.project" class="project-btn text-none font-weight-bold" @click.stop="search = 'p:' + task.project">
                  </v-btn>
                  <v-list-item-subtitle v-text="task.description">
                  </v-list-item-subtitle>
                  <v-item-group v-if="'tags' in task">
                    <v-btn
                      v-for="tag in task.tags"
                      rounded
                      x-small
                      depressed
                      style="margin: 0 5px 5px 0"
                      color="primary"
                      :key="tag"
                      @click.stop="search = '+' + tag"
                      class="text-none">
                        {{ tag }}
                    </v-btn>
                  </v-item-group>
                </v-list-item-content>
                <v-list-item-avatar class="urgency-avatar" v-text="task.urgency"></v-list-item-avatar>
                <v-list-item-action>
                  <v-btn fab depressed><v-icon>mdi-check</v-icon></v-btn>
                </v-list-item-action>
              </v-list-item>

          <v-divider v-if="index + 1 < tasksSorted.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    </template>
  </v-data-iterator>
  </v-container>
</template>

<script>
export default {
name: 'taskList',
          components: {
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
  tasksSorted() {
    switch(this.sortType) {
      case 0:
        return this.$store.state.tasks.slice().filter(item => { return !((!(this.showCompleted)) && (item.status === 'completed'))}).sort((a,b) => a.description.localeCompare(b.description));
      case 1:
        return this.$store.state.tasks.slice().sort(this.compareProject).sort(this.compareUrgency);
      default:
        return this.$store.state.tasks.slice().sort(this.compareProject);
    }
  }
},
methods: {
  onSelectionChange(newUUID) {
    this.selectedTaskUUID = newUUID;
    if (this.selectedTaskUUID) {
      let uuid = this.selectedTaskUUID;
      this.$router.push({ name: 'TaskEdit', params: { uuid } })
    } else {
      this.$router.push({ name: 'TaskNoneSelected' })
    }
  },
  customFilter(items, search) {
    let searchList = search == null ? [] : search.toString().split(' ');

    for (let i = 0; i < searchList.length; i++) {
        if (searchList[i].startsWith('+')) {
            items = items.filter(item => {return (('tags' in item) && (item.tags.includes(searchList[i].slice(1))))});
        } else if ((searchList[i].startsWith('project:')) || (searchList[i].startsWith('p:'))) {
            items = items.filter(item => {return (('project' in item) && (item.project === searchList[i].split(':')[1]))});
        }
    }
    return items;
    // return items.filter(item => {return (search === "") || (('tags' in item) && (item.tags.some(tag => tag.includes(search))))});
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
      showCompleted: false,
      sortType: 'project',
      search: '',
    }
  }
}
</script>

<style scoped>
.project-btn {
  flex: 0 1 auto;
}

.task-container {
  height: 100%;
}
.v-data-iterator {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.v-data-iterator > header {
  flex: 0 1 auto;
}

.v-data-iterator > div {
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
}

.v-data-iterator > div > div {
  width: 100%;
}

.urgency-avatar {
  color: black !important;
}
</style>
