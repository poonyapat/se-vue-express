<template>
<div>
   

<v-toolbar >
     
      <v-toolbar-title>{{ project.name }}</v-toolbar-title>
       <br/> <br/>{{ project.description }}  <!-- รอแก้!!!! -->
   
      <v-spacer></v-spacer>

      <v-tabs
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
    </v-toolbar>
</div>
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
