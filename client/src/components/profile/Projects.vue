<template>
    <v-list expand flat dark>
        <!-- {{ projects }} -->
        <v-list-tile 
            v-for="project in projects" 
            :key="project.id"
            avatar
            :class="'my-3 py-3 '+color(project)"
            @click="0"
        >
            <v-list-tile-content>
              <v-list-tile-title>{{ project.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ project.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
import ProjectService from '@/services/projectService'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            projects: []
        }
    },
    async mounted() {
        this.projects = (await ProjectService.findAll({
            username: this.username
        })).data
    },
    methods: {
        color(project) {
            return project.status === 'Open'? 'cyan': 'grey'
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
