<template>
  <v-app id="app">
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
    <v-toolbar-title>logo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'home'}">Home</v-btn>
      <v-btn flat :to="{name: 'login'}">Login</v-btn>
      <v-btn flat :to="{name: 'signup'}">Sign up </v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <router-view/>
  </v-app>

</template>
<script>
  export default {
    data: () => ({
      drawer: true
    }),
    props: {
      source: String
    },
    color: '#424242'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#424242;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
