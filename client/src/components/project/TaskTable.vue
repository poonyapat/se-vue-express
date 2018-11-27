<template>
  <v-card>
    <v-tabs show-arrows v-model="active" color="cyan" slider-color="#FFCF69">
      <v-tab flat v-for="(parent,index) in parents" :href="'#'+parent.id" :key="parent.id" @click="jumpTo(parent)"
        :style="'background: rgba(255,255,255,'+(index*0.1)+')'">
        {{parent.name}} :
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-data-table :headers="headers" :items="tasks" item-key="id" hide-actions :rows-per-page-items="[{value: 10}]">
        <template slot="items" slot-scope="props">
          <tr class="text-xs-left" :style="'background: '+rowColor(props.item.status)">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="text-xs-center">{{ props.item.estimatedCost }}</td>
            <td class="text-xs-center">{{ props.item.priority }}</td>
            <td class="text-xs-right">
              <v-tooltip bottom>
                <v-btn icon @click.stop="$emit('showInfo',props.item)" slot="activator" class="ma-0">
                  <v-icon>info</v-icon>
                </v-btn>
                Show Information
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon @click.stop="forward(props.item)" slot="activator" class="ma-0">
                  <v-icon>subdirectory_arrow_right</v-icon>
                </v-btn>
                show sub tasks
              </v-tooltip>
              <question-dialog v-if="!readonly" @confirm="reportIssue(props.item.id)" :title="confirm.issue.title" text-field v-model="confirm.issue.description"
                :text="confirm.issue.text" :label="confirm.issue.label">
                <v-tooltip bottom>
                  Report Issue
                  <v-btn icon slot="activator" class="ma-0">
                    <v-badge right overlap>
                      <span slot="badge" v-if="taskIssueCount[props.item.id]"> {{taskIssueCount[props.item.id]}} </span>
                      <v-icon>warning</v-icon>
                    </v-badge>
                  </v-btn>
                </v-tooltip>
              </question-dialog>
              <confirm-dialog v-if="!readonly" @confirm="remove(props.item.id)" :title="confirm.deletion.title" :text="confirm.deletion.text">
                <v-tooltip bottom>
                  Permanently Delete
                  <v-btn icon slot="activator">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-tooltip>
              </confirm-dialog>
            </td>

          </tr>
        </template>
        <template slot="footer">
          <task-creator @reload="$emit('reload')" :parent-task="parentTask">
          </task-creator>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import TaskCreator from '@/components/TaskCreator'
  import TaskService from '@/services/taskService'
  import ConfirmDialog from '@/components/ConfirmDialog'
  import QuestionDialog from '@/components/QuestionDialog'
  import TaskIssueService from '@/services/taskIssueService.1'
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    components: {
      TaskCreator,
      ConfirmDialog,
      QuestionDialog
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
        parents: [{
          name: 'Main Tasks',
          id: 0
        }],
        confirm: {
          deletion: {
            title: 'Confirm Deletion',
            text: 'Please check its sub tasks, this deletion will affect to them'
          },
          issue: {
            title: 'Confirm Report Task as Issue',
            text: 'This reportation will mark this task as an issue,<br> Please write issue description and confirm to report this task',
            description: '',
            label: 'Issue Description'
          }
        }
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
      },
      issueCount: {
        type: Array,
        default: () => {
          return []
        }
      },
      readonly: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapActions(['updateUpdater']),
      forward: function (selectedItem) {
        this.$emit('setParent', selectedItem.id)
        if (this.parents[this.parents.length - 1].id != selectedItem.id) {
          this.parents.push({
            name: selectedItem.name,
            id: selectedItem.id
          })
        }
        this.$emit('showInfo', selectedItem)
      },
      jumpTo: async function (parent) {
        for (let i in this.parents) {
          if (this.parents[i].id == parent.id) {
            this.$emit('setParent', this.parents[i].id)
            this.parents = this.parents.splice(0, parseInt(i) + 1)
            break
          }
        }
        let task = (await TaskService.findOne(parent.id)).data
        if (parent.id == 0)
          task = {}
        this.$emit('showInfo', task)
      },
      rowColor(status) {
        if (status == 'Done') {
          return '#78CC88'
        } else if (status == 'ToDo') {
          return '#DDDDDD'
        } else if (status == 'OnGoing') {
          return '#AACCFF'
        }
        return '#A8AAFF'
      },
      async remove(id) {
        await TaskService.remove(id)
        this.$emit('reload')
      },
      async reportIssue(id) {
        await TaskIssueService.create({
          description: this.confirm.issue.description,
          reporterUsername: this.username,
          taskId: id,
          projectId: this.route.params.id
        })
        this.$emit('reloadIssue')
        this.updateUpdater({
          key: 'issue',
          value: true
        })
        this.confirm.issue.description = ''
      }
    },

    watch: {
      parentTask: function (value) {
        this.active = value + ''
      },
    },
    computed: {
      taskIssueCount() {
        const issueCount = {}
        this.issueCount.map(issue => issueCount[issue.taskId] = issue.issueCount)
        return issueCount
      },
      ...mapState(['username', 'route'])
    }
  }
</script>