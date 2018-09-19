<template>
<div>
    <v-navigation-drawer
        v-model="drawer"
       clipped
        fixed
       app
       class="black"
       dark
    >
      <v-list dense>
        <v-list-tile @click="0">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="0">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left class="black" dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link class="title pr-4" tag="span" :to="{name: 'home'}">
          <v-toolbar-title>
              <v-icon class="hidden-sm-and-down">home</v-icon>
              Panut Team
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <login>
                <v-btn v-if="!isUserLoggedIn" flat>Login</v-btn>
            </login>
            <sign-up>
                <v-btn v-if="!isUserLoggedIn" flat>Sign up </v-btn>
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
    drawer: true
  }),
  components: {
      Login, SignUp
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
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
