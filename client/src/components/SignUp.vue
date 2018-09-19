<template>
<v-dialog width="500" v-model="show">
  <slot slot="activator"/>
  <v-card max-width="500">
    <v-toolbar dark>
      <v-toolbar-title dark> <v-icon>favorite</v-icon>Sign up</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field :rules="[rules.required, rules.min]" v-model="input.username" prepend-icon="person" label="Username" type="text"></v-text-field>
        <v-text-field :rules="[rules.required, rules.min]" v-model="input.password" prepend-icon="lock" label="Password" type="password"></v-text-field>
        <v-text-field :rules="[rules.required, rules.rePassword]" prepend-icon="lock" label="Re-Password" type="password"></v-text-field>
        <v-text-field :rules="[rules.required, rules.emailMatch]" v-model="input.email" prepend-icon="mail" label="E-mail" type="text"></v-text-field>
        <v-text-field :rules="[rules.required, rules.phoneNumber]" v-model="input.phoneNumber" prepend-icon="phone" label="Phone Number" type="text"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="register()">Login</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script>
import UserService from '@/services/userService'
export default {
 data(){
   return{
      show: false,
      input: {
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        rePassword: v=> v == this.input.password || 're-password is not match',
        phoneNumber: v => !!v.match('[0-9]{10,12}') || 'Invalid phone number',
        emailMatch: v => !!v.match('[^@.]+@.{2,}[.].{2,}') || 'Invalid e-mail'
      }
   }
 },
 methods: {
  async register() {
    try {
        this.error = null
        for (let key in this.rules){
          if (this.rules[key] === true){
            if (key == 'required'){
              this.error = 'require data'
            }
            else {
              this.error = this.rules[key]
            }
          }
        }
        await UserService.register(this.input)
        this.show = false
    } catch (error) {
        this.error = error.response.data.error
    }
  }
},
}
</script>

