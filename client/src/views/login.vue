<template>
  <div id="app">
  <v-app id="app">
    <v-content>
      <v-container fixed >
        <v-layout row wrap="false" align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card max-width="500">
              <v-toolbar  color="" drak>
                <v-toolbar-title color= drak> <v-icon>favorite</v-icon> login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock"          v-model="password"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                         :rules="[rules.required, rules.min]"
                         :type="show1 ? 'text' : 'password'"
                         name="input-10-1"
                         label="Normal with hint text"
                         hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-5">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>

</template>

<script>
export default {
 data(){
   return{
      show1: false,
      password: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        }

   }
 }
}
</script>

