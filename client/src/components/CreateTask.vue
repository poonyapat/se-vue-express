<template>
 <v-layout>

<v-dialog width="500" v-model="show">
      <v-btn slot="activator" icon><v-icon>add</v-icon></v-btn>
      <v-card max-width="500px"> 
        <v-toolbar  color="" drak>
          <v-toolbar-title color= drak> <v-icon>create_new_folder</v-icon><content v-if="taskId == null"> Create Task</content>
                                                                          <content v-else>Create Subtask</content>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
              <v-form>
              
                <v-text-field 
                prepend-icon="layers"
                v-model="input.name"
                :rules="[rules.required]"
                label="Task Name" 
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
                   <v-text-field 
                prepend-icon="comment"
                v-model="input.estimatedCost"
                label="Estimate Cost" 
                type="text"
                >
             </v-text-field>
                   <v-text-field 
                prepend-icon="comment"
                v-model="input.priority"
                label="Priority" 
                type="text"
                >
             </v-text-field> 
                   <!-- <v-text-field 
                prepend-icon="comment"
                v-model="input.description"
                label="Description" 
                type="text"
                >
             </v-text-field> --> 

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
import TaskService from '@/services/taskService'
import ProjectService from '@/services/projectService'


export default {
  props:['taskId'],
  data() {
    return {
      project:{},
      show: false,
      parent: null, 
      input: {
        name: '',
        description: '',
        estimatedCost:null,
        priority:null,
        projectId: null,
        parentId:null
      },
      rules: {
        required: value => !!value || "Required."   
      }
    };
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
          if (this.taskId != null) {
              this.input.parentId = this.taskId
          }
            this.input.projectId = this.project.id
          
            await TaskService.create(this.input)
            this.show = false
            this.input.name = ''
            this.input.description = ''
            this.input.estimatedCost=null
            this.input.priority=null
            
        }
      } catch (error) {
          //console.log(error)
           //this.error = error.response.data.error
           this.error = error
          }
    }
  },
    async mounted() {
         const id = this.$store.state.route.params.id
         this.project = (await ProjectService.findOne(id)).data
    },
};
</script>

<style scoped>
small:hover {
  color: #AAA !important
}
</style>
