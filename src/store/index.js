import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      selectedTaskUUID: undefined,
      loadingTasks: true,
      taskFormView: undefined,
      urgencyScaleMax: 5,
      tasks: [
          {
              "description": "This is a test",
              "end": "Sat, 05 Sep 2020 13:59:55 GMT",
              "entry": "Fri, 04 Sep 2020 15:43:30 GMT",
              "id": 0,
              "modified": "Sat, 05 Sep 2020 13:59:55 GMT",
              "priority": "H",
              "status": "completed",
              "tags": [
                  "tag1",
              "tag2"
              ],
              "urgency": 6.56,
              "uuid": "49ebbdfa-4af1-43ae-bbc7-676170c29818"
          },
          {
              "description": "recon point sources with 0 rd",
              "end": "Thu, 03 Sep 2020 23:59:09 GMT",
              "entry": "Thu, 13 Feb 2020 11:59:52 GMT",
              "id": 0,
              "modified": "Thu, 03 Sep 2020 23:59:09 GMT",
              "project": "BalbiraRead",
              "status": "completed",
              "urgency": 2.56,
              "uuid": "c6c29e3f-9778-4ac7-b5e4-ee5da1f77c83"
          },
          {
              "description": "New already completed task",
              "end": "Fri, 04 Sep 2020 18:01:36 GMT",
              "entry": "Fri, 04 Sep 2020 18:01:36 GMT",
              "id": 0,
              "modified": "Fri, 04 Sep 2020 18:01:36 GMT",
              "status": "completed",
              "urgency": 0.56,
              "uuid": "c20da46f-fc81-4cac-9bb5-0251b1568f3e"
          },
          {
              "description": "Remember the milk",
              "end": "Fri, 04 Sep 2020 18:25:58 GMT",
              "entry": "Fri, 04 Sep 2020 18:25:58 GMT",
              "id": 0,
              "modified": "Fri, 04 Sep 2020 18:25:58 GMT",
              "status": "completed",
              "tags": ["next"],
              "urgency": 0.56,
              "uuid": "9af2fbf9-09ae-46b2-a34b-b6169ddd2f94"
          },
          {
              "description": "Remember the milk",
              "end": "Fri, 04 Sep 2020 18:27:32 GMT",
              "entry": "Fri, 04 Sep 2020 18:27:32 GMT",
              "id": 0,
              "modified": "Fri, 04 Sep 2020 18:27:32 GMT",
              "status": "completed",
              "urgency": 0.56,
              "uuid": "40b0175e-71c6-4107-aae5-4b49c64dc7a1"
          },
          {
              "description": "Normalisation",
              "entry": "Mon, 10 Feb 2020 13:26:39 GMT",
              "id": 1,
              "modified": "Fri, 04 Sep 2020 15:35:13 GMT",
              "project": "albiraRead",
              "start": "Thu, 03 Sep 2020 21:55:13 GMT",
              "status": "pending",
              "tags": [
                  "tag1",
              "tag2"
              ],
              "urgency": 7.56,
              "uuid": "4e2c1ea6-ccb2-49c0-abad-82d918c22ae3"
          },
          {
              "description": "This task has a really long title that should hopefully wrap properly.",
              "entry": "Mon, 10 Feb 2020 13:26:55 GMT",
              "id": 2,
              "modified": "Fri, 04 Sep 2020 19:40:45 GMT",
              "project": "albiraRead",
              "status": "pending",
              "tags": [
                "tag1",
                "tag2"
              ],
              "urgency": 2.56,
              "uuid": "cfab500e-9f5b-4fdf-af3f-81d676aa296b"
          },
          {
              "description": "get fwhm from images",
              "entry": "Thu, 13 Feb 2020 12:00:52 GMT",
              "id": 3,
              "modified": "Sat, 05 Sep 2020 13:35:32 GMT",
              "project": "albiraRead",
              "status": "pending",
              "urgency": 2.56,
              "uuid": "099fabbb-c904-407c-b900-dfb8959c8de0"
          },
          {
              "description": "bill:ben",
              "entry": "Fri, 04 Sep 2020 15:44:29 GMT",
              "id": 4,
              "modified": "Fri, 04 Sep 2020 15:44:29 GMT",
              "status": "pending",
              "tags": [
                  "y",
              "e",
              "l",
              "o",
              "w"
              ],
              "urgency": 1.56,
              "uuid": "b33b1216-a622-4d4f-bfb5-2c7641351030"
          },
          {
              "description": "This is a test 4",
              "entry": "Fri, 04 Sep 2020 15:57:36 GMT",
              "id": 5,
              "modified": "Fri, 04 Sep 2020 15:57:36 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "f8cd9805-bc9e-417c-831e-958873f0f878"
          },
          {
              "description": "Hi",
              "entry": "Fri, 04 Sep 2020 16:09:23 GMT",
              "id": 6,
              "modified": "Fri, 04 Sep 2020 16:09:23 GMT",
              "status": "pending",
              "tags": [
                  "yellow"
              ],
              "urgency": 0.56,
              "uuid": "2ae53657-cff0-4c28-b823-3a609db893ec"
          },
          {
              "description": "recurrence:",
              "entry": "Fri, 04 Sep 2020 18:13:44 GMT",
              "id": 7,
              "modified": "Fri, 04 Sep 2020 18:13:44 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "2cce0d31-1ca2-486e-b056-bf784c018dcb"
          },
          {
              "description": "recurrence:",
              "entry": "Fri, 04 Sep 2020 18:13:54 GMT",
              "id": 8,
              "modified": "Fri, 04 Sep 2020 18:13:54 GMT",
              "status": "pending",
              "urgency": 0.56,
              "tags": ["next"],
              "uuid": "29376b80-c526-4948-a091-20a3ae1d6ad1"
          },
          {
              "description": "recurrence:",
              "entry": "Fri, 04 Sep 2020 18:14:07 GMT",
              "id": 9,
              "modified": "Fri, 04 Sep 2020 18:14:07 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "065d9dbc-4e83-4705-be08-866f68828df0"
          },
          {
              "description": "recurrence:",
              "entry": "Fri, 04 Sep 2020 18:14:09 GMT",
              "id": 10,
              "modified": "Fri, 04 Sep 2020 18:14:09 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "72925f3a-49f6-4675-9f95-cba0846f40d4"
          },
          {
              "description": "recurrence:",
              "entry": "Fri, 04 Sep 2020 18:14:16 GMT",
              "id": 11,
              "modified": "Sat, 05 Sep 2020 14:00:46 GMT",
              "start": "Sat, 05 Sep 2020 14:00:46 GMT",
              "status": "pending",
              "urgency": 4.34,
              "uuid": "a6ab7191-494e-4bb7-b1c8-2052be5cc086"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 18:20:22 GMT",
              "id": 12,
              "modified": "Fri, 04 Sep 2020 18:20:22 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "3f2f8bdd-3012-42c0-a98a-3ef6972a108c"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:13:20 GMT",
              "id": 13,
              "modified": "Fri, 04 Sep 2020 20:13:20 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "b3b9ad52-b41a-496d-97ff-b80b61920d69"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:15:53 GMT",
              "id": 14,
              "modified": "Fri, 04 Sep 2020 20:15:53 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "89ff864c-8193-4aa5-96bb-a3bb22bf3d6f"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:16:19 GMT",
              "id": 15,
              "modified": "Fri, 04 Sep 2020 20:16:19 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "9c3726b1-1427-461f-b299-bd761ceff7f9"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:17:08 GMT",
              "id": 16,
              "modified": "Fri, 04 Sep 2020 20:17:08 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "85ad9295-c8b5-475f-b488-714cbea7c75f"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:22:27 GMT",
              "id": 17,
              "modified": "Fri, 04 Sep 2020 20:22:27 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "6a5b78a6-9e2c-4c8a-aed9-fc8a6182d876"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:24:27 GMT",
              "id": 18,
              "modified": "Fri, 04 Sep 2020 20:24:27 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "b7d65baa-5a0a-49bb-96f8-b07e046c9f1c"
          },
          {
              "description": "Remember the milk",
              "entry": "Fri, 04 Sep 2020 20:25:31 GMT",
              "id": 19,
              "modified": "Fri, 04 Sep 2020 20:25:31 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "ff15e00c-5d48-4c53-b05c-394e681c2fe1"
          },
          {
              "description": "Remember the oranges",
              "entry": "Fri, 04 Sep 2020 20:26:30 GMT",
              "id": 20,
              "modified": "Fri, 04 Sep 2020 20:26:30 GMT",
              "status": "pending",
              "urgency": 0.56,
              "uuid": "6f6d9a01-0a91-480b-bc49-ed116e126497"
          },
          {
              "description": "hello world",
              "entry": "Fri, 04 Sep 2020 21:03:16 GMT",
              "id": 21,
              "modified": "Fri, 04 Sep 2020 21:03:16 GMT",
              "status": "pending",
              "tags": [
                  "this",
              "should",
              ],
              "urgency": 1.56,
              "uuid": "3973d6b9-83e6-4fac-866c-8a1dbc1d9730"
          },
          {
              "description": "hello world",
              "entry": "Fri, 04 Sep 2020 21:04:01 GMT",
              "id": 22,
              "modified": "Fri, 04 Sep 2020 21:04:01 GMT",
              "status": "pending",
              "tags": [
                  "this",
              "should",
              "work"
              ],
              "urgency": 1.56,
              "uuid": "41ded93a-24c7-4985-bb3f-6571eee28bed"
          }
          ]
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
      set_selected_task_uuid (state, newUUID) {
          state.selectedTaskUUID = newUUID;
      }
  },
  actions: {
  },
  modules: {
  }
})
