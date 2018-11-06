<template>
  <v-container class="primary" fill-height>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>{{ project.name }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
          {{ project.description }} 
       
          </v-card-text>
        </v-card>
        <v-tabs
            class="mt-2"
            slot="extension"
            v-model="tab"
            dark
            grow
          >
            <!-- <v-tabs-slider color="dark"></v-tabs-slider> -->
            <v-tab
              v-for="item in items"
              :key="item"
            >
              <v-icon large> {{ item.icon }} </v-icon>
              {{ item.name }}
       
            </v-tab>

              <v-tabs-items 
              :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'mx-5': $vuetify.breakpoint.mdAndUp}">
              <v-tab-item
                  v-for="item in items"
                  :id="'tab-' + item.name"
                  :key="item.name"
              >
                  <component :is="item.component"/>
              </v-tab-item> 
        </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

 import ProjectService from '@/services/projectService'
 import Task from '@/components/project/Task'
 import MemberTable from '@/components/project/MemberTable'
 import IssueTable from '@/components/project/IssueTable'
 
export default {
    data() {
        return {
            project: {},
            id:'',
            items: [
                {name:'Task', icon: 'assignment',component :'Task'},
                {name:'Member', icon:'group',component:'MemberTable'},
                {name:'Issue',icon:'warning',component:'IssueTable'},
                {name:'...',icon:'',component:''}
            ],           
         }
    },
     components: {
        Task, MemberTable, IssueTable
    },

    async mounted() {
         const id = this.$store.state.route.params.id
         this.project = (await ProjectService.findOne(id)).data
    },
}
</script>

<style>

</style>
