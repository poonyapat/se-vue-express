<template>
<v-list>

  <v-data-table
    
    :headers="headers" 
    :items="tasks"
    hide-actions
    item-key="name">
    <template slot="items" slot-scope="props">     
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.description }}</td>
        <td class="text-xs-center">{{ props.item.createdAt }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">{{ props.item.estimatedCost }}</td>
        <td class="text-xs-center">{{ props.item.priority }}</td>
        <td>
          <task-creator :taskId="props.item.id">
          </task-creator>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props"  >
    </template>
  </v-data-table>
  

   <task-creator>
   </task-creator> 
</v-list>

</template>

<script>
import TaskCreator from '@/components/TaskCreator'
import ProjectService from '@/services/projectService'
import TaskService from '@/services/taskService'
  export default {
    components :{
        TaskCreator
    },
    
  
    data () {
      return {
        project: {},
        tasks:{},
        headers: [
          {
            text: 'Tasks',
            sortable: false,
            value: 'name'
          },
          { text: 'Description', value: 'description' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' },
          { text: 'Estimate Cost',value: 'estimatedCost' },
          { text: 'Priority', value: 'priority' },
          { text: 'Actions'}
        ],
       
      }
    },
    async mounted() {
         const id = this.$store.state.route.params.id
   
         this.project = (await ProjectService.findOne(id)).data
         this.tasks =  (await TaskService.findAll({
           projectId: this.project.id,      
        })).data  

      

      
    },
    method :{
     
    }
  }
</script>