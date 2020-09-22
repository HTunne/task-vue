<template>
    <div id="container">
        <div class="sub-container sub-1">
        <v-menu

            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    :label="title + ' date...'"
                    readonly
                    v-bind="attrs"
                    v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker v-model="pickedDate" @input="dateTimeStringUpdate"></v-date-picker>
        </v-menu>
        </div>
        <div class="sub-container sub-2">
        <v-menu
                           v-model="timeMenu"
                           :close-on-content-click="false"
                           :nudge-right="40"
                           transition="scale-transition"
                           offset-y
                           min-width="290px"
                           >
                           <template v-slot:activator="{ on, attrs }">
                               <v-text-field
                                    :value="time"
                                    :label="title + ' time...'"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    clearable
                                    @click:clear="clearFields"
                                    >
                               </v-text-field>
                           </template>
            <v-time-picker scrollable format="24hr" v-model="pickedTime" @click:minute="dateTimeStringUpdate"></v-time-picker>
        </v-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: "dateTimeMenu",
    props: ['title', 'dateTimeString'],
    data () {
        return {
            dateMenu: false,
            timeMenu: false,
            pickedTime: '00:00',
            pickedDate: new Date(Date.now()).toISOString().substr(0,10)
        }
    },
    computed: {
        date () {
            if (this.dateTimeString) {
                let pad = (val) => (val < 10 ? '0' + val : val)
                let date = new Date(this.dateTimeString);
                return date.getFullYear() +
                    '-' + pad(date.getMonth() + 1) +
                    '-' + pad(date.getDate());
            }
            return undefined
        },
        time () {
            if (this.dateTimeString) {
                let date = new Date(this.dateTimeString);
                return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
            }
            return undefined
        },
        selectedDateTimeSting () {
            let selectedDateTime = new Date(this.pickedDate + ' ' + this.pickedTime)
            console.log(selectedDateTime.toUTCString());
            return selectedDateTime.toUTCString();
        },
        outerIcon () {
            if (this.dateTimeString)
                return "mdi-close"
            return ""
        }
    },
    methods: {
        dateTimeStringUpdate () {
            this.timeMenu = false;
            this.dateMenu = false;
            this.$emit('update:dateTimeString', this.selectedDateTimeSting);
        },
        clearFields () {
            this.$emit('update:dateTimeString', undefined);
        }
    }
}
</script>

<style scoped>
#container {
    display: flex;
}

.sub-container {
    flex: 0 0 50%;
}

.sub-1 {
    padding-right: 12px;
}

.sub-2 {
    padding-left: 12px;
}
</style>
