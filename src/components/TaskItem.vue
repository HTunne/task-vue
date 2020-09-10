<template>
  <v-list-item :value="task.uuid">
    <v-list-item-avatar v-if="task.status === 'completed'" color="error">{{ task.id }}</v-list-item-avatar>
    <v-list-item-avatar v-else-if="task.start" color="success">{{ task.id }}</v-list-item-avatar>
    <v-list-item-avatar v-else color="grey">{{ task.id }}</v-list-item-avatar>
    <v-list-item-content>
      <v-btn depressed small outlined left color="primary" v-if="'project' in task" v-text="task.project" class="project-btn text-none font-weight-bold" @click.stop="search = 'p:' + task.project">
      </v-btn>
      <v-list-item-subtitle v-text="task.description">
      </v-list-item-subtitle>
      <v-item-group v-if="'tags' in task">
        <v-btn
          v-for="tag in task.tags"
          rounded
          x-small
          depressed
          style="margin: 0 5px 5px 0"
          color="primary"
          :key="tag"
          @click.stop="search = '+' + tag"
          class="text-none">
            {{ tag }}
        </v-btn>
      </v-item-group>
    </v-list-item-content>
    <v-list-item-avatar class="urgency-avatar" v-text="task.urgency"></v-list-item-avatar>
    <v-list-item-action>
      <v-btn fab depressed><v-icon>mdi-check</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'taskItem',
  props: {
    task: Object
  }
}
</script>
