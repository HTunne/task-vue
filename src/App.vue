<template>
    <v-app>
        <v-app-bar
            flat
            app
            color="primary"
            dark
            >
            <v-btn link @click="onBtn" text class="text-subtitle-1">
                <v-icon class="pr-2">mdi-format-list-checks</v-icon>
            Task List
            </v-btn>
            <v-btn link @click="onRecurBtn" text class="text-subtitle-1">
                <v-icon class="pr-2">mdi-calendar-refresh</v-icon>
                Recurring Tasks
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                :retain-focus-on-click="false"
                link
                @click="onLogOut"
                text
                >
                <span class="mr-2 text-subtitle-1 font-weight-bold">Log out</span>
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
