<template>
  <v-container>
    <h1>No Task Selected.</h1>
    can I edit completed task??
  </v-container>
</template>

<script>
  export default {
    name: 'taskNoneSelected',
    created: function () {
      this.$store.commit('set_selected_task_uuid', undefined)
    }
  }
</script>
