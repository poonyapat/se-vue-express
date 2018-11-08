<template>
<v-list>

  <v-data-table
    
    :headers="headers" 
    :items="tasks"
    hide-actions
    item-key="name">
    <template slot="items" slot-scope="props">     
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.description }}</td>
        <td class="text-xs-center">{{ props.item.createdAt }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">{{ props.item.estimatedCost }}</td>
        <td class="text-xs-center">{{ props.item.priority }}</td>
        <td>
          <create :taskId="props.item.id">
          </create>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props"  >
    </template>
  </v-data-table>
  

   <create>
          <content center>     
                <v-btn slot="activator" round large><v-icon>add</v-icon>new</v-btn>
           </content> 
    </create> 
</v-list>

</template>

<script>
import Create from '@/components/CreateTask'
import ProjectService from '@/services/projectService'
import TaskService from '@/services/taskService'
  export default {
    components :{
        Create
    },
    
  
    data () {
      return {
        project: {},
        tasks:{},
      
        id:'',
        taskId:null,
        headers: [
          {
            text: 'Tasks',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Description',
            align: 'center', value: 'description' },
          { text: 'Date',
            align: 'center', value: 'createdAt' },
          { text: 'Status', 
            align: 'center',value: 'status' },
          { text: 'Estimate Cost',
            align: 'center', value: 'estimatedCost' },
          { text: 'Priority', 
            align: 'center',value: 'priority' },
          { text: 'Actions',
            align: 'center'}
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
  
  }
</script>