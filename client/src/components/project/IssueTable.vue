<template>
    <v-data-table :headers="headers" :items="issues" hide-actions class="elevation-1">
        <tr slot="items" slot-scope="props">
            <td> {{props.item.taskId}} </td>
            <td> {{props.item.description}} </td>
            <td :style="'color: '+rowColor(props.item.status)"> {{props.item.status}} </td>
            <td> {{props.item.reporterUsername}} </td>
            <td class="text-xs-right">
                <v-menu left v-if="props.item.status != 'Cancelled' && props.item.status != 'Complete'">
                    <v-btn slot="activator" color="primary" dark icon flat>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-if="isActionsShow(props.item.status, action.status)" @click="updateStatus(props.item.id, action.status)"
                            v-for="action in actions" :key="action.status">
                            <v-list-tile-title>
                                <v-icon> {{action.icon}} </v-icon>
                                {{action.label}}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </td>
        </tr>
    </v-data-table>

</template>

<script>
    import TaskIssueService from '@/services/taskIssueService.1'
    import {
        mapState,
        mapActions
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
                    text: 'Status',
                    value: 'status'
                }, {
                    text: 'Reporter',
                    value: 'ReporterUsername'
                }, {
                    text: '',
                    value: '',
                    align: 'right',
                    sortable: false
                }],
                actions: [{
                    status: 'Analyzing',
                    icon: 'play_arrow',
                    label: 'analyzing',
                },{
                    status: 'Solving',
                    icon: 'play_arrow',
                    label: 'solving',
                }, {
                    status: 'Complete',
                    icon: 'play_arrow',
                    label: 'complete',
                }, {
                    status: 'Ignore',
                    icon: 'work_off',
                    label: 'ignore'
                }, {
                    status: 'Cancelled',
                    icon: 'clear',
                    label: 'cancel'
                }],
                issues: []
            }
        },
        computed: {
            ...mapState(['route', 'updater'])
        },
        async mounted() {
            this.issues = (await TaskIssueService.findAll({
                projectId: this.route.params.id
            })).data
        },
        methods: {
            ...mapActions(['updateUpdater']),
            async remove(id) {
                await TaskIssueService.remove(id)
                this.issues = (await TaskIssueService.findAll({
                    projectId: this.route.params.id
                })).data
            },
            async updateStatus(id, status) {
                await TaskIssueService.updateStatus(id, status)
                this.issues.map(issue => {
                    if (issue.id == id) {
                        issue.status = status
                    }
                })
            },
            isActionsShow(actualStatus, targetStatus) {
                if (actualStatus == 'Ignore' && targetStatus != 'Cancelled') return false
                if (actualStatus == 'Analyzing' && targetStatus == 'Analyzing') return false
                return true
            },
            rowColor(status) {
                if (status == 'Ignore') return '#88888888'
                if (status == 'Cancelled') return '#882222'
                if (status == 'Complete') return '#228822'
                if (status == 'Analyzing') return '#F80'
                return 'black'
            }
        },
        watch: {
            'updater.issue': async function (value) {
                if (value == true) {
                    this.issues = (await TaskIssueService.findAll({
                        projectId: this.route.params.id
                    })).data
                    this.updateUpdater({
                        key: 'issue',
                        value: false
                    })
                }
            }
        }
    }
</script>

<style>

</style>