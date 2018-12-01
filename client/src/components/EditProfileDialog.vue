<template>
     <v-layout>
        
        <v-dialog width="500" v-model="show">          
             <v-btn flat icon  slot="activator">
                  <v-icon>edit</v-icon>
             </v-btn>
            
            <v-card max-width="500px">
                <v-toolbar dark>
                    <v-toolbar-title>
                        <v-icon>person</v-icon>
                        Edit Profile
                    </v-toolbar-title>
                </v-toolbar>
                  <v-card-text>
                <v-form>
                    <!-- upload pic -->
                    <v-text-field prepend-icon="phone" v-model="input.phone"  :rules="[rules.phoneNumber]"  label="Phone number"  type="text">
                    </v-text-field>
                    <v-text-field prepend-icon="email" v-model="input.email"  :rules="[rules.emailMatch]"  label="E-mail" type="text">
                    </v-text-field>
                </v-form>
            </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="update()">Update</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout> 
</template>

<script>
import UserService from '@/services/userService'
import { mapState } from "vuex";
    export default {
       data() {
           return {
               show: false,
               input : {
                   phone: "",
                   email: ""
               },
               rules: {
                    phoneNumber: v => !!v.match('[0-9]{10,12}') || 'Invalid phone number',
                    emailMatch: v => !!v.match('[^@.]+@.{2,}[.].{2,}') || 'Invalid e-mail'
               },
           }
       },
        
        computed: {
        ...mapState(["username"])
        },
       methods: {
           async update(){
            try{
                console.log("in update")
                await UserService.update(this.username,this.input)
                this.$emit("refresh");
                this.input.phone =null;
                this.input.email=null;
                console.log("in update below")
                this.show = false; 
            }catch(error){
                this.error = error
            }
           }
       }

    }
</script>

<style>

</style>