import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "../router/index.js"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.token || null,
        apiBaseUrl: localStorage.apiBaseUrl || null,
        tmpAxiosConf: null,
        selectedTaskUUID: null,
        loadingTasks: true,
        taskFormView: undefined,
        urgencyScaleMax: 5,
        tasks: []
    },
    getters: {
        getToken: state => state.token,
        getHasToken: state => !!state.token,
        getBaseUrl: state => state.apiBaseUrl,
        getTasks: state => state.tasks ? state.tasks.slice() : [],
        getTmpAxiosConf: state => state.tmpAxiosConf,
        getSelectedTaskUUID: state => state.selectedTaskUUID,
        getLoadingTasks: state => state.loadingTasks,
        getUrgencyScaleMax: state => state.urgencyScaleMax,
        getSelectedTask: state => {
            if (state.selectedTaskUUID && state.tasks) {
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
        set_selected_task_uuid(state, newUUID) {
            state.selectedTaskUUID = newUUID;
        },
        set_tmp_axios_conf(state, tmpAxiosConf) {
            state.tmpAxiosConf = tmpAxiosConf;
        },
        set_api_base_url(state, apiBaseUrl) {
            state.apiBaseUrl = apiBaseUrl
        }
    },
    actions: {
        clearToken({ commit }) {
            localStorage.removeItem('token')
            commit('set_token', null);
        },
        async fetchToken({ dispatch, commit, getters }, { apiBaseUrl, pass }) {
            localStorage.apiBaseUrl = apiBaseUrl;
            commit('set_api_base_url', apiBaseUrl);
            let axios_fetch_conf = {
                method: 'get',
                url: 'http://localhost:5000/auth',
                auth: {
                    password: pass
                }
            }
            try {
                const response = await axios(axios_fetch_conf);
                // check if actually jwt
                localStorage.token = response.data.token;
                commit('set_token', response.data.token);
                let tmpAxiosConf = getters.getTmpAxiosConf
                if (tmpAxiosConf) {
                    dispatch('handleRequest', tmpAxiosConf);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async fetchTaskList({ dispatch, commit }) {
            let axios_conf = {
                method: 'get',
            }
            const response = await dispatch('handleRequest', axios_conf)
            if (response) {
                commit('set_tasks', response.data.tasks);
            }
        },
        async handleRequest({ dispatch, commit, getters }, axios_conf) {
            commit('set_tmp_axios_conf', null);
            axios_conf['baseURL'] = getters.getBaseUrl
            axios_conf['headers'] = {
                'x-access-tokens': getters.getToken
            }
            try {
                const response = await axios(axios_conf);
                commit('set_tasks', response.data.tasks);
                return response
            } catch (error) {
                dispatch('clearToken');
                commit('set_tmp_axios_conf', axios_conf);
                router.push({ name: 'Login' })
            }

        },
        async addTask({ dispatch }, newTask) {
            let axios_conf = {
                method: 'post',
                data: newTask
            }
            if(await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async updateTask({ dispatch }, updatedTask) {
            let axios_conf = {
                method: 'put',
                data: updatedTask,
                url: updatedTask.uuid
            }
            if(await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async deleteTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'delete',
                url: taskUUID
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async doneTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/done'
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async startTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/start'
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async stopTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/stop'
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async addAnnotation({ dispatch }, { taskUUID, annotation }) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/add_annotation',
                data: annotation
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async removeAnnotation({ dispatch }, { taskUUID, annotation }) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/remove_annotation',
                data: annotation
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async addDependency({ dispatch }, { taskUUID, dependency }) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/add_dependency',
                data: dependency
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
        async removeDependency({ dispatch }, { taskUUID, dependency }) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/remove_dependency',
                data: dependency
            }
            if (await dispatch('handleRequest', axios_conf))
                await dispatch('fetchTaskList');
        },
    },
    modules: {
    }
})
