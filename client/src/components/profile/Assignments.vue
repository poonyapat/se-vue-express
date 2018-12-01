<template>
    <v-list expand flat dark>
     
    
        <v-list-tile 
            v-for="task in tasks" 
            :key="task.id"
            avatar
            :class="'my-3 py-3 '+color(task)"
             @click="navigateTo({name:'task', params: {id: task.projectId, taskId: task.id}})"
        >
            <v-list-tile-content>
              <v-list-tile-title>{{ task.projectId }} : {{ task.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ task.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
import TaskService from '@/services/taskService'
import {mapState} from 'vuex'
import TaskTab from '@/components/project/TaskTab'
export default {
    data() {
        return {
            tasks: []
        }
    },
    components :{
        TaskTab
    }
    ,
    async mounted() {
        this.tasks = (await TaskService.findAll({
            username: this.username    
        })).data
    },
    methods: {
        color(task) {
            if (task.status == 'Done'){
                return 'success'
            }
            else if (task.status == 'Analyzing'){
                return 'error'
            }
            else if (task.status == 'Cancel'){
                return 'grey'
            }
            else if (task.status == 'ToDo'){
                return 'accent'
            }
            else {
                return 'info'
            }
        },
        navigateTo(destination){
            this.$router.push(destination)
        }
    },
    computed: {
        ...mapState([
            'username'
        ])
    },
}
</script>

<style>

</style>
