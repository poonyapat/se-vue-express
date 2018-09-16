<template>
  <div id="app" >
  <v-app id="app">
    <v-content>
      <v-container fixed >
        <v-layout row wrap="false" align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card max-width="500">
              <v-toolbar drak>
                <v-toolbar-title color= drak> <v-icon>favorite</v-icon>Sign up</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="Username" label="Username" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                  <v-text-field prepend-icon="lock" name="Re-password" label="Re-Password" id="Re-password" type="password"></v-text-field>
                  <v-text-field prepend-icon="mail" name="e-mail" label="E-mail" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="address" label="Address" type="text"></v-text-field>
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
      password: 'Password',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }

   }
 }
}
</script>

