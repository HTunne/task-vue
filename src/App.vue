<template>
    <v-app>
        <v-app-bar
            flat
            app
            color="primary"
            dark
            >
            <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile" @click="navDrawer=true"></v-app-bar-nav-icon>
            <span class="font-weight-thin text-h5">TASK-</span><span class="pr-4 text-h5">VUE</span>
            <template v-if="!$vuetify.breakpoint.mobile">
                <v-btn v-for="item in navItems" :key="item.text" link @click="item.method" text class="text-subtitle-1">
                    <v-icon class="pr-2">{{ item.icon }}</v-icon>
                    {{ item.text }}
                </v-btn>
            </template>
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
        <v-navigation-drawer
            :value="navDrawer"
            v-if="$vuetify.breakpoint.mobile"
            v-model="navDrawer"
            app
            class="secondary darken-3">
            <v-btn fab depressed class="secondary darken-3" @click="navDrawer=false"><v-icon>mdi-close</v-icon></v-btn>
            <v-list>
                <v-list-item dark v-for="item in navItems" :key="item.text" link @click="item.method" text class="text-subtitle-1">
                    <v-list-item-icon>
                        <v-icon>
                            {{ item.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main style="height: 1vh">
            <router-view/>
        </v-main>
        <v-alert text dismissible :value="alertShow" class="ma-0" :type="alert.type" v-for="alert in alerts" :key="alert.message">
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
            alertShow: true,
            navDrawer: false,
            navItems: [
                { icon: 'mdi-format-list-checks', text: 'Task List', method: this.onBtn },
                { icon: 'mdi-calendar-refresh', text: 'Recurring Tasks', method: this.onRecurBtn }
            ]
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
