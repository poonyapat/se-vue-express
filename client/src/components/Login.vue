<template>
  <v-dialog width="500">
    <slot slot="activator"/>
      <v-card max-width="500">
        <v-toolbar  color="" drak>
          <v-toolbar-title color= drak> <v-icon>favorite</v-icon> login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field 
                prepend-icon="person"
                v-model="username"
                label="Login" 
                type="text"
                >
                </v-text-field>
            <v-text-field 
                prepend-icon="lock"          
                v-model="password"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                label="Normal with hint text"
                hint="At least 8 characters"
                counter
                @click:append="show = !show">
                </v-text-field>
              <p>{{error}}</p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

</template>

<script>
import { mapActions } from "vuex";
import UserService from '@/services/userService'
export default {
  data() {
    return {
      show: false,
      username: "",
      password: "",
      error: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },
  methods: {
    async login() {
      try {
        this.error = null;
        const response = await UserService.authenticate({
          username: this.username,
          password: this.password
        });
        this.persistedLogin(response.data);
        this.username = null;
        this.password = null;
        this.show = false;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    ...mapActions(["persistedLogin", "setAttendees"])
  },
};
</script>

