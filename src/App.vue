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
        <creditsCard 
          :debug="debug"
          :images="images"
        />
      </v-dialog>
      
      <v-spacer/>

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
      
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>Настройки</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="dialog_options = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
          <optionsPanel 
          class="mt-3" 
          :debug="debug"
          :images="images"
          @update="update"
          />    
      </v-dialog>
    </v-app-bar>

    <v-main>
      <ParentQuiz 
        :images="images" 
        :debug="debug"
        :showAnswers="showAnswers"
      />
    </v-main>
    
    <v-footer padless>
        <v-card flat tile color="primary" width="100%">
          <v-divider></v-divider>

          <v-card-text class="white--text text-center">
            РУТ (МИИТ) 2025
          </v-card-text>
        </v-card>
      </v-footer>
  </v-app>
</template>

<script>
import creditsCard from './components/creditsCard.vue'
import optionsPanel from './components/optionsPanel.vue';
import ParentQuiz from './components/parentQuiz.vue'

export default {
  name: 'App',
  components:{
    creditsCard,
    optionsPanel,
    ParentQuiz
  },

  data: () => ({
    debug: false,
    showAnswers: false,
    dialog_credits: false,
    dialog_options: false,
    images: true
  }),
  methods:{
    /**
     * 
     * @param varName - название изменяемой переменной
     * @param input   - значение, которое переменная должна принять
     */
    update(varName, input){this[`${varName}`] = input},

  }
};
</script>

