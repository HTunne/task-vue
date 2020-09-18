<template>
    <v-card
        class="my-4 my-sm-12 ma-auto"
        max-width="344"
        >
        <v-card-title class="text-h3">
            Login
        </v-card-title>
        <v-card-text>
        <v-text-field
            :rules="[rules.required]"
            :loading="loading"
            :error="error"
            hint="Base url of task-rest server."
            label="Api base address"
            v-model="apiBase"
            class="input-group--focused"
            @input="error=false"
        >
        </v-text-field>
        <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            :loading="loading"
            :error="error"
            label="Password"
            v-model="password"
            class="input-group--focused"
            @click:append="show = !show"
            @input="error=false"
        >
        </v-text-field>
        </v-card-text>
        <v-card-subtitle class="error--text" v-if="error">
            Login failed
        </v-card-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onLogin">
                Login
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    name: 'Login',
    data() {
        return {
            apiBase: '',
            password: '',
            show: false,
            loading: false,
            error: false,
            rules: {
                required: value => !!value || 'Required'
            },
        };

    },
    computed: {
        ...mapGetters(['getHasToken'])
    },
    methods: {
        ...mapActions(['fetchToken']),
        async onLogin () {
            this.loading = true;
            let apiBaseUrl = this.apiBase;
            let pass = this.password;
            console.log('apiBase in login: ', apiBaseUrl);
            await this.fetchToken({apiBaseUrl, pass});
            if (this.getHasToken) {
                this.$router.push({ name: 'TaskNoneSelected' })
            } else {
                this.loading = false;
                this.error = true;
            }
        }
    }
}
</script>
