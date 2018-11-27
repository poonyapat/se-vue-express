import Api from './api'

export default {
    create(taskData) {
        return Api().post('task/create', taskData)
    },
    findAll(queryObject) {
        return Api().get('task/all', {
            params: queryObject
        })
    },
    findAllWithSelectedAttributes(queryObject, attributes) {
        return Api().get('task/all/attributes', {
            params: {
                query: queryObject,
                attributes: attributes
            }
        })
    },
    findOne(id) {
        return Api().get('task', {
            params: {
                id: id
            }
        })
    },
    update(id, data) {
        return Api().post('task/update', {
            id: id,
            data: data
        })
    },
    remove(id) {
        return Api().post('task/delete', {
            id: id
        })
    },

    calculateTaskCostPercentage(tasks) {
        let parentIds = [{
            id: 0,
            cost: 100
        }]
        const out = {}
        while (parentIds.length > 0) {
            let tempParentIds = []
            parentIds.map(parentId => {
                let sumCost = 0
                let naCount = 0
                let selectedTasks = []
                tasks.map(task => {
                    if (task.parent == parentId.id) {
                        selectedTasks.push(task)
                        if (task.estimatedCost > 0) {
                            sumCost = sumCost + task.estimatedCost;
                        } else {
                            naCount++;
                        }
                    }
                })
                if (selectedTasks.length == 0) {
                    out[parentId.id] = parentId.cost
                }
                let naCost = 0
                if (sumCost != 0) {
                    naCost = sumCost / (selectedTasks.length - naCount)
                    sumCost += naCost * naCount
                }
                selectedTasks.map(task => {
                    if (sumCost == 0) {
                        task.percentageCost = parentId.cost / selectedTasks.length
                    } else if (!task.estimatedCost) {
                        task.percentageCost = parentId.cost * naCost / sumCost
                    } else {
                        task.percentageCost = parentId.cost * task.estimatedCost / sumCost
                    }
                })
                selectedTasks.map(task => tempParentIds.push({
                    id: task.id,
                    cost: task.percentageCost
                }))
            })
            parentIds = tempParentIds
        }
        return out
    },

    burndown(tasksPercentageCosts, taskWatchers, namesMapping) {
        let burndownChart = []
        let addtionalLabels = []
        let percentage = 100
        let passed = []
        let taskIds = Object.keys(tasksPercentageCosts).map(id => parseInt(id))
        taskWatchers.sort((a, b) => {
            if (a.createdAt < b.createdAt)
                return -1;
            if (a.createdAt > b.createdAt)
                return 1;
            return 0;
        })
        taskWatchers.map(watcher => {
            if (taskIds.indexOf(watcher.taskId) != -1) {
                if (watcher.status == 'Done') {
                    percentage -= tasksPercentageCosts[watcher.taskId]
                    passed.push(watcher.taskId)
                    addtionalLabels.push(`Task No.${watcher.taskId} ${namesMapping[watcher.taskId]} is "Done"`)
                } else if ((watcher.status == 'OnGoing' || watcher.status == 'ToDo') && passed.indexOf(watcher.taskId) != -1) {
                    percentage += tasksPercentageCosts[watcher.taskId]
                    let index = passed.indexOf(watcher.taskId);
                    passed.splice(index, 1);
                    addtionalLabels.push(`Roll back Task No.${watcher.taskId} ${namesMapping[watcher.taskId]} to "${watcher.status}"`)
                } else {   
                    addtionalLabels.push('')
                }
                burndownChart.push({
                    date: watcher.createdAt,
                    remainingCost: percentage
                })
            }
        })
        return [burndownChart, addtionalLabels]
    }
}