<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
      
      

      <v-dialog 
        transition="slide-y-transition"  
        max-height="80%" 
        v-model="dialog_credits"
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
            @click="dialog_credits = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <creditsCard/>
      </v-dialog>


      <v-spacer></v-spacer>

      <v-btn class="d-flex align-center"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark" 
          icon>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>



      <v-dialog 
        transition="slide-y-transition"  
        max-height="80%" 
        v-model="dialog_options"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              icon
            >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        
        <!-- <v-card> -->
          <v-toolbar
            dark
            color="primary"
          >
            
            <v-toolbar-title>Настройка темы</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              dark
              @click="dialog_options = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
            <themePicker class="mt-3"/>
            
            
          
          
        <!-- </v-card> -->
        
        
      </v-dialog>


      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer padless>
        <v-card flat tile color="primary" width="100%">
          <v-divider></v-divider>

          <v-card-text class="white--text text-center">
            РУТ (МИИТ) 2025 &copy;
          </v-card-text>
        </v-card>
      </v-footer>
  </v-app>
</template>

<script>
import creditsCard from './components/creditsCard.vue'
import themePicker from './components/themePicker.vue';

export default {
  name: 'App',
  components:{
    creditsCard,
    themePicker
  },

  data: () => ({
    //
    dialog_credits: false,
    dialog_options: false
  }),
};
</script>

