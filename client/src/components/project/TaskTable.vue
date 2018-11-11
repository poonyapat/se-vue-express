<template>
  <v-card>
    <v-tabs show-arrows v-model="active" color="cyan" slider-color="#FFCF69">
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
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="text-xs-center">{{ props.item.estimatedCost }}</td>
            <td class="text-xs-center">{{ props.item.priority }}</td>
            <td class="text-xs-center">
              <v-tooltip bottom v-if="props.item.description">
                <v-btn icon @click.stop="$emit('showInfo',props.item)" slot="activator">
                  <v-icon>info</v-icon>
                </v-btn>
                {{props.item.description}}
              </v-tooltip>
              <v-btn icon @click.stop="$emit('showInfo',props.item)" v-else>
                <v-icon>info</v-icon>
              </v-btn>
              <v-btn icon @click.stop="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="footer">
          <task-creator @reload="$emit('loadTask')" :parent-task="parentTask">
          </task-creator>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import TaskCreator from '@/components/TaskCreator'
  export default {
    components: {
      TaskCreator
    },
    data() {
      return {
        active: null,
        headers: [{
            text: 'Task',
            value: 'name'
          },
          {
            text: 'Status',
            value: 'status',
            align: 'center'
          },
          {
            text: 'Estimate Cost',
            value: 'estimatedCost',
            align: 'center'
          },
          {
            text: 'Priority',
            value: 'priority',
            align: 'center'
          },
          {
            text: 'Actions',
            value: false,
            sortable: false,
            align: 'center'
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
      tasks: {
        type: Array,
        required: true
      },
      parentTask: {
        type: Number,
        required: true
      }
    },
    methods: {
      forward: function (selectedItem) {
        this.$emit('setParent', selectedItem.id)
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
            this.$emit('setParent', this.parents[i].id)
            this.parents = this.parents.splice(0, parseInt(i) + 1)
            break
          }
        }
      },
      rowColor(status) {
        if (status == 'Done') {
          return '#78CC88'
        } else if (status == 'ToDo') {
          return '#CCCCCC'
        } else if (status == 'Analyzing') {
          return '#FFCF69'
        }
        return '#A8C8FF'
      }
    },

    watch: {
      parentTask: function (value) {
        this.active = value + ''
      }
    }
  }
</script>