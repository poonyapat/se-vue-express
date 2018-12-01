<template>
  <v-layout>
    <v-dialog width="500" v-model="show">
      <v-btn round slot="activator">
        <v-icon>add</v-icon>
        new
      </v-btn>
      <v-card max-width="500px">
        <v-toolbar dark>
          <v-toolbar-title>
            <v-icon>create_new_folder</v-icon>
            Create Project
          </v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-text-field prepend-icon="layers" v-model="input.name" :rules="[rules.required]" label="Project Name" type="text">
          </v-text-field>
          <v-text-field prepend-icon="comment" v-model="input.description" label="Description" type="text">
          </v-text-field>
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
  import ProjectService from "@/services/projectService";
  import {  mapState
} from "vuex";

  export default {
    data() {
      return {
        show: false,
        input: {
          name: "",
          description: "",
          members: [],
        },
        rules: {
          required: value => !!value || "Required."
        }
      };
    },

    computed: {
      ...mapState(["username"])
    },

    methods: {
      async create() {
        try {
          for (let key in this.rules) {
            if (this.rules[key] === true) {
              if (key == "required") {
                this.error = "require data";
              } else {
                this.error = this.rules[key];
              }
            }
          }
          if (this.input.name != "") {
            this.input.username = this.username;
            await ProjectService.create(this.input);
            this.$emit("refresh");
            this.show = false;
            this.input.name = "";
            this.input.description = "";
          }
        } catch (error) {
          this.error = error.response.data.error;
        }
      }
    }
  };
</script>

<style scoped>
  small:hover {
    color: #aaa !important;
  }
</style>
