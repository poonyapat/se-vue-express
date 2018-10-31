<template>
    <v-list expand flat dark>
        <v-toolbar flat class="secondary">
            <v-text-field
                label="Search"
                outline
                append-icon="search"
                v-model="query"
            ></v-text-field>
        
        
         
        <create>
            <content center>     
               <v-btn slot="activator" round large><v-icon>add</v-icon>new</v-btn>
            </content> 
        </create> 
      
 


  <!--   <v-dialog   max-width="225px">
              <v-btn slot="activator" round large><v-icon>add</v-icon>new</v-btn>
 
    <create/>
    </v-dialog>    -->
        </v-toolbar >


         <!-- <router-link :to="{name:'projectTabs', params: {id: project.id  }}"> -->
        <v-list-tile 
            v-for="project in projects" 
            :key="project.id"
            v-show="project.name.toLowerCase().includes(query.toLowerCase())"
            avatar
            :class="'my-3 py-3 '+color(project)"
            @click="navigateTo({name:'projectTabs', params: {id: project.id,name: project.name}})"
        >
     
            <v-list-tile-content>
              <v-list-tile-title>{{ project.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ project.description }}</v-list-tile-sub-title>
         

            </v-list-tile-content>
              
        </v-list-tile>
    <!-- </router-link > -->


    </v-list>
</template>
 
<script>
import ProjectService from '@/services/projectService'
import Create from '@/components/CreateProject'

import {mapState} from 'vuex'
export default {
   
    data() {
        return {
            projects: [],
            query: ''
        }
    },
    async mounted() {
        this.projects = (await ProjectService.findAll({
            username: this.username,
       
        })).data
    },
    methods: {
        color(project) {
            return project.status === 'Open'? 'cyan': 'grey'
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
    components :{
        Create
    }

}
</script>

<style>

</style>
