<template>
    <div>     
  <v-data-table
    :headers="headers"
    :items="project.members"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item}}</td>
     
    </template>
  </v-data-table>
        <v-form>
            <v-container>
                <v-layout row wrap>
                    <v-text-field solo  v-model="input.user" label="Add user" type ="text" clearable></v-text-field>
                    <v-btn @click="add()">
                            <v-icon>person_add</v-icon>
                    </v-btn>
                </v-layout>
            </v-container>
        </v-form>
        
    </div>
</template>

<script>
    import ProjectService from '@/services/projectService'
    export default {
        data() {
            return {
                project: {}, 
                headers: [{
                        text: 'Username',
                        align: 'center',
                        sortable: false,
                        value: 'name'
                    },
                      { text: 'Position',
                        align: 'center', value: 'description' },
                ],
                input:{
                    user:'',
                    projectId: null,
                }


            }
        },
   
        async mounted() {
            const id = this.$store.state.route.params.id
            this.project = (await ProjectService.findOne(id)).data
            this.input.projectId = this.project.id
        },
        methods : {
            async add(){
                        try{                       
                            if(this.input.user != ''){
                                this.input.projectId = this.project.id;
                                await ProjectService.addMember(this.input); 
                                this.input.user = '';
                            }
                        } catch (error) {
                            this.error = error;
                            }
            },
          
        }
    }
</script>

<style>

</style>