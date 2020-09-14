import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      selectedTaskUUID: undefined,
      loadingTasks: true,
      taskFormView: undefined,
      urgencyScaleMax: 5,
      tasks: []
  },
  getters: {
      getTasks: state => state.tasks.slice(),
      getSelectedTaskUUID: state => state.selectedTaskUUID,
      getLoadingTasks: state => state.loadingTasks,
      getUrgencyScaleMax: state => state.urgencyScaleMax,
      getSelectedTask: state => {
          if (state.selectedTaskUUID) {
              return state.tasks.find(element => element.uuid === state.selectedTaskUUID);
          } else {
              return {};
          }
      }
  },
  mutations: {
      set_tasks(state, tasks) {
          state.tasks = tasks;
      },
      set_selected_task_uuid (state, newUUID) {
          state.selectedTaskUUID = newUUID;
      }
  },
  actions: {
      async fetchTaskList({ commit }) {
          const response = await axios.get('http://127.0.0.1:5000/');
          let tasks = response.data.pending.concat(response.data.completed);
          commit('set_tasks', tasks);
      },
      async addTask({ dispatch }, newTask) {
          console.log(newTask);
          await axios.post(
              'http://127.0.0.1:5000/',
              newTask
          );
          await dispatch('fetchTaskList');
      },
      async updateTask({ dispatch }, updatedTask) {
          await axios.put(
              `http://127.0.0.1:5000/${updatedTask.uuid}`,
              updatedTask
          );
          await dispatch('fetchTaskList');
      },
      async deleteTask({ dispatch }, taskUUID) {
          await axios.delete(
              `http://127.0.0.1:5000/${taskUUID}`
          );
          await dispatch('fetchTaskList');
      },
      async doneTask({ dispatch }, taskUUID) {
          await axios.put(
              `http://127.0.0.1:5000/${taskUUID}/done`
          );
          await dispatch('fetchTaskList');
      },
      async startTask({ dispatch }, taskUUID) {
          await axios.put(
              `http://127.0.0.1:5000/${taskUUID}/start`
          );
          await dispatch('fetchTaskList');
      },
      async stopTask({ dispatch }, taskUUID) {
          await axios.put(
              `http://127.0.0.1:5000/${taskUUID}/stop`
          );
          await dispatch('fetchTaskList');
      },
  },
  modules: {
  }
})
