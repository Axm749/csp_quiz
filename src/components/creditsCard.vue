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
}
</script>
  
  