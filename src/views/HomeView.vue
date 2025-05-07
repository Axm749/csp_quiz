<template>
  <div class="app">
    <div class="debug" v-if="debug">
      <v-row>

        <v-col>
          <v-btn
          @click="debug=false"
          x-small block tile text
          >hide_debug</v-btn>
        </v-col>
        <v-divider vertical/>
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
    </div>
    <v-container>
      <v-card class="auth" v-if="authorizing">
        <v-img
          height="100px"
          :src="get_img(!$vuetify.theme.dark)"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              Викторина
            </v-toolbar-title>
          </v-app-bar>
        </v-img>
        <v-card-text>
          <p>
            Вам будут представлены вопросы по 
            пройденным на 3 и 4 курсах темах цифровых систем передачи. 
            Всё, что было в зачетах предыдущих семестров и среди вопросов на грядущий экзамен.
            Перед тем как перейти к вопросам, настоятельно рекомендуется ввести данные участника.
            Количество вопросов регулируется организаторами или преподавателем.
          </p>
          <p>Оценка по доле верных ответов:</p>
          <ul>
            <li>0-40% - незачет</li>
            <li>40-60% - зачтено</li>
            <li>60-85% - хорошо</li>
            <li>85-100% - отлично</li>
          </ul>
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
              />
            </v-row>
            <v-row>
              <v-btn
                v-if="!!group && !!user_name && !!user_surname && optional_digit>=1"
                @click="authorizing=false"
                block
                color="primary"
              >
                Начать тестирование
              </v-btn>

              <v-btn
                v-if="!(!!group && !!user_name && !!user_surname && optional_digit>=1)"
                @click="authorizing=false"
                disabled
                block
              >
                Начать тестирование
              </v-btn>
            </v-row>
          </v-col> 

        </v-card-text>
          
        
        
          
        
       
        
      </v-card>
      <!-- <div class="revoke" v-if="!authorizing">
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
      

      
    </v-container>
    <main_quiz
        v-if="!authorizing"
        :user="{
          'group':group,
          'user_name':user_name,
          'user_surname':user_surname,
          'optional_digit':optional_digit
        }"
      />
  </div>
  
  
</template>

<script>
  import main_quiz from '../components/main_quiz'

  export default {
    name: 'Home',

    components: {
      main_quiz,
    },
    data: () => ({
      authorizing: true,
      debug: false,
      group: 'ТСТ-442',
      user_name: 'Тестовый',
      user_surname: 'Вариант',
      optional_digit: 10
    }),
    methods:{
      get_img(input){
        if(input){
          return 'https://i.pinimg.com/originals/ea/94/f1/ea94f17cce722d9bc1b8643a0277da66.jpg'
        } else return 'https://cdn.culture.ru/images/56e7c169-0ced-5fa8-8764-860334000db0'
      }
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
