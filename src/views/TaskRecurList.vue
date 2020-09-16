<template>
  <v-container
    class="home pa-0"
    style="height: 100%"
  >
  <v-row no-gutters
    style="height: 100%"
  >
    <v-col>
      <router-view></router-view>
    </v-col>
    <v-col cols=12 sm=5 lg=4 xl=3
      style="height: 100%"
    >
      <taskList :tasks="tasks" type="recurring"/>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import taskList from '@/components/TaskList.vue';

export default {
    name: 'TaskRecurListView',
    components: {
        taskList,
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks.filter((task) => task.status === 'recurring');
        }
    }
}
</script>
