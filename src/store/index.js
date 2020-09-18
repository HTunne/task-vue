import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.token || null,
        selectedTaskUUID: undefined,
        loadingTasks: true,
        taskFormView: undefined,
        urgencyScaleMax: 5,
        tasks: []
    },
    getters: {
        getHasToken: state => !!state.token,
        getTasks: state => state.tasks ? state.tasks.slice() : [],
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
        set_token(state, token) {
            state.token = token;
        },
        set_tasks(state, tasks) {
            state.tasks = tasks;
        },
        set_selected_task_uuid (state, newUUID) {
            state.selectedTaskUUID = newUUID;
        }
    },
    actions: {
        async fetchToken({ commit }, { apiBase, pass }) {
            let fetchSuccess
            try {
                const response = await axios.get(apiBase + '/auth', {
                    auth: {
                        password: pass
                    }
                });
                await console.log(response);
                localStorage.token = await response.data.token;
                await commit('set_token', response.data.token);
                fetchSuccess = true;
            } catch (error) {
                console.log('in catch');
                fetchSuccess = false;
            }
            console.log('fetchSuccess ' + fetchSuccess);
            return fetchSuccess
        },
        clearToken({ commit}) {
            localStorage.removeItem('token')
            commit('set_token', null);
        },
        async fetchTaskList({ commit }) {
            const response = await axios.get('http://127.0.0.1:5000/');
            console.log(response);
            commit('set_tasks', response.data.tasks);
        },
        async addTask({ dispatch }, newTask) {
            const response = await axios.post(
                'http://127.0.0.1:5000/',
                newTask
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
        async updateTask({ dispatch }, updatedTask) {
            const response = await axios.put(
                `http://127.0.0.1:5000/${updatedTask.uuid}`,
                updatedTask
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
        async deleteTask({ dispatch }, taskUUID) {
            const response = await axios.delete(
                `http://127.0.0.1:5000/${taskUUID}`
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
        async doneTask({ dispatch }, taskUUID) {
            const response = await axios.put(
                `http://127.0.0.1:5000/${taskUUID}/done`
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
        async startTask({ dispatch }, taskUUID) {
            const response = await axios.put(
                `http://127.0.0.1:5000/${taskUUID}/start`
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
        async stopTask({ dispatch }, taskUUID) {
            const response = await axios.put(
                `http://127.0.0.1:5000/${taskUUID}/stop`
            );
            console.log(response);
            await dispatch('fetchTaskList');
        },
    },
    modules: {
    }
})
