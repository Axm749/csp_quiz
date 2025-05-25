<template>
    <div class="credits">
        <v-card tile>
            <v-card-title>Авторы</v-card-title>
            <v-card-text class="text-justify">
                
                <!-- авторы -->
                
                <div>
                    <p>
                        {{ info.authors.organisation }}
                    </p>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th> ФИО </th>
                                <th> роль</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(obj, index) in info.authors.authorsList" :key="index+1">
                                <td>
                                    {{ obj.fullName }} 
                                </td>
                                <td>
                                    {{ obj.role }}
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>  
                </div>

                <v-divider class="my-2"/>

                <!-- описание работы + формула -->

                <div class="">
                    <p v-for="(obj, index) in info.description" :key="index+1">
                        {{ obj }}
                    </p>
                    
                    <p class="font-weight-black text-center">
                        {{ info.formulaitcs.formula }}
                    </p>
                    <p>, где:</p>

                    <v-simple-table>
                        <tbody>
                            <tr v-for="(obj, index) in info.formulaitcs.formulaVariables" :key="index+1">
                                <td>
                                    {{ obj.variable }} 
                                </td>
                                <td>
                                    {{ obj.meaning }}
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </v-card-text>
            
            <!-- <v-sheet class="stackSheet" color="white">
                <div 
                    v-for="(obj, index) in graphData" :key="index+1"

                >
                    <v-sparkline
                        class="stackSpark"
                        :value="obj"
                        smooth="5"
                        :color="`rgba(${index*6},${255-(index*6)},0,0.5)`"
                        line-width="0.2"
                    ></v-sparkline>
                </div>
            </v-sheet>

            <p>здесь показано, сколько будет очков в зависимости от правильных ответов</p>
            <div
                style="height: 300px"
            ></div> -->
                <!-- список тем в вопросах -->

                <!-- <p>Составленные вопросы содержат в себе следующие темы:</p>
                <ul class="font-weight-medium">
                    <li v-for="(obj, index) in topics" :key="index+1">
                        {{ obj }}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="what()">
                    ответы
                </v-btn>
            </v-card-actions> -->
        </v-card>
    </div>
  </template>
  
<script>
import topicList from '../data/topicList.js';
import info from '../data/info.js';
export default {
    name: 'creditsCard',
    data: () => ({
    topics: topicList,
    info: info.creditsCard,
    // timeLeft: 300,
    // questions: 50,
    // correct: 50,
    // graphData: [
    //     [1,2,3],
    //     [3,3,4],
    //     [1,2,0]
    // ]
    }),
    // methods:{      
    //     what(){
    //         alert('ну и чего ты ожидаешь от этой кнопки?')
    //     },
    //     gradeGraphic(C, Tm, A){
    //         // console.log("calculating", C, Tm, A)
    //         return C * 10 * (1+(Tm*5*C/A)+C+A)
    //     },
    //     drawGraphic(Tm, A){       
    //         this.graphData = [[],[],[]]
    //         var gd = []
    //         for(var j=0;j<Tm/2;j++){
    //             var gr = []
    //             for(var i=1;i<A;i++){
    //                 gr.push(this.gradeGraphic(i, j*2, A))
    //             }
    //             gd.push(gr)
    //         }
            
    //         this.graphData = gd
    //         // return graphData
    //     },
    // },
    // mounted() {
    //     this.drawGraphic(this.timeLeft, this.questions)
    // },
}
</script>
<!-- <style lang="css" scoped>
.stackSheet {
    position: relative;
}
.stackSpark {
    position: absolute;
    top: 0;
    left: 0;
}
</style> -->
  
  