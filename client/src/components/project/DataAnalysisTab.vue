<template>
    <v-layout justify-center>
        <v-flex lg8 md10 sm12>
            <v-card>
                <canvas id='chart'></canvas>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import TaskWatcherService from '@/services/taskWatcherService'
    import projectService from '@/services/projectService'
    import taskService from '@/services/taskService'
    import {
        mapState
    } from 'vuex'
    import Chart from 'chart.js'
    export default {
        data() {
            return {
                taskWatchers: [],
                chart: {},
                datasets: [],
                additionalLabel: [],
                project: {}
            }
        },
        computed: {
            ...mapState(['route']),
        },
        async mounted() {
            this.project = (await projectService.findOne(this.route.params.id)).data
            // load task watchers
            this.taskWatchers = (await TaskWatcherService.findAll({
                projectId: this.route.params.id
            })).data
            // load tasks with selected attrs
            let tempTasks = (await taskService.findAllWithSelectedAttributes({
                projectId: this.route.params.id
            }, ['id', 'estimatedCost', 'parent'])).data
            // clean data for burndown chart
            const [taskCosts, additionalLabel] = taskService.burndown(taskService.calculateTaskCostPercentage(
                tempTasks), this.taskWatchers)
            // create labels
            this.labels = taskCosts.map(task => task.date)
            // create data sets
            this.additionalLabel = additionalLabel
            let firstDay = Math.min.apply( Math, this.labels.map(label => new Date(label)))
            let lastDay =  this.project.dateLine? new Date(this.project.dateLine): Math.max.apply( Math, this.labels.map(label => new Date(label)))
            let fullTime = lastDay - firstDay
            console.log(fullTime)
            this.datasets = [{
                label: "Reality",
                data: taskCosts.map(task => task.remainingCost),
                backgroundColor: 'rgba(200,200,255,0.4)'
            }, {
                label: "Simple Prediction",
                data: this.labels.map(label => ((lastDay - new Date(label))/(fullTime))*100),
                backgroundColor: 'rgba(255,200,200,0.4)'
            }]
            // plot chart
            this.plotChart()
        },
        methods: {
            plotChart() {
                let data = {
                    labels: this.labels,
                    datasets: this.datasets,
                    additionalLabel: this.additionalLabel
                };
                let ctx = document.getElementById("chart").getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        elements: {
                            line: {
                                tension: 0
                            }
                        },
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    beginAtZero: true,
                                },
                            }],
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    max: this.project.dateLine
                                }
                            }],

                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += Math.round(tooltipItem.yLabel * 100) / 100 + '% - ' + data.additionalLabel[
                                        tooltipItem.index];
                                    return label;
                                }
                            }
                        }
                    }
                });
            },
        },
    }
</script>

<style>

</style>