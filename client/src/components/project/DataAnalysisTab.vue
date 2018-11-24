<template>
    <v-card>

    <div>
        {{taskWatchers}}
    </div>
    </v-card>
</template>

<script>
import TaskWatcherService from '@/services/taskWatcherService'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            taskWatchers: []
        }
    },
    computed: {
        ...mapState(['route'])
    },
    async mounted() {
        this.taskWatchers = (await TaskWatcherService.findAll({projectId: this.route.params.id})).data
    },
}
</script>

<style>

</style>
