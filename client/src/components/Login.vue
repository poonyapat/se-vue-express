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
          <v-btn>Login</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

</template>

<script>
export default {
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  }
};
</script>

