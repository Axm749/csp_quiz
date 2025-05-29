<template>
  <div class="app mb-3">
    <!-- <div class="debug" v-if="debug">
      <v-row>
        <v-col>
          <p> 
            authorizing:
            {{ authorizing }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            g:
            {{ group }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            un:
            {{ user_name }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            us:
            {{ user_surname }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            od:
            {{ optional_digit }}
          </p>
        </v-col>

      </v-row>
    </div> -->
    <v-container v-if="authorizing">
      <v-card class="auth" elevation="10">
        <v-img
          height="80px"
          :src="get_img(!$vuetify.theme.dark)"
          v-if="images"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              {{ name }}
            </v-toolbar-title>
          </v-app-bar>
        </v-img>
        <v-app-bar
            flat
            color="primary"
            v-if="!images"
            height="80px"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              {{ name }}
            </v-toolbar-title>
          </v-app-bar>
        <v-card-text class="text-justify">
          <p v-for="(obj, index) in description" :key="index+1">
            {{ obj }} 
          </p>
          
          <v-col class="mt-5">
            <v-row>
              <v-text-field
                v-model="group"
                label="Группа"
                outlined
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="user_name"
                label="Имя"
                outlined
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="user_surname"
                label="Фамилия"
                outlined
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="optional_digit"
                label="Число вопросов в варианте"
                outlined
                :disabled="!debug"
              />
            </v-row>
            <v-row>
              <v-slider
                v-model="timer"
                :label="`время: ${timer} минут`"
                min="1"
                max="9"
                ticks="always"
                tick-size="5"
                :disabled="!debug"
              />
            </v-row>
            <v-row>
              <v-btn
                v-if="!!group && !!user_name && !!user_surname && optional_digit>=1"
                @click="start()"
                block
                color="primary"
              >
                Начать тестирование
              </v-btn>

              <v-btn
                v-if="!(!!group && !!user_name && !!user_surname && optional_digit>=1)"
                disabled
                block
              >
                Начать тестирование
              </v-btn>
            </v-row>
          </v-col> 

        </v-card-text>
      </v-card>
    </v-container>

    <!-- <div class="revoke px-3 pt-3" v-if="(!authorizing) && debug">
      <v-row>
        <v-col>
          <v-btn
          @click="authorizing=true"
          block
          color="primary"
          >
            отменить тестирование
          </v-btn>
        </v-col>
      </v-row>
    </div> -->
    <main_quiz
        v-if="!authorizing"
        :user="{
          'group':group,
          'user_name':user_name,
          'user_surname':user_surname,
          'optional_digit':optional_digit,
          'timer': timer
        }"
        :debug="debug"
        :images="images"
      />
  </div>
  
  
</template>

<script>
  import main_quiz from '../components/main_quiz';
  import info from '../data/info.js';

  export default {
    name: 'ParentQuiz',

    components: {
      main_quiz,
    },
    props: {
      debug: Boolean,
      images: Boolean
    },
    data: () => ({
      name: info.name,
      description: info.description,
      authorizing: true,
      // debug: false,
      group: 'ТСТ-442',
      user_name: 'Тестовый',
      user_surname: 'Вариант',
      optional_digit: 50,
      timer: 5
    }),
    methods:{
      start(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        this.authorizing = false
      },

      get_img(input){
        if(input){
          return 'https://i.pinimg.com/originals/ea/94/f1/ea94f17cce722d9bc1b8643a0277da66.jpg'
        } else return 'https://cdn.culture.ru/images/56e7c169-0ced-5fa8-8764-860334000db0'
      },

    }
  }
</script>
<style>
.debug{
  color: grey;
  max-height: 25px;

  overflow: hidden;
}
</style>
