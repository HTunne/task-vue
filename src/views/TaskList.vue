<template>
  <v-container
    class="home pa-0"
    style="height: 100%"
  >
  <v-row no-gutters
    style="height: 100%"
  >
    <v-col class="main-col">
      <div>
          <v-alert text dismissible :type="alert.type" v-for="alert in alerts" :key="alert.message">
              {{ alert.description }}
          </v-alert>
      </div>
      <router-view></router-view>
    </v-col>
    <v-col cols=12 sm=5 lg=4 xl=3
      style="height: 100%"
    >
      <taskList :tasks="tasks" type="pending"/>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import taskList from '@/components/TaskList.vue';
import { mapActions } from "vuex";

export default {
    name: 'TaskListView',
    components: {
        taskList,
    },
    computed: {
        tasks() {
            if (this.recurPage) {
                return this.$store.getters.getTasks.filter((task) => (task.status === 'recurring'));
            } else {
                return this.$store.getters.getTasks.filter((task) => ((task.status !== 'recurring') && (task.status !== 'deleted')));
            }
        },
        alerts() {
            return this.$store.getters.getAlerts
        },
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        ...mapActions(["fetchTaskList"])
    },
    created() {
        this.fetchTaskList();
    }
}
</script>

<style scoped>
.main-col {
    overflow-y: scroll;
    height: 100%;
}
</style>
