<template>
  <v-container>
    <h1>Add Task...</h1>
    <v-btn :to="{ name: 'TaskNoneSelected' }">Cancel</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'taskAdd',
  }
</script>
