<template>
<div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      class="primary hidden-md-and-up"
      temporary
      dark
    >
      <v-list>
        <v-list-tile @click="navigateTo({name:'home'})" >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{!isUserLoggedIn?  'Panut Team': username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <login v-if="!isUserLoggedIn">
          <v-list-tile @click="0">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </login>
        <sign-up v-if="!isUserLoggedIn">
          <v-list-tile @click="0">
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign Up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </sign-up>
        <v-list-tile @click="0">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isUserLoggedIn" @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
        <router-link class="title pr-4" tag="span" :to="{name: 'home'}">
          <v-toolbar-title>
              <v-icon class="hidden-sm-and-down">home</v-icon>
              {{!isUserLoggedIn?  'Panut Team': username}}
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <login v-if="!isUserLoggedIn">
                <v-btn flat>Login</v-btn>
            </login>
            <sign-up v-if="!isUserLoggedIn">
                <v-btn flat>Sign up </v-btn>
            </sign-up>
            <v-btn v-if="isUserLoggedIn" @click="logout()" flat>Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</div>
</template>

<script>
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import {mapState, mapActions} from 'vuex'
export default {
  data: () => ({
    drawer: false
  }),
  components: {
      Login, SignUp
  },
  computed: {
    ...mapState([
      'isUserLoggedIn', 'username'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    navigateTo(destination){
      this.$router.push(destination)
    }
  },
};
</script>

<style>
.title {
  cursor: pointer;
}
.title:hover {
  color: rgb(167, 167, 167);
}
.title:hover .v-icon {
  color: rgb(167, 167, 167);
}
</style>
