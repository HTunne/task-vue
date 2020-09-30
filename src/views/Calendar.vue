<template>
    <v-container>
        <v-row>
            <v-col>
                <v-calendar
                    :type="type"
                    v-model="focus"
                    @click:more="toDay"
                    @click:date="toDay"
                    >

                </v-calendar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Calendar',
    data () {
        return {
            focus: '',
            type: 'month'
        }
    },
    methods: {
      toDay ({ date }) {
          this.$router.push({ name: 'Day', params: { date } });
      },
    }
}
</script>
