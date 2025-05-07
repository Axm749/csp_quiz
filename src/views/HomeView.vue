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
        <v-row>
          <v-col>
            <v-text-field
              v-model="group"
              label="Группа"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="user_name"
              label="Имя"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="user_surname"
              label="Фамилия"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="optional_digit"
              label="Вариант (опционально)"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-btn
          v-if="!!group && !!user_name && !!user_surname"
          @click="authorizing=false"
          >
            Начать тестирование
          </v-btn>

          <v-btn
          v-if="!(!!group && !!user_name && !!user_surname)"
          @click="authorizing=false"
          disabled
          >
            Начать тестирование
          </v-btn>

          <v-spacer/>
        </v-row>
      </div>
      <div class="revoke" v-if="!authorizing">
        <v-row>
          <v-spacer/>
          <v-col>
            <v-btn
            @click="authorizing=true"
            >
              отменить тестирование
            </v-btn>
          </v-col>
          
          <v-spacer/>
        </v-row>
      </div>
      

      <main_quiz
        v-if="!authorizing"
        :user="{
          'group':group,
          'user_name':user_name,
          'user_surname':user_surname,
          'optional_digit':optional_digit
        }"
      />
    </v-container>
    
    
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
      user_name: 'Михайлов',
      user_surname: 'Александр',
      optional_digit: 10
    }),
  }
</script>
<style>
.debug{
  color: grey;
  max-height: 25px;

  overflow: hidden;
}
</style>
