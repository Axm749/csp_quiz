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
      <div class="auth" v-if="authorizing">
          
        <v-col>

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
        </v-col>
        
          
        
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
        
      </div>
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
      debug:true,
      group: 'ТСТ-442',
      user_name: 'Александр',
      user_surname: 'Михайлов',
      optional_digit: 10
    })
  }
</script>
<style>
.debug{
  color: grey;
  max-height: 25px;

  overflow: hidden;
}
</style>
