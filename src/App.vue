<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
      <v-btn class="d-flex align-center"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark" 
          icon>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-dialog 
        transition="slide-x-transition"  
        max-height="80%" 
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              icon
            >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <v-toolbar
          dark
          color="primary"
        >
          
          <v-toolbar-title>О странице</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <creditsCard/>
      </v-dialog>


      <!-- <v-btn class="d-flex align-center"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark" 
          icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn> -->
      
      <!-- <v-btn
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        text
      >
        <span class="mr-2">Изменить тему</span>
        <v-icon v-if="!$vuetify.theme.dark">mdi-theme-light-dark</v-icon>
        <v-icon v-if="$vuetify.theme.dark">mdi-theme-light-dark</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import creditsCard from './components/creditsCard.vue'
export default {
  name: 'App',
  components:{
    creditsCard
  },

  data: () => ({
    //
    dialog: false
  }),
};
</script>
