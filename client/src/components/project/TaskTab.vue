<template>
    <v-container fluid grid-list-lg>
        <v-layout justify-center row wrap>
            <v-flex lg8 md12 sm12>
                <task-table @setParent="setParent" @showInfo="showInfo" @reload="loadTask" :tasks="tasks" :issue-count="issueCount" :parent-task="parentTask" @reloadIssue="loadIssue" :readonly="project.status=='Close'"></task-table>
            </v-flex>
            <v-flex lg4 md12 sm12>
                <task-info @reset="selectedTask = {}" @reload="loadTask" :task="selectedTask" :members="memberAndLeader" :readonly="project.status=='Close'"></task-info>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TaskTable from '@/components/project/TaskTable'
    import TaskInfo from '@/components/project/TaskInfo'
    import TaskIssueService from '@/services/taskIssueService.1'
    import TaskService from '@/services/taskService'
    export default {
        data() {
            return {
                parentTask: 0,
                tasks: [],
                selectedTask: {},
                issueCount: []
            }
        },
        components: {
            TaskTable,
            TaskInfo
        },
        props: {
            project: {
                type: Object,
                required: true
            },
        },
        computed: {
            memberAndLeader(){
                let temp = [this.project.username]
                temp.concat(this.project.member)
                return temp
            }
        },
        methods: {
            showInfo: function (selectedTask) {
                if (selectedTask.id == 0){
                    this.selectedTask = {}
                    return
                }
                this.selectedTask = selectedTask
            },
            loadTask: async function () {
                this.tasks = (await TaskService.findAll({
                    projectId: this.project.id,
                    parent: this.parentTask
                })).data
                this.loadIssue()
            },
            loadIssue: async function(){
                this.issueCount = (await TaskIssueService.countAll(this.tasks.map(task => task.id))).data
            },
            setParent: function(newParent){
                this.parentTask = newParent
            }
        },
        mounted() {
            if (this.project.id) {
                this.loadTask()
            }
        },
        watch: {
            parentTask: function (value) {
                this.parentTask = parseInt(value)
                this.loadTask()
            },
            project: function () {
                this.loadTask()
            },
        }
    }
</script>

<style scoped>

</style>