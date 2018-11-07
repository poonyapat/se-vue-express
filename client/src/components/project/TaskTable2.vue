<!--<template>
    <v-list class="text-xs-left">
        <v-list-group v-for="item in tasks" v-model="item.active" :key="item.id">
            <v-list-tile slot="activator">
                <v-tooltip bottom>
                    <v-list-tile-content slot="activator">
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        <v-list-tile-sub-title>
                        Status: {{item.status}}, Priority: {{item.priority? item.priority: '-'}}, Estimated Cost: {{item.estimatedCost? item.estimatedCost: '-'}}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <template v-if="item.description">                    
                        {{item.description}}
                    </template>
                </v-tooltip>
                <v-spacer></v-spacer>
                <task-creator :parent-task="item.id">
                </task-creator> 
            </v-list-tile>
            <task-table :parent-task="item.id" class="ml-3"></task-table>
        </v-list-group>
    </v-list>
</template>

<script>
    // import TaskTable from '@/components/project/TaskTable2'
    // import TaskService from '@/services/taskService'
    // import TaskCreator from '@/components/TaskCreator'
    // import {
    //     mapState
    // } from 'vuex'
    // export default {
    //     name: 'TaskTable',
    //     data() {
    //         return {
    //             tasks: [],
    //             nSubtask: 0
    //         }
    //     },
    //     props: {
    //         parentTask: {
    //             type: Number,
    //             required: false,
    //             default: 0
    //         }
    //     },
    //     components: {
    //         TaskTable, TaskCreator
    //     },
    //     computed: {
    //         ...mapState(['route'])
    //     },
    //     async mounted() {
    //         this.tasks = (await TaskService.findAll({
    //             projectId: this.route.params.id,
    //             parent: this.parentTask
    //         })).data
    //     }
    // }
</script>

<style scoped>

</style>-->