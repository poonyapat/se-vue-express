<template>
  <v-card>
    <v-tabs show-arrows v-model="active" color="cyan"
      slider-color="#FFCF69">
      <v-tab flat v-for="(parent,index) in parents" :href="'#'+parent.id" :key="parent.id" @click="jumpTo(parent.id)"
        :style="'background: rgba(255,255,255,'+(index*0.1)+')'">
        {{parent.name}} :
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-data-table :headers="headers" :items="tasks" item-key="id" hide-actions :rows-per-page-items="[{value: 10}]">
        <template slot="items" slot-scope="props">
          <tr @click="forward(props.item)" class="text-xs-left" :style="'background: '+rowColor(props.item.status)">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.status }}</td>
            <td>{{ props.item.estimatedCost }}</td>
            <td>{{ props.item.priority }}</td>
            <td>
              <v-btn icon @click.stop="$emit('showInfo',props.item)">
                <v-icon>info</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="footer">
          <task-creator @reload="loadTask" :parent-task="parentTask">
          </task-creator>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import TaskCreator from '@/components/TaskCreator'
  import TaskTable from '@/components/project/TaskTable2'
  import TaskService from '@/services/taskService'
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'task-table',
    components: {
      TaskCreator,
      TaskTable
    },
    data() {
      return {
        parentTask: 0,
        tasks: [],
        active: null,
        headers: [{
            text: 'Task',
            value: 'name'
          },
          {
            text: 'Status',
            value: 'status'
          },
          {
            text: 'Estimate Cost',
            value: 'estimatedCost'
          },
          {
            text: 'Priority',
            value: 'priority'
          },
          {
            text: 'Actions'
          }
        ],
        tabColors: [
          '794DFF', '4D82FF', '4DD5FF', '4DFFBE', 'B2FF4D', 'FFE44D', 'FF974D', 'FF4D4D'
        ],
        parents: [{
          name: 'Main Tasks',
          id: 0
        }]
      }
    },
    props: {
      project: {
        type: Object,
        default: {},
        required: true
      },
    },
    methods: {
      forward: function (selectedItem) {
        this.parentTask = selectedItem.id
        if (this.parents[this.parents.length - 1].id != selectedItem.id) {
          this.parents.push({
            name: selectedItem.name,
            id: selectedItem.id
          })
        }
      },
      jumpTo: function (id) {
        for (let i in this.parents) {
          if (this.parents[i].id === id) {
            this.parentTask = this.parents[i].id
            this.parents = this.parents.splice(0, parseInt(i) + 1)
            break
          }
        }
      },
      loadTask: async function () {
        this.tasks = (await TaskService.findAll({
          projectId: this.project.id,
          parent: this.parentTask
        })).data
        console.log('Something')
      },
      rowColor(status){
        if (status == 'Done'){
          return '#78CC88'
        }
        else if (status == 'ToDo'){
          return '#CCCCCC'
        }
        else if (status == 'Analyzing'){
          return '#FFCF69'
        }
        return '#A8C8FF'
      }
    },
    async mounted() {
      if (this.project.id) {
        this.tasks = (await TaskService.findAll({
          projectId: this.project.id,
          parent: 0
        })).data
      }
    },
    watch: {
      project: async function (value) {
        this.tasks = (await TaskService.findAll({
          projectId: this.project.id,
          parent: 0
        })).data
      },
      parentTask: async function (value) {
        this.parentTask = parseInt(value)
        this.tasks = (await TaskService.findAll({
          projectId: this.project.id,
          parent: value
        })).data
        this.active = this.parentTask + ''
      }
    }
  }
</script>