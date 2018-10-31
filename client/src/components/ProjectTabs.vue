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
              {{ item }}
            </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

 import ProjectService from '@/services/projectService'
export default {
    data() {
        return {
            project: {},
            id:'',
            items: [
                 'Task', 'Member', 'Issue', '...'
            ],           
         }
    },
    

    async mounted() {
         const id = this.$store.state.route.params.id
         console.log(id)
         this.project = (await ProjectService.findOne(id)).data
    },
}
</script>

<style>

</style>
