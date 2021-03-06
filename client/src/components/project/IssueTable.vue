<template>
    <v-data-table :headers="headers" :items="issues" hide-actions class="elevation-1">
        <tr slot="items" slot-scope="props" :style="'background-color: '+rowColor(props.item.status)">
            <td> {{ `${props.item.taskId} - ${namesMapping[props.item.taskId]}`}} </td>
            <td> {{props.item.description}} </td>
            <td> {{props.item.status}} </td>
            <td> {{props.item.reporterUsername}} </td>
            <td class="text-xs-right">
                <v-menu left v-if="!readonly && props.item.status != 'Cancelled' && props.item.status != 'Complete'">
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
    import TaskService from '@/services/taskService'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                namesMapping: [],
                headers: [{
                    text: 'Task',
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
        props: {
            readonly: {
                type: Boolean,
                required: true
            },
        },
        computed: {
            ...mapState(['route', 'updater'])
        },
        async mounted() {
            this.issues = (await TaskIssueService.findAll({
                projectId: this.route.params.id
            })).data
            let namesMapping = (await TaskService.findAllWithSelectedAttributes({
                id: { in: this.issues.map(issue => issue.taskId)
                }
            }, ['id', 'name'])).data
            if (namesMapping.length > 0)
                this.namesMapping = Object.assign(...namesMapping.map(task => ({
                    [task.id]: task.name
                })))
            this.issues.map(issue => issue.taskName = this.namesMapping[issue.taskId])
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
                if (status == 'Cancelled') return '#a85050'
                if (status == 'Complete') return '#50a852'
                if (status == 'Analyzing') return '#ffcc68'
                return 'white'
            }
        },
        watch: {
            'updater.issue': async function (value) {
                if (value == true) {
                    this.issues = (await TaskIssueService.findAll({
                        projectId: this.route.params.id
                    })).data
                    let namesMapping = (await TaskService.findAllWithSelectedAttributes({
                        id: { in: this.issues.map(issue => issue.taskId)
                        }
                    }, ['id', 'name'])).data
                    if (namesMapping.length > 0)
                        this.namesMapping = Object.assign(...namesMapping.map(task => ({
                            [task.id]: task.name
                        })))
                    this.issues.map(issue => issue.taskName = this.namesMapping[issue.taskId])
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