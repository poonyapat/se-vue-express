<template>
    <v-container fluid grid-list-lg>
        <v-layout justify-center row wrap>
            <v-flex lg8 md12 sm12>
                <task-table @setParent="setParent" @showInfo="showInfo" @load-task="loadTask" :tasks="tasks" :parent-task="parentTask"></task-table>
            </v-flex>
            <v-flex lg4 md12 sm12>
                <task-info @reset="selectedTask = {}" @reload="loadTask" :task="selectedTask"></task-info>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TaskTable from '@/components/project/TaskTable'
    import TaskInfo from '@/components/project/TaskInfo'
    import TaskService from '@/services/taskService'
    export default {
        data() {
            return {
                parentTask: 0,
                tasks: [],
                show: false,
                selectedTask: {}
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
        methods: {
            showInfo: function (selectedTask) {
                this.show = true
                this.selectedTask = selectedTask
            },
            loadTask: async function () {
                console.log(555)
                this.tasks = (await TaskService.findAll({
                    projectId: this.project.id,
                    parent: this.parentTask
                })).data
                console.log(this.tasks)
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