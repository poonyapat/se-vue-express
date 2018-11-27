<template>
  <div class="text-xs-center" v-if="!loaded">
    <v-progress-circular :size="200" :width="7" color="cyan lighten-1" indeterminate></v-progress-circular>
  </div>
  <v-container class="secondary" fill-height fluid v-else-if="validation">
    <v-layout row wrap justify-center>
      <v-flex v-if="loaded">
        <div class="text-xs-left white--text ma-2">
          <h1> {{project.name}} </h1>
          <p> {{project.description}} </p>
        </div>
        <v-tabs class="mt-2" slot="extension" v-model="tab" dark grow icons-and-text show-arrows>
          <v-tab v-for="item in items" :key="item.name" class="secondary darken-1">
            {{ item.name }}
            <v-icon large> {{ item.icon }} </v-icon>
          </v-tab>
          <v-tabs-items>
            <v-tab-item v-for="item in items" :id="'tab-' + item.name" :key="item.name">
              <v-container class="secondary darken-1" fluid>
                <component :is="item.component" v-bind="properties[item.name]" />
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
  <div v-else>
    <h1> Acces Denied </h1>
  </div>
</template>

<script>
  import ProjectService from '@/services/projectService'
  import TaskTab from '@/components/project/TaskTab'
  import DataAnalysisTab from '@/components/project/DataAnalysisTab'
  import GeneralInformationTab from '@/components/project/GeneralInformationTab'
  import MemberTable from '@/components/project/MemberTable'
  import IssueTable from '@/components/project/IssueTable'
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        loaded: false,
        validation: false,
        project: {},
        id: '',
        items: [{
            name: 'Info',
            icon: 'info',
            component: 'GeneralInformationTab'
          }, {
            name: 'Task',
            icon: 'assignment',
            component: 'TaskTab'
          },
          {
            name: 'Member',
            icon: 'group',
            component: 'MemberTable'
          },
          {
            name: 'Issue',
            icon: 'warning',
            component: 'IssueTable'
          },
          {
            name: 'Data Analyze',
            icon: 'bar_chart',
            component: 'DataAnalysisTab'
          }
        ],
        tab: null
      }
    },
    computed: {
      ...mapState(['username', 'route']),
      properties: function () {
        return {
          'Info': {
            project: this.project
          },
          'Task': {
            project: this.project
          },
          'Member': {
            reload: this.reload,
            project: this.project
          }
        }
      }
    },
    components: {
      GeneralInformationTab,
      TaskTab,
      MemberTable,
      IssueTable,
      DataAnalysisTab
    },
    async mounted() {
      this.loaded = false
      this.reload()
      this.validation = (await ProjectService.hasPermission(this.route.params.id, this.username)).data.validation
      this.loaded = true
    },
    methods: {
      async reload() {
        const id = this.route.params.id
        this.project = (await ProjectService.findOne(id)).data
      }
    },
  }
</script>

<style>

</style>