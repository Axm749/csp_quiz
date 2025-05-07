<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        text
      >
        <span class="mr-2">Сменить тему</span>
        <v-icon v-if="!$vuetify.theme.dark">mdi-moon-new</v-icon>
        <v-icon v-if="$vuetify.theme.dark">mdi-moon-full</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
