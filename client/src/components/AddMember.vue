<template>
    <v-layout>

        <v-dialog width="500" v-model="show">
            <v-btn slot="activator" icon><v-icon>person_add</v-icon>Add member</v-btn>
            <v-card max-width="500px"> 
                <v-toolbar  color="" drak>
                <v-toolbar-title color= drak> <v-icon>person</v-icon><content > Add members</content>                                                               
                </v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                    <v-form>
                    
                        <v-text-field 
                        prepend-icon="person_add"
                        v-model="input.user1"
                        :rules="[rules.required]"
                        label="Add user1" 
                        type="text"
                        >
                    </v-text-field> 
                    <v-text-field 
                        prepend-icon="person_add"
                        v-model="input.user2"
                        label="Add user2" 
                        type="text"
                        >
                    </v-text-field>
                        <v-text-field 
                        prepend-icon="person_add"
                        v-model="input.user3"
                        label="Add user3" 
                        type="text"
                        >
                        </v-text-field>
                
                </v-form>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="add()">Add</v-btn>
                  <v-spacer></v-spacer>
               </v-card-actions>
        </v-card>

        

   </v-dialog>

</v-layout>
</template>

<script>
import ProjectService from '@/services/projectService'
export default {
    props:['projId'],
    data(){
        return{
            input:{
                user1:'',
                user3:'',
                user2:'',
                projectId:null
            },
            rules: {
                required: value => !!value || "Required."   
      }
        }
    },
 
    methods :{
    async add(){
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
        if(this.input.user1 != ''){
            this.input.projectId = this.projId
            await ProjectService.addMembers(this.input)

            
        }
      } catch (error) {
           this.error = error
          }
        }
    }
}
</script>

<style>

</style>
