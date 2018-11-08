<template>
<v-container fluid grid-list-lg>
    <v-layout justify-center row wrap>
        <v-flex lg8 md12 sm12>
            <task-table @showInfo="showInfo" :project="project"></task-table>
        </v-flex>
        <v-flex lg4 md12 sm12>
            <task-info :task="selectedTask"></task-info>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
    import TaskTable from '@/components/project/TaskTable'
    import TaskInfo from '@/components/project/TaskInfo'
    export default {
        data() {
            return {
                show: false,
                selectedTask: {}
            }
        },
        components: {
            TaskTable, TaskInfo
        },
        props: {
            project: {
                type: Object,
                default: {},
                required: true
            },
        },
        methods: {
            showInfo(selectedTask) {
                this.show = true
                this.selectedTask = selectedTask
            }
        },
    }
</script>

<style scoped>

</style>