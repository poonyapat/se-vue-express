<template>
  <v-dialog width="500" v-model="show">
    <slot slot="activator"/>
      <v-card max-width="500">
        <v-toolbar  color="" drak>
          <v-toolbar-title color= drak> <v-icon>person</v-icon> login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="pb-0">
          <!-- scope ช่วง  input -->
          <v-form>
            <v-text-field 
                prepend-icon="person"
                v-model="username"
                :rules="[rules.required]"
                label="Username" 
                type="text"
                >
                </v-text-field>
            <v-text-field 
                prepend-icon="lock"          
                v-model="password"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                @click:append="showPassword = !showPassword">
                </v-text-field>
              <p>{{error}}</p>
          </v-form>
     <!-- scope ช้วง  input -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn @click="login()" round>Login</v-btn>
            <sign-up class="my-2">
              <!-- <v-btn flat><small>sign up</small> </v-btn> -->
              <small>Sign Up</small>
            </sign-up>
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card> 
  </v-dialog>

</template>

<script>
import SignUp from '@/components/SignUp'
import { mapActions } from "vuex";
import UserService from '@/services/userService'
export default {
  data() {
    return {
      show: false,
      showPassword: false,
      username: "",
      password: "",
      error: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },
  components: {
    SignUp
  },
  watch: {
    show(val){
      if (!val){
        this.username = ""
        this.password = ""
      }
    }
  },
  methods: {
    async login() {
      try {
        this.error = null;
        const response = await UserService.authenticate({
          username: this.username,
          password: this.password
        })
        this.persistedLogin(response.data)
        this.username = ''
        this.password = ''
        this.show = false
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    ...mapActions(["persistedLogin"])
  },
};
</script>

<style scoped>
small:hover {
  color: #AAA !important
}
</style>
