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
        tasks: [],
        alerts: []
    },
    getters: {
        getToken: state => state.token,
        getHasToken: state => !!state.token,
        getBaseUrl: state => state.apiBaseUrl,
        getTasks: state => state.tasks ? state.tasks.slice() : [],
        getAlerts: state => state.alerts,
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
            state.apiBaseUrl = apiBaseUrl;
        },
        push_alert(state, alert_obj) {
            if (alert_obj) state.alerts.push(alert_obj);
        },
        pop_alert(state) {
            state.alerts.pop();
        },
        clear_alerts(state) {
            state.alerts = []
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
                url: apiBaseUrl + '/auth',
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
        async handleAlert({ commit }, alert_obj) {
            if (alert_obj) {
                commit('push_alert', alert_obj);
                setTimeout(() => {
                    console.log('timeout');
                    commit('pop_alert');
                }, 3000)
            }
        },
        async fetchTaskList({ dispatch, commit }) {
            await dispatch('syncTaskList');
            let axios_conf = {
                method: 'get',
            }
            const response = await dispatch('handleRequest', axios_conf)
            if (response) {
                dispatch('handleAlert', response.data.message);
                commit('set_tasks', response.data.tasks);
            }
        },
        async syncTaskList({ dispatch }) {
            let axios_conf = {
                method: 'get',
                url: 'sync'
            }
            const response = await dispatch('handleRequest', axios_conf)
            if (response) {
                dispatch('handleAlert', response.data.message);
            }
        },
        async handleRequest({ dispatch, commit, getters }, axios_conf) {
            commit('set_tmp_axios_conf', null);
            axios_conf['baseURL'] = getters.getBaseUrl
            axios_conf['headers'] = {
                'x-access-tokens': getters.getToken
            }
            try {
                return await axios(axios_conf);
            } catch (error) {
                dispatch('clearToken');
                commit('set_tmp_axios_conf', axios_conf);
                router.push({ name: 'Login' })
            }

        },
        handleRedirectToInfo(context, response) {
            if ((response.data.message &&
                (response.data.message.type !== "error") &&
                response.data.task.uuid)) {
                let uuid = response.data.task.uuid;
                if (response.data.task.status === 'recurring') {
                    router.push({ name: 'TaskRecurInfo', params: { uuid } });
                } else {
                    router.push({ name: 'TaskInfo', params: { uuid } });
                }
            }
        },
        async addTask({ dispatch }, newTask) {
            let axios_conf = {
                method: 'post',
                data: newTask
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleRedirectToInfo', response)
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async updateTask({ dispatch }, updatedTask) {
            let axios_conf = {
                method: 'put',
                data: updatedTask,
                url: updatedTask.uuid
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleRedirectToInfo', response)
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async deleteTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'delete',
                url: taskUUID
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleRedirectToInfo', response)
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async doneTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/done'
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async restoreTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/restore'
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async startTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/start'
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
        },
        async stopTask({ dispatch }, taskUUID) {
            let axios_conf = {
                method: 'put',
                url: taskUUID + '/stop'
            }
            const response = await dispatch('handleRequest', axios_conf);
            if(response) {
                dispatch('handleAlert', response.data.message)
                await dispatch('fetchTaskList');
            }
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
