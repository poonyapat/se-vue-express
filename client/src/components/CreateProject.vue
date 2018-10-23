<template>
 <v-layout>

<v-dialog width="500" v-model="show">
  <slot slot="activator"/>
      <v-card max-width="500px"> 
        <v-toolbar  color="" drak>
          <v-toolbar-title color= drak> <v-icon>create_new_folder</v-icon> Create Project</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
              <v-form>
                <v-text-field 
                prepend-icon="layers"
                v-model="input.name"
                :rules="[rules.required]"
                label="Project Name" 
                type="text"
                >
             </v-text-field> 
              <v-text-field 
                prepend-icon="comment"
                v-model="input.description"
                label="Description" 
                type="text"
                >
             </v-text-field>
<!-- // ---------------------------- -->
              <!-- <v-text-field 
                prepend-icon="person_add"
                v-model="members[0]"
                label="Add Users" 
                type="text"
                >
             </v-text-field>
         
                 <v-text-field 
                prepend-icon="person_add"
                v-model="members[1]"
                label="Add Users" 
                type="text"
                >
         
             </v-text-field>
                 <v-text-field 
                prepend-icon="person_add"
                v-model="members[2]"
                label="Add Users" 
                type="text"
                >
             </v-text-field> -->


<!-- // ---------------------------- -->

          </v-form>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="create()">Create</v-btn>
                  <v-spacer></v-spacer>
               </v-card-actions>
        </v-card>
        
      
   </v-dialog>

</v-layout>
</template>

<script>
import { mapActions } from "vuex";
import ProjectService from '@/services/projectService'



import {mapState} from 'vuex'


export default {
  data() {
    return {
      // user: null,
      show: false,
      input: {
        name: '',
        description: '',
        members : [],
        tasks :[]

      },
      rules: {
        required: value => !!value || "Required."   
      }
    };
  },


  computed: {
        ...mapState([
            'username'
        ])
    },

  methods :{
    async create(){
      try{
        for (let key in this.rules){
          if (this.rules[key] === true){
            if (key == 'required'){
              this.error = 'require data'
            }
            else {
              this.error = this.rules[key]
            }
          }
        }
        if(this.input.name != ''){
            this.input.username = this.username
            await ProjectService.create(this.input)
            this.show = false
            this.input.name = ''
            this.input.description = ''
            
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
};
</script>

<style scoped>
small:hover {
  color: #AAA !important
}
</style>
