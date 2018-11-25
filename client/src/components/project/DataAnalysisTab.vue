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
                datasets: {
                    reality: {},
                    prediction: {}
                },
            }
        },
        computed: {
            ...mapState(['route']),
        },
        async mounted() {
            this.taskWatchers = (await TaskWatcherService.findAll({
                projectId: this.route.params.id
            })).data
            let tempTasks = (await taskService.findAllWithSelectedAttributes({
                projectId: this.route.params.id
            }, ['id', 'estimatedCost', 'parent'])).data
            let taskCosts = taskService.calculateTaskCostPercentage(tempTasks)
            taskCosts = taskService.burndown(taskCosts, this.taskWatchers)
            this.datasets.reality = {
                label: "Reality",
                data: taskCosts.map(task => task.remainingCost),
                backgroundColor: 'rgba(200,200,255,0.4)'
            }
            this.datasets.prediction = {
                label: "Prediction",
                data: taskCosts.map((task, index) => (taskCosts.length - 1 - index) * 100 / (taskCosts.length -
                    1)),
                backgroundColor: 'rgba(255,200,200,0.4)'
            }
            this.labels = taskCosts.map(task => task.date)
            this.plotChart()
        },
        methods: {
            plotChart() {
                let data = {
                    labels: this.labels,
                    datasets: [this.datasets.reality, this.datasets.prediction]
                };
                let ctx = document.getElementById("chart").getContext('2d');
                let chart = new Chart(ctx, {
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
                                    beginAtZero: true
                                }
                            }]
                        },
                    }
                });
            },
        },
    }
</script>

<style>

</style>