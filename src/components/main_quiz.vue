<template>
  <v-container>
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
            quiz_state: {{ quiz_state }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            ral: {{ get_rand(get_seed(user)).length }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            qnl: {{ questions_num_list }}
          </p>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <p> 
            qal: {{ questions_ans_list }}
          </p>
        </v-col>


      </v-row>
    </div>
    <p style="display: none;">just to render {{ jtr }}</p>
    <div class="quiz" v-if="quiz_state">
      <!-- <p>quiz_list: {{ quiz_list }}</p> -->
      <!-- <p>количество вопросов в архиве: {{ questions_list.length }}</p> -->   
      <!-- <p>список номеров вопроса: {{ questions_num_list }}</p> -->
      <!-- <p>список правильных ответов: {{ questions_ans_list }}</p> -->
      <!-- <p>список выбранных ответов: {{ chosen_ans_list }}</p> -->
      <!-- <p>вопросы: {{ questions_list }}</p> -->
      
      <v-card 
        v-for="(obj, index) in questions_final_list.slice(0,user.optional_digit)" :key="index+1"
        class="mt-3"
      >
        
      <v-toolbar
        color="task"
        dark
        dense
        flat
      >
        <v-toolbar-title class="text-body-2">
          вопрос №{{ index+1 }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        {{obj.question}}
        <!-- <p>{{ obj }}</p> -->
        <p>correct answer: {{ questions_ans_list[index] }}</p> 
      </v-card-text>

      <v-card-actions>        
        <v-col>
          <v-row>
            <v-col>
              <v-btn block
              :dark="chosen_ans_list[index]===0"
              :color="chosen_ans_list[index]===0 ? 'answerSelected' : 'passive'"
              @click="check_answer(0, questions_ans_list[index], obj, index)">
                {{ obj.answer[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block 
              :dark="chosen_ans_list[index]===1"
              :color="chosen_ans_list[index]===1 ? 'answerSelected' : 'passive'"
              @click="check_answer(1, questions_ans_list[index], obj, index)">
                {{ obj.answer[1] }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block
              :dark="chosen_ans_list[index]===2"
              :color="chosen_ans_list[index]===2 ? 'answerSelected' : 'passive'"
              @click="check_answer(2, questions_ans_list[index], obj, index)">
                {{ obj.answer[2] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block
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

      <!-- <p>questions_ans_list {{ questions_ans_list.slice(0, this.user.optional_digit) }}</p>
      <p>chosen_ans_list {{ chosen_ans_list.slice(0, this.user.optional_digit) }}</p>
      <p>{{ finish_req() }}</p> -->


      <v-btn 
        v-if="finish_req()"
        class="mt-3" 
        @click="finish_quiz()"
        block 
        color="primary"
        >завершить</v-btn>
      <v-btn 
        v-if="!finish_req()"
        class="mt-3" 
        block disabled
        >завершить (не все вопросы отвечены)</v-btn>
    </div>

    <div class="finish" v-if="!quiz_state">
      <h2>there will be an endscreen</h2>


      <v-card 
          class="mt-3"
        >
        <v-toolbar
          :color="evaluate_results(correct_count, user.optional_digit)"
          dark
          dense
          flat
        >
          <v-toolbar-title class="text-body-2">
            Результат
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <p>Имя: {{ user.user_name }}</p>
          <p>Фамилия: {{ user.user_surname }}</p>
          <p>Группа: {{ user.group }}</p>
        </v-card-text>

        <v-card-actions>        
          <v-progress-circular
            size="200"
            width="30"
            :value="(correct_count/user.optional_digit)*100"
            :color="evaluate_results(correct_count, user.optional_digit)"
          >
            {{ correct_count }}/{{user.optional_digit}}
          </v-progress-circular>
        </v-card-actions>

        </v-card>
    <!-- <div class="finish" v-if="quiz_state"> -->
      
      <v-progress-circular
        size="200"
        width="30"
        :value="(correct_count/user.optional_digit)*100"
        :color="evaluate_results(correct_count, user.optional_digit)"
      >
        {{ correct_count }}/{{user.optional_digit}}
      </v-progress-circular>
      <!-- <p>{{ evaluate_results(correct_count, user.optional_digit) }}</p> -->
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'main_quiz',
    props:{
      user: Object
    },

    data: () => ({
      quiz_state: true,
      debug: true,
      jtr: 0,
      questions_num_list: [],
      questions_ans_list: [],
      full_answers: [],
      chosen_ans_list: [],
      
      questions_list: 
      [
        {
          id: 1,
          question: 'Бесплатный вопрос, просто не ошибись. Хотя я знаю, что тебе он никогда не попадётся',
          answer: [
            'Верный ответ',
            'Не выбирай 1',
            'Не выбирай 2',
            'Не выбирай 3'
          ],
        },
        {
          id: 2,
          question: 'Что из перечисленного входит в иерархию цифровых сетей европейского стандарта?',
          answer: [
            'E0, E1, E2, ...',
            'PDH, SDH, ...',
            'T0, T1, T2, ...',
            'Euro5, Euro6, ...'
          ],
        },
        {
          id: 3,
          question: 'Что из перечисленного входит в иерархию цифровых сетей американского стандарта?',
          answer: [
            'T0, T1, T2, ...',
            'E0, E1, E2, ...',
            'PDH, SDH, ...',
            'U1, U2, ...'
          ],
        },
        {
          id: 4,
          question: 'Кодеки речевых сигналов – кодеки ... типа, результатом ... является токи АИМ сигнала и эталонные токи, вырабатываемые генератором эталонных токов.',
          answer: [
            'взвешивающего ... взвешивания',
            'E0, E1, E2, ...',
            'PDH, SDH, ...',
            'U1, U2, ...'
          ],
        },
        {
          id: 5,
          question: 'Кодеки речевых сигналов – кодеки взвешивающего типа, результатом взвешивания является токи ... сигнала и эталонные токи, вырабатываемые генератором эталонных токов.',
          answer: [
            'АИМ',
            'ШИМ',
            'ФМ',
            'ЧМ'
          ],
        },
        {
          id: 6,
          question: 'фНЧ нужен для ...',
          answer: [
            'пропускания токов нижних частот',
            'задерживания токов нижних частот',
            'создания колебаний нижних частот',
            'другое'
          ],
        },
        {
          id: 7,
          question: 'фВЧ нужен для ...',
          answer: [
            'пропускания токов верхних частот',
            'задерживания токов верхних частот',
            'создания колебаний верхних частот',
            'другое'
          ],
        },



























































































        
        
      ],
      correct_count: 1,
      quiz_list: [],
      questions_final_list: []

    }),
    methods:{
      get_seed(user){
        var seed = `${user['group']}${user['user_name']}${user['user_surname']}`
        // console.log(seed)
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
        for(var j=0; j<8; j++){
          for(var i=0; i<4; i++){
            arr.push(this.cyrb128(arr[j])[i])
          }
        }
        // console.log(arr)
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

      // получаю номера вопросов
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

      shuffle_arr(array, rand_num_arr){
        console.log('array',array)
        let currentIndex = array.length;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          let randomIndex = rand_num_arr[0] % (array.length-currentIndex+1)
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      },


      generate_questions(){
        var i = this.questions_list.length
        var rand_array = this.get_rand(this.get_seed(this.user))
        while(i<rand_array.length)
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

      shuffle_answers(){
        // Прохожусь по каждому вопросу с соответствующим значением правильного ответа
        // Изначально правильный ответ всегда в первой ячейке массива
        // Подходя к ячейке меняю местами первую ячейку (индекс ноль) с ячейкой, 
        // на которой будет правильный ответ
        //
        // на этом по сути и всё
        for(var i=0; i<this.questions_final_list.length; i++){

          var current_question = this.questions_final_list[i].answer
          var current_ans_position = this.questions_ans_list[i]
          
          // console.log(current_question, current_ans_position, i)
          if (current_ans_position != 0){
            // console.log('ans position', current_ans_position, '!= 0 ... swapping')
            var temp = current_question[0]
            current_question[0] = current_question[current_ans_position]
            current_question[current_ans_position] = temp
            this.questions_final_list[i].answer = current_question 
          } else {
            // console.log('ans position', current_ans_position, '== 0')
          }
        }
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
        // if(x==y){
        //   console.log('correct answer')
        // } else {
        //   console.log('wrong answer')
        // }
        // console.log(this.chosen_ans_list[index], '?', x)
        this.chosen_ans_list[index]=x
        // console.log(this.chosen_ans_list[index], '?', x)
        this.jtr++
      },

      finish_req(){
        var ans_count = 0
        for(var i=0; i<this.user.optional_digit; i++){
          if (this.chosen_ans_list[i] == 5){
            // return false
          } else {ans_count++}
        }
        if (ans_count==this.user.optional_digit){
          // console.log('ans_count==this.user.optional_digit')
          return true
        } else {return false}
        // console.log('no problem, everything was answered')
        // return true
      },
      finish_quiz(){
        this.quiz_state=false
        this.correct_count = 0
        for (var i=0; i<this.user.optional_digit; i++){
          if (this.chosen_ans_list[i]==this.questions_ans_list [i]){
            this.correct_count++
            this.jtr++
          }
        }
      },
      evaluate_results(correct, total){
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
          return 'red'
        }
        if (this.between(ratio, acceptable_mark_req, good_mark_req)){
          console.log('orange')  
          return 'orange'
        }
        if (this.between(ratio, good_mark_req, excelent_mark_req)){
          console.log('yellow')  
          return 'yellow'
        }
        console.log('green') 
        return 'green'
        
      },
      // функция округляет в лучшую для студента сторону
      // [min, max)
      between(x, min, max){
        return x >= min && x < max
      }



    },
    mounted(){
      var rand_arr = this.get_rand(this.get_seed(this.user))
      this.generate_questions()
      this.get_questions(rand_arr)
      this.get_question_answers(rand_arr)
      this.shuffle_answers()
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

