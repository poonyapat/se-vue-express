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
      
 

        </v-toolbar >

        <v-pagination
                v-if="projects.length"
                v-model="page"
                :length="maxPage"
                :total-visible="7"
                round
         ></v-pagination>
       
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
            <v-pagination
                v-if="projects.length"
                v-model="page"
                :length="maxPage"
                :total-visible="7"
                round
            ></v-pagination>


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
            query: '',
            
             page:1,
             maxPage: 1,
    
    }
    },
    async mounted() {
        this.projects = (await ProjectService.findAll({
            username: this.username,
       
        })).data  
  
   
    },
    // mounted() { this.$router.push({ query: {page: this.page}})
    // },
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
    },
    // watch :{ 
    //     '$route.query.page': {
    //         immediate: true,
    //         async handler (value) {
    //             this.page = parseInt(value)
    //             let temp = (await ProjectService.findAll({page:value})).data
    //             this.projects = temp.rows;
    //             this.maxPage = Math.ceil(temp.count/10)
    //            // this.loaded = true
    //             console.log(this.projects.length)
    //         }
    //     },

    // }

}
</script>

<style>

</style>
