<template>
    <v-app>
        <v-app-bar
            flat
            app
            color="primary"
            dark
            >
            <div class="d-flex align-center">
                <v-img
                 alt="Vuetify Logo"
                 class="shrink mr-2"
                 contain
                 src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                 transition="scale-transition"
                 width="40"
                 />

                    <v-img
                 alt="Vuetify Name"
                 class="shrink mt-1 hidden-sm-and-down"
                 contain
                 min-width="100"
                 src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                 width="100"
                 />
            </div>
            <v-btn link @click="onBtn" text>
                Task List
            </v-btn>
            <v-btn link @click="onRecurBtn" text>
                Recurring Tasks
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                 :retain-focus-on-click="false"
                 link
                 @click="onLogOut"
                 text
                 >
                 <span class="mr-2">Log out</span>
            </v-btn>
        </v-app-bar>
        <v-main style="height: 100vh">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'App',
    computed: {
        recurPage() {
            return this.$route.meta.recurPage
        }
    },
    methods: {
        ...mapActions(["fetchTaskList", "clearToken"]),
        onLogOut () {
            this.clearToken();
            this.$router.push({ name: 'Login' })
        },
        onRecurBtn () {
            if (!this.recurPage) this.$router.push({ name: 'TaskRecurNoneSelected' });
        },
        onBtn () {
            if (this.recurPage) this.$router.push({ name: 'TaskNoneSelected' });
        },
    },
    created() {
        //this.fetchTaskList();
    },
    data: () => ({
        //
    }),
};
</script>

<style>
* {
    scrollbar-width: thin;
}

html {
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
    width: 12px;
}
*::-webkit-scrollbar-thumb {
    border-radius: 20px;
}
</style>
