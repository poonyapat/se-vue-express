<template>
  <v-dialog width="500" v-model="show">
    <v-btn slot="activator" round flat>
      <v-icon>add</v-icon>
      add subtask
    </v-btn>
    <v-card max-width="500px">
      <v-toolbar color="" drak>
        <v-toolbar-title color=d rak>
          <v-icon>create_new_folder</v-icon>
          <content v-if="!parentTask"> Create Task</content>
          <content v-else>Create Subtask</content>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field prepend-icon="layers" v-model="input.name" :rules="[rules.required]" label="Task Name*" type="text">
        </v-text-field>
        <v-text-field prepend-icon="comment" v-model="input.description" label="Description" type="text">
        </v-text-field>
        <v-text-field prepend-icon="comment" v-model="input.estimatedCost" label="Estimate Cost" type="number" style="width: 45%; display:inline-block" class="mr-3">
        </v-text-field>
        <v-text-field prepend-icon="comment" v-model="input.priority" label="Priority" type="number" style="width: 45%;display:inline-block">
        </v-text-field>
        <div v-if="error" class="error"> {{error}} </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="create" round>Create</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import TaskService from "@/services/taskService"
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      parentTask: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        show: false,
        input: {},
        rules: {
          required: value => !!value || "Required."
        },
        error: ''
      }
    },
    computed: {
      ...mapState([
        'route'
      ])
    },
    methods: {
      async create() {
        try {
          if (this.rules['required'](this.input.name) == 'Required.') {
            this.error = 'Require Data'
            return
          }
          this.input.projectId = this.route.params.id
          this.input.parent = this.parentTask
          await TaskService.create(this.input)
          this.show = false
          this.input = {}
          this.error = ''
          this.$emit('reload')
        } catch (error) {
          this.error = error
        }
      }
    },
  }
</script>

<style scoped>
  small:hover {
    color: #aaa !important
  }
</style>