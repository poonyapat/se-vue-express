<template>
<div>
    {{project}}
 {{project.id}}
    <AddMember :projId="project.id">
      
        <!-- <v-btn slot="activator" round large><v-icon>add</v-icon>new member</v-btn> -->
    </AddMember>
</div>
    <!-- <v-data-table
         :headers="headers" 
         :items="project"
         hide-actions
         item-key="name">
            <template slot="items" slot-scope="props">     
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.position }}</td>
              
                    <td>
                        <create :taskId="props.item.id">
                        </create>
                    </td>
                </tr>
            </template>
  </v-data-table> -->
  
</template>

<script>
import AddMember from '@/components/AddMember'
import ProjectService from '@/services/projectService'
export default {
    data(){
        return{
            project: {},
            projId:null,
            headers: [
            {
                text: '๊Username',
                align: 'center',
                sortable: false,
                value: 'name'
            },
            //   { text: 'Position',
            //     align: 'center', value: 'description' },

            ],
         
        }
    },
    components:{
        AddMember
    },
    async mounted(){
        const id = this.$store.state.route.params.id
        this.project = (await ProjectService.findOne(id)).data
    }
}
</script>

<style>

</style>
