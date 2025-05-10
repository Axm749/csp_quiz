<template>
    <div class="credits">
        <v-card tile>
            <!-- <v-card-title>
                О странице
            </v-card-title> -->
            <v-card-text class="text-justify">
                

                <p>
                    По итогу прохождения викторины у вас будет свой счёт. 
                    Он выдаётся в очках, которые зависят как от ваших знаний,
                    так и от скорости ответов. 
                </p>
                <p>
                    В большей мере конечно имеют значения знания, 
                    но за счёт времени можно умножить счёт вдвое. 
                    Потому можете использовать разные стратегии.
                    Формула расчета очков:
                </p>
                <p class="font-weight-black text-center"> C * 10 * (1 + (Tm * 5 * C / A) + C + A) </p>
                <p>, где:</p>
                <ul>
                    <li>
                        C - правильные ответы;
                    </li>
                    <li>
                        A - всего ответов;
                    </li>
                    <li>
                        Tm - количество оставшихся минут (округляя вниз).
                    </li>
                </ul>
                
                
                <p>Страница создана студентами РУТ (МИИТ), группы ТСТ-442:
                </p>
                <ul class="font-weight-medium">
                    <li>Михайлов Александр Сергеевич</li>
                    <li>Прибавкин Дмитрий Андреевич </li>
                </ul>
                <br>
                <!-- <p>Оценка по доле верных ответов:</p>
                <ul class="font-weight-medium">
                    <li>0-40% - незачет</li>
                    <li>40-60% - зачтено</li>
                    <li>60-85% - хорошо</li>
                    <li>85-100% - отлично</li>
                </ul> -->

                <p>Составленные вопросы содержат в себе следующие темы:</p>
                <ul class="font-weight-medium">
                    <li v-for="(obj, index) in topics" :key="index+1">
                        {{ obj }}{{ index }}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                
            </v-card-actions>
        </v-card>
    </div>
  </template>
  
<script>
import topicList from '../data/topicList.js';
export default {
    name: 'creditsCard',
    data: () => ({
    topics: topicList,
    }),
    methods:{      
    }
}
</script>
  
  
  