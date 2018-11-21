<template>
    <v-data-table :headers="headers" :items="issues" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td> {{props.item.taskId}} </td>
            <td> {{props.item.description}} </td>
            <td> {{props.item.reporterUsername}} </td>
        </template>
    </v-data-table>

</template>

<script>
    import TaskIssueService from '@/services/taskIssueService.1'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                headers: [{
                    text: 'Task ID',
                    value: 'taskId'
                }, {
                    text: 'Issue',
                    value: 'description'
                }, {
                    text: 'Reporter',
                    value: 'ReporterUsername'
                }],
                issues: []
            }
        },
        computed: {
            ...mapState(['route'])
        },
        async mounted() {
            this.issues = (await TaskIssueService.findAll({
                projectId: this.route.params.id
            })).data
        }
    }
</script>

<style>

</style>