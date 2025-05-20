<template>
    <div class="credits">
        <v-card tile>
            <v-card-text class="text-justify">
                
                <!-- авторы -->
                
                <div class="">
                    <p class="text-h5">
                        Авторы
                    </p>
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

                

                
                
                
                <v-divider class="my-2"/>

                <!-- список тем в вопросах -->

                <p>Составленные вопросы содержат в себе следующие темы:</p>
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
            </v-card-actions>
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
    info: info.creditsCard
    }),
    methods:{      
        what(){
            alert('ну и чего ты ожидаешь от этой кнопки?')
        }
    }
}
</script>
  
  
  