<template>
  <v-container
    class="home pa-0"
    style="height: 100%"
  >
  <v-row no-gutters
    style="height: 100%"
  >
    <v-col class="main-col" v-if="!$vuetify.breakpoint.mobile">
      <div>
          <v-alert text dismissible :type="alert.type" v-for="alert in alerts" :key="alert.message">
              {{ alert.description }}
          </v-alert>
      </div>
      <router-view></router-view>
    </v-col>
    <v-col cols=12 sm=5 lg=4 xl=3
      class="main-col"
    >
      <taskList :tasks="tasks" type="pending"/>
    </v-col>
  </v-row>
  <v-overlay v-if="$vuetify.breakpoint.mobile" :value="!noneSelected" >
      <v-container class="main-overlay">
          <v-row no-gutters>
          <v-col cols = 12>
              <v-btn
                   @click="onCloseOverlay"
                   color="accent"
                   small
                   class="float-right"
                   fab>
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-col>
          <v-col>
        <router-view></router-view>
          </v-col>
          </v-row>
      </v-container>
  </v-overlay>
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
        },
        noneSelected() {
            return !!this.$route.meta.noneSelected
        }
    },
    methods: {
        ...mapActions(["fetchTaskList"]),
        onCloseOverlay() {
            this.$store.commit('set_selected_task_uuid', undefined);
            if (this.recurPage) {
                this.$router.push({ name: 'TaskRecurNoneSelected' });
            } else {
                this.$router.push({ name: 'TaskNoneSelected' });
            }
        }
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

.main-overlay {
    overflow-y: scroll;
    height: 100vh;
}
</style>
