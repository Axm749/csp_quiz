<template>
  <v-container>

    <p style="display: none;">just to render {{ jtr }}</p>
    <div class="quiz" v-if="quiz_state">

      <v-card elevation="10">
        <v-img
            height="150px"
            :src="get_img(!$vuetify.theme.dark)"
            v-if="images"
          >
            <v-app-bar
              flat
              color="rgba(0, 0, 0, 0)"
            >
              <v-toolbar-title class="text-h6 white--text pl-0">
                Начали!
              </v-toolbar-title>
            </v-app-bar>
          </v-img>

        <v-app-bar
            flat
            color="primary"
            v-if="!images"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              Начали!
            </v-toolbar-title>
          </v-app-bar>
      </v-card>
      
      <v-card 
        v-for="(obj, index) in questions_final_list.slice(0,user.optional_digit)" :key="index+1"
        class="mt-3"
        elevation="5"
      >
        
      <v-toolbar
        color="secondary"
        dark
        dense
        flat
        class="shaded"
      >
        <v-toolbar-title class="text-body-2 ">
          вопрос №{{ index+1 }}
          
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip elevation="5" v-if="debug" :color="cheated ? 'secondary' : 'primary'">
          [debug] Q={{ obj.id }}, 
          co: {{ questions_ans_list[index]+1 }}, 
          ch: {{ (chosen_ans_list[index]+1)<5 ? (chosen_ans_list[index]+1) : 'none' }}
        </v-chip>
        <v-chip elevation="5" v-if="showAnswers" :color="cheated ? 'secondary' : 'primary'" class="ml-3" @click="cheaterNotification()">
          {{ questions_ans_list[index]+1 }}
          <!-- <div v-if="cheated">пойман!</div> -->
        </v-chip>
        
        
      </v-toolbar>

      <v-card-text>
        {{obj.question}}
      </v-card-text>
      
      <v-card-actions>   
        <v-col>
          <v-row>
            <v-col>
              <v-btn block max-width="100%" elevation="2"
              class="overflow-visible shaded"
              :dark="chosen_ans_list[index]===0"
              :color="chosen_ans_list[index]===0 ? 'answerSelected' : 'passive'"
              @click="check_answer(0, questions_ans_list[index], obj, index)">
                {{ obj.answer[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block max-width="100%" elevation="2"
              class="overflow-visible shaded"
              :dark="chosen_ans_list[index]===1"
              :color="chosen_ans_list[index]===1 ? 'answerSelected' : 'passive'"
              @click="check_answer(1, questions_ans_list[index], obj, index)">
                {{ obj.answer[1] }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block max-width="100%" elevation="2"
              class="overflow-visible shaded"
              :dark="chosen_ans_list[index]===2"
              :color="chosen_ans_list[index]===2 ? 'answerSelected' : 'passive'"
              @click="check_answer(2, questions_ans_list[index], obj, index)">
                {{ obj.answer[2] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block max-width="100%" elevation="2"
              class="overflow-visible shaded"
              :dark="chosen_ans_list[index]===3"
              :color="chosen_ans_list[index]===3 ? 'answerSelected' : 'passive'"
              @click="check_answer(3, questions_ans_list[index], obj, index)">
                {{ obj.answer[3] }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col> 
       
      
      </v-card-actions>

      </v-card>  
    </div>

    <v-footer
      color="rgba(0,0,0,0)"
      fixed
    >
      <v-btn 
        v-if="quiz_state"
        @click="finish_quiz()"
        block
        class="shaded" 
        color="primary"
        elevation="24"
      >завершить (осталось {{ (timerCount/120).toFixed()  }} мин)</v-btn>
    </v-footer>

    <div class="finish" v-if="!quiz_state">
      <v-card 
        class="mt-3"
        v-if="!quiz_state"
      >
        <v-img
          height="100px"
          :src="get_img(!$vuetify.theme.dark)"
          v-if="images"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 white--text pl-0">
              Индивидуальные результаты
            </v-toolbar-title>
          </v-app-bar>
        </v-img>
        
        <v-app-bar
          flat
          color="primary"
          v-if="!images"
        >
          <v-toolbar-title class="text-h6 white--text pl-0">
            Индивидуальные результаты
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text>
          <v-row>
            <v-col>
              <v-simple-table class="text-h6 pl-0">
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>Фамилия:</td>
                      <td>{{ user.user_surname }}</td>
                    </tr>
                    <tr>
                      <td>Имя:</td>
                      <td>{{ user.user_name }}</td>
                    </tr>
                    <tr>
                      <td>Группа:</td>
                      <td>{{ user.group }}</td>
                    </tr>
                    <tr>
                      <td>Осталось времени:</td>
                      <td>{{ printTime((timerCount/2).toFixed()) }}</td>
                    </tr>
                    <tr>
                      <td>верных ответов:</td>
                      <td>{{ correct_count }}/{{user.optional_digit}}</td>
                    </tr>
                    <tr>
                      <td>Итого очков:</td>
                      <td>{{ 
                            getScore(
                              correct_count,  
                              user.optional_digit, 
                              (timerCount/2).toFixed(), 
                              timerMax 
                            ) 
                          }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>

          <v-card color="red" dark class="text-center pa-2" v-if="cheated" @click="cheaterNotification()">
            Результат аннулирован, так как использовались настройки разработчиков
          </v-card>
          
          <v-row>
            <v-col class="text-center my-5">
              <p>Ответов:</p>
              <v-progress-circular
                rotate="270"
                size="100"
                width="15"
                :value="(correct_count/user.optional_digit)*100"
                :color="evaluate_results(correct_count, user.optional_digit)"
              >
                <v-chip>
                  {{ correct_count }}/{{user.optional_digit}}
                </v-chip>
                
              </v-progress-circular>
            </v-col>

            <v-col class="text-center my-5">
              <p>Очков: 
                  {{ 
                    getScore(
                              correct_count,  
                              user.optional_digit, 
                              (timerCount/2).toFixed(), 
                              timerMax 
                            ).split('/')[0]
                  }} / {{ 
                    getScore(
                              correct_count,  
                              user.optional_digit, 
                              (timerCount/2).toFixed(), 
                              timerMax 
                            ).split('/')[1]
                    }}
              </p>
              <v-progress-circular
                rotate="270"
                size="100"
                width="15"
                :value="
                  (
                    getScore(correct_count, user.optional_digit, (timerCount/2).toFixed(), timerMax
                  ).split('/')[0]
                  / getScore(correct_count, user.optional_digit, (timerCount/2).toFixed(), timerMax
                  ).split('/')[1]
                  )*100"
                :color="evaluate_results(correct_count, user.optional_digit)"
              >
              <v-chip>
                <!-- {{ correct_count }}/{{user.optional_digit}} -->
                  {{ getScore(
                              correct_count,  
                              user.optional_digit, 
                              (timerCount/2).toFixed(), 
                              timerMax 
                            )  }}
              </v-chip>
              
                
              </v-progress-circular>
            </v-col>
          </v-row>


          <div v-if="debug">
            <p>Дебагерская таблица для показа выбранных ответов к правильным</p>
            <v-simple-table width="100%">
              <template v-slot:default>
                  <thead>
                    <th>Выбранный вариант</th>
                    <th>Верный варинат</th>
                    <th>совпадает ли выбранный с верным</th>
                  </thead>
                  <tbody>
                    <tr v-for="(obj, index) of chosen_ans_list.slice(0, user.optional_digit)" :key="index+1">
                      <td>
                          {{ chosen_ans_list[index] }}
                      </td>
                      <td>
                          {{ questions_ans_list[index] }}
                      </td>
                      <td>
                          <v-chip
                          :color="chosen_ans_list[index]===questions_ans_list[index] ? 'green' : 'red'"
                          >
                            <v-icon
                              v-if="chosen_ans_list[index]===questions_ans_list[index]"
                            >
                              mdi-check
                            </v-icon>
                            <v-icon
                              v-if="chosen_ans_list[index]!=questions_ans_list[index]"
                            >
                              mdi-close
                            </v-icon>
                          </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
            </v-simple-table>
          </div>          
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import questions from '../data/questions.js';
  export default {
    name: 'main_quiz',
    props:{
      user: Object,
      debug: Boolean,
      showAnswers: Boolean,
      images: Boolean
    },

    data: () => ({
      quiz_state: true,
      cheated: false,
      // debug: true,
      jtr: 0,
      questions_num_list: [],
      questions_ans_list: [],
      full_answers: [],
      chosen_ans_list: [],
      mark: 'Неудовлетворительно',
      current_answers: 0,

      questions_list: questions,
      correct_count: 1,
      quiz_list: [],
      questions_final_list: [],

      timerCount: 10,
      timerEnabled: true,
      timerMax: 10,

    }),
    methods:{
      cheaterNotification(){
        alert('читерить не хорошо')
      },
      get_seed(user){
        var seed = `${user['group']}${user['user_name']}${user['user_surname']}`
        // console.log(seed)
        if (this.showAnswers|| this.debug){
          this.showAnswers = true
        }
        return seed
      },

      cyrb128(str) {
        let h1 = 1779033703, h2 = 3144134277,
            h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
        return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
      },
      // Side note: Only designed & tested for seed generation,
      // may be suboptimal as a general 128-bit hash.
      get_rand(str){
        var arr = this.cyrb128(str)
        // console.log(arr)
        // var max_len_log = this.user.optional_digit
        for(var j=0; j<49; j++){
          for(var i=0; i<4; i++){

            arr.push(this.cyrb128(`${arr[j]}_${i*j}`)[i])
          }
        }
        console.log(arr)
        
        // возвращаю массив из случайных чисел
        return arr
      },
      get_question_answers(r_num_array, range=4){
        var r_num_array_length = r_num_array.length
        var answer = []
        for(var i=0; i<r_num_array_length; i++){
          answer.push(r_num_array[i] % range)
          this.chosen_ans_list.push(5)
        }
        this.questions_ans_list = answer
        return answer
      },

      // получаю номера вопросов, которые будут в варианте
      get_questions(r_num_array){
        // что я делаю:
        // 1) создаю массив номеров доступных вопросов (они по порядку)
        // 2) начинаю цикл, в котором:
        //    2.1) выбирается случайный индекс массива доступных вопросов
        var answer_arr = []
        this.questions_num_list = answer_arr
        // список номеров вопросов
        var options_list = []
        for (var j=0; j<this.questions_list.length;j++){
          options_list.push(j)
        }
        this.quiz_list = options_list
        this.shuffle_arr(options_list, r_num_array)
        this.questions_num_list = options_list
        
        for (var i=0; i<this.questions_num_list.length; i++){
          this.questions_final_list.push(
            this.questions_list[this.questions_num_list[i]]
            )
        }
      },
      // запутывает массив. Использовалось для перемешивания вопросов. 
      // Единственное, не трогаю последний вопрос, который всегда остаётся халявным
      shuffle_arr(array, rand_num_arr){
        // console.log('array',array)

        // иду от последнего элемента и дальше спускаясь к первому, 
        let currentIndex = array.length;
        // Пока есть что перемешивать
        while (currentIndex != 0) {
          // ВЫбрать что-то из не перемешанных
          // var rand_index = rand_num_arr.length - (currentIndex*currentIndex)
          // console.log(rand_index)
          let randomIndex = rand_num_arr[currentIndex] % (array.length-currentIndex+1)
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      },

      // создаёт вопросы-пустышки, которые не имеют реального смысла
      generate_questions_to_list(){
        var i = this.questions_list.length
        var rand_array = this.get_rand(this.get_seed(this.user))
        while(i<(rand_array.length-1))
        {
          this.questions_list.push(
            {
              id: i,
              question: `question №${i}, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              answer: [
                `correct_idea ${i}`,
                `incorrect_1 ${i}`,
                `incorrect_2 ${i}`,
                `incorrect_3 ${i}`
              ],
            }
          )
          i++
        }
      },
      // "переммешать" вопросы, хотя по факту просто меняю местами 
      // правильный ответ и тот, что стоит в нужном слоте...
      // могу ещё сделать шанс того, что будут и другие перемешаны, но чет пока впадлу.
      shuffle_answers(r_num_array){
        // Прохожусь по каждому вопросу с соответствующим значением правильного ответа
        // Изначально правильный ответ всегда в первой ячейке массива
        // Подходя к ячейке меняю местами первую ячейку (индекс ноль) с ячейкой, 
        // на которой будет правильный ответ
        //
        // Далее перемешивается
        // на этом по сути и всё
        for(var i=0; i<this.questions_final_list.length; i++){
          // var current_question = this.questions_final_list[i].answer
          var current_ans_position = this.questions_ans_list[i]
          var available_slots = [0, 1, 2, 3]
          if (current_ans_position != 0){
            this.questions_final_list[i].answer = this.relocateInArray(
              this.questions_final_list[i].answer, 
              0, current_ans_position
            )
            available_slots.splice(current_ans_position, 1)
          }
          available_slots.splice(available_slots[0], 1)
          // console.log( available_slots )
          if ((r_num_array[i]%3)>0){
            this.questions_final_list[i].answer = this.relocateInArray(
              this.questions_final_list[i].answer, 
              available_slots[0], 
              available_slots.at(-1)
            )
            available_slots.splice(available_slots[0], 1)
            if (available_slots.length>1){
              this.questions_final_list[i].answer = this.relocateInArray(
                this.questions_final_list[i].answer, 
                available_slots[0], 
                available_slots.at(-1)
              )
            }
          }

          
        }
      },
      relocateInArray(array, pos1, pos2){
        var temp = array[pos1]
        array[pos1] = array[pos2]
        array[pos2] = temp
        return array
      },


      /**
       * по нажатию кнопки записываем, какой ответ был дан
       * 
       * @param x     - номер выбранного ответа
       * @param y     - номер правильного ответа
       * @param obj   - в каком вопросе оно было вызвано
       * @param index - положение вопроса в списке
       */
      check_answer(x, y, obj, index){
        this.chosen_ans_list[index]=x
        this.jtr++
        // console.log(
        //   this.showAnswers, 
        //   this.debug,
        //   this.cheated
        // )
        if (this.showAnswers || this.debug){
          this.cheated = true
        }
      },

      finish_req(){
        var ans_count = 0
        if (this.showAnswers|| this.debug){
          this.showAnswers = true
        }
        for(var i=0; i<this.user.optional_digit; i++){
          if (this.chosen_ans_list[i] == 5){
            // return false
          } else {ans_count++}
        }
        if (ans_count==this.user.optional_digit){
          // console.log('ans_count==this.user.optional_digit')
          return true
        } else {
          this.current_answers = ans_count
          return false}
        // console.log('no problem, everything was answered')
        // return true
      },
      get_c_a_count(){
        this.finish_req()
        return this.current_answers
      },
      finish_quiz(){
        this.quiz_state=false
        this.timerEnabled = false;
        this.correct_count = 0
        if (this.showAnswers|| this.debug){
          this.showAnswers = true
        }
        for (var i=0; i<this.user.optional_digit; i++){
          if (this.chosen_ans_list[i]==this.questions_ans_list [i]){
            this.correct_count++
            this.jtr++
          }
        }
      },
      
      // функция округляет в лучшую для студента сторону
      // [min, max)
      between(x, min, max){
        return x >= min && x < max
      },
      get_img(input){
        if(input){
          return 'https://i.pinimg.com/originals/ea/94/f1/ea94f17cce722d9bc1b8643a0277da66.jpg'
        } else return 'https://cdn.culture.ru/images/56e7c169-0ced-5fa8-8764-860334000db0'
      },   

      evaluate_results(correct, total){
        const ratio = correct/total,
              correct_color = [0,255,0],
              wrong_color = [255,0,0]
        return this.interpolateColor(wrong_color, correct_color, ratio)
      },

      interpolateColor(color1, color2, factor) {
          var result = color1
          for (var i = 0; i < 3; i++) {
              result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
          }
          return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
      },

      // старая графа оценивания как для теста
      evaluate_results_old(correct, total){
        // 0-40% - плохо
        // 41-60% - троечка
        // 61-85% - четвёрка
        // 85-100% - не, ну ты молодец
        var ratio = correct/total
        const 
            acceptable_mark_req = 0.4,
            good_mark_req = 0.6,
            excelent_mark_req = 0.85

        console.log(ratio, 'correct/total=', correct/total)
        if (this.between(ratio, 0, acceptable_mark_req)){
          console.log('red') 
          this.mark='Неудовлетворительно' 
          return 'red'
        }
        if (this.between(ratio, acceptable_mark_req, good_mark_req)){
          console.log('orange')  
          this.mark='Удовлетворительно'
          return 'orange'
        }
        if (this.between(ratio, good_mark_req, excelent_mark_req)){
          console.log('green')  
          this.mark='Хорошо'
          return 'green'
        }
        console.log('blue') 
        this.mark='Отлично'
        return 'blue'
      },

      printTime(time_sec){
        var hours = Math.floor(time_sec/3600),
          minutes = Math.floor(time_sec/60),
          seconds = (time_sec % 60).toFixed()
        if (hours > 0){
          return `${hours} ч, ${minutes} м, ${seconds} с`
        } else {
          if(minutes > 0){
            return `${minutes} м, ${seconds} с`
          }
        }  
        return `${seconds} с`      
      },


      // final Score value
      getScore(right, total, timeLeftSec, timeMaxSec){

        const timeLeft = Number(timeLeftSec),
              timeMax = timeMaxSec,
              correct = Number(right),
              all = Number(total);
        var score = this.calcScore(correct, all, timeLeft)
        var maxScore = this.calcScore(all, all, timeMax)
        return `${score}/${maxScore}`
      },
      calcScore(correct, all, timeLeft){
        // console.log('correct',correct, 'all', all, 'timeLeft', timeLeft)
        var answer =  correct * 10 * (1 + correct + all + ( (timeLeft / 60) * ( 5 * correct/all ) ) )
        // console.log(answer)
        return answer.toFixed()

      }


      



    },
    mounted(){
      var rand_arr = this.get_rand(this.get_seed(this.user))
      // this.generate_questions_to_list()
      this.get_questions(rand_arr)
      this.get_question_answers(rand_arr)
      this.shuffle_answers(rand_arr)
      this.timerCount = this.user.timer * 2 * 60
      this.timerMax = this.user.timer * 60
      this.timerEnabled = true;
    },
    watch: {

      timerEnabled(value) {
          if (value) {
              setTimeout(() => {
                this.timerCount--;
              }, 1000);
          }
      },

      timerCount: {
        handler(value) {
          if (value > 1 && this.timerEnabled) {
            setTimeout(() => {
              this.timerCount-=1;
            }, 1000);
          } else {
            if (value==0){
              this.finish_quiz()
            }
          }

        },
        immediate: true // This ensures the watcher is triggered upon creation
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
/* .shaded{
  background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.005));
} */
</style>

