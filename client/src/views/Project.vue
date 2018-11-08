<template>
  <v-container class="secondary" fill-height fluid>
    <v-layout row wrap>
      <v-flex>
        <div class="text-xs-left white--text ma-2">
          <h1> {{project.name}} </h1>
          <p> {{project.description}} </p>
        </div>
        <v-tabs
            class="mt-2"
            slot="extension"
            v-model="tab"
            dark
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item.name"
            >
              <v-icon large> {{ item.icon }} </v-icon>
              {{ item.name }}
       
            </v-tab>

            <v-tabs-items>
              <v-tab-item
                  v-for="item in items"
                  :id="'tab-' + item.name"
                  :key="item.name"
              >
                <v-container class="secondary" fluid>
                  <component :is="item.component" v-bind="properties[item.name]"/>
                </v-container>
              </v-tab-item> 
            </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

 import ProjectService from '@/services/projectService'
 import TaskTable from '@/components/project/TaskTab'
 import MemberTable from '@/components/project/MemberTable'
 import IssueTable from '@/components/project/IssueTable'
 
export default {
    data() {
        return {
            project: {},
            id:'',
            items: [
                {name:'Task', icon: 'assignment',component :'TaskTable'},
                {name:'Member', icon:'group',component:'MemberTable'},
                {name:'Issue',icon:'warning',component:'IssueTable'},
                {name:'...',icon:'',component:''}
            ],  
            tab: null
         }
    },
    computed: {
      properties: function(){
        return {
          'Task': {project: this.project}
        }
      }
    },
    components: {
      TaskTable, MemberTable, IssueTable
    },
    async mounted() {
      const id = this.$store.state.route.params.id
      this.project = (await ProjectService.findOne(id)).data
    },
}
</script>

<style>

</style>
