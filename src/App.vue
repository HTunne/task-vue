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
        <v-main style="height: 1vh">
            <router-view/>
        </v-main>
        <v-alert text dismissible :value="alertOn" class="ma-0" :type="alert.type" v-for="alert in alerts" :key="alert.message">
            {{ alert.description }}
        </v-alert>
    </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'App',
    data() {
        return {
            alertOn: true,
            testy: 'hello'
        }
    },
    computed: {
        recurPage() {
            return this.$route.meta.recurPage
        },
        alerts() {
            return this.$store.getters.getAlerts
        },
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
    watch: {
        alerts() {
            this.alertOn = true;
            setTimeout(() => {
                console.log('timeout');
                this.alertOn = false;
            }, 5000)
        },
    }
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
