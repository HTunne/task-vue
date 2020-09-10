<template>
<v-container>
  <v-card>
    <v-container>
        <v-row>
          <v-col>
          <h1>Edit Task {{ selectedTask.id }}</h1>
          </v-col>
          <v-spacer></v-spacer>
          <v-col align-self="center" cols="2">
          <v-btn icon @click="refreshEditTask"><v-icon>mdi-refresh</v-icon></v-btn>
          </v-col>
        </v-row>
          <v-form>
        <v-row>
          <v-col cols="12">
          <v-text-field v-model="editTask.description" label="Desc: "></v-text-field>
          </v-col>
          <v-col cols="12">
          <v-text-field v-model="editTask.project" label="Project: "></v-text-field>
          </v-col>
          <v-col cols="5">
          <v-select
            :items="priorities"
          >
          </v-select>
          </v-col>
          <v-col cols="7">
          <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
      </v-menu>
          </v-col>
          <v-col cols="12">
        <v-card-actions>
          <v-btn>Update details</v-btn>
          <v-btn :to="{ name: 'TaskNoneSelected' }">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn fab color="warning" v-if="selectedTask.start">
            <v-icon> mdi-stop</v-icon>
          </v-btn>
          <v-btn fab color="info" v-else>
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn fab color="error">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-btn fab color="success">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
          </v-col>
        </v-row>
          </v-form>
    </v-container>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: 'taskEdit',
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      priorities: ['H', 'M', 'L'],
      editTask: {},
    }
  },
  computed: {

    selectedTask () {
      return this.$store.getters.getSelectedTask
    }
  },
  methods: {
    refreshEditTask () {
      this.editTask = {...this.selectedTask};
    }
  },
  watch: {
    selectedTask: function(newTask) {
      this.editTask = {...newTask};
    }
  },
  created: function () {
      this.$store.commit('set_selected_task_uuid', this.$route.params.uuid)
      this.editTask = {...this.selectedTask};
  },
  beforeRouteUpdate (to, from, next) {
      this.$store.commit('set_selected_task_uuid', to.params.uuid);
      next();
  }
}
</script>
