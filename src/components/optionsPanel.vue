<template>
    <div class="themePicker">

        <v-card class="mt-3">
            <v-card-actions>
                <!-- <v-spacer/>
                <v-checkbox
                    label="debug"
                    v-model="debugChangable"
                    @change="update('debug', debugChangable)"
                />
                <v-spacer/><v-divider vertical /> -->
                <v-spacer/>
                <v-checkbox
                    label="изображения"
                    v-model="images"
                    @change="update('images', images)"
                /> 
                <v-spacer/>
                <v-divider vertical />
                <v-spacer/>
                <v-checkbox
                    label="тёмная тема"
                    v-model="$vuetify.theme.dark"
                />
                <v-spacer/> 
            </v-card-actions>


            <!-- <v-color-picker v-if="!$vuetify.theme.dark"
            v-model="$vuetify.theme.themes.light.primary"
            hide-canvas
            hide-inputs
            hide-sliders
            show-swatches
            width="100%"
            />
            <v-color-picker v-if="$vuetify.theme.dark"
            v-model="$vuetify.theme.themes.dark.primary"
            hide-canvas
            hide-inputs
            hide-sliders
            show-swatches
            width="100%"
            /> -->



            <v-expansion-panels flat focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <!-- Основной цвет -->
                        <span>
                            <v-icon color="primary" x-small>mdi-circle</v-icon>
                            Основной цвет    
                        </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center pt-3">
                        <div v-if="!altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.primary"
                            />
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.primary"
                            />
                        </div>
                        
                        <div v-if="altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.primary"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.primary"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <span>
                            <v-icon color="secondary" x-small>mdi-circle</v-icon>
                            Второстепенный цвет    
                        </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center pt-3">
                        <div v-if="altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.secondary"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.secondary"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                        </div>
                        <div v-if="!altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.secondary"
                            ></v-color-picker>
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.secondary"
                            ></v-color-picker>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <!-- Выбранный ответ -->
                        <span>
                            <v-icon color="answerSelected" x-small>mdi-circle</v-icon>
                            Выбранный ответ    
                        </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center pt-3">
                        <div v-if="!altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.answerSelected"
                            ></v-color-picker>
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.answerSelected"
                            ></v-color-picker>
                        </div>

                        <div v-if="altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.answerSelected"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.answerSelected"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                        </div>

                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <!-- Не выбранный ответ -->
                        <span>
                            <v-icon color="passive" x-small>mdi-circle</v-icon>
                            Не выбранный ответ    
                        </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center pt-3">
                        
                        <div v-if="!altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.passive"
                            ></v-color-picker>
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.passive"
                            ></v-color-picker>
                        </div>
                        
                        <div v-if="altColorPicker">
                            <v-color-picker v-if="!$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.light.passive"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                            <v-color-picker v-if="$vuetify.theme.dark"
                            v-model="$vuetify.theme.themes.dark.passive"
                            hide-canvas
                            hide-inputs
                            hide-sliders
                            show-swatches
                            width="100%"
                            swatches-max-height="350"
                            />
                        </div>



                        
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <div class="ma-3">
                <v-btn
                    block
                    elevation="1"
                    @click="returnDefaultTheme()"
                >
                    вернуть исходные цвета
                </v-btn>
                <v-checkbox
                    label="альтернативный способ выбора цвета"
                    v-model="altColorPicker"
                />
            </div>
            

            <v-divider class="my-3"/>

            <v-expansion-panels flat focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <span>
                            <v-icon color="primary" small>mdi-developer-board</v-icon>
                            для разработчиков
                        </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center pt-3">
                        <v-card color="secondary" dark>
                            <v-card-text class="text-center">
                                Сразу говорю, что при попытке 
                                использовать параметры 
                                разработчика, результат будет 
                                аннулирован автоматически. 
                                Предназначены лишь для тестирования 
                                работы приложения и отлова ошибок.
                            </v-card-text>
                            <v-card-actions>
                                
                                <v-container>

                                
                                
                                    <v-row no-gutters>
                                        <v-col md="2">
                                            <v-checkbox
                                                label="debug"
                                                v-model="debugChangable"
                                                @change="update('debug', debugChangable)"
                                            />
                                        </v-col>
                                        
                                        
                                        <v-col md="3">
                                            <v-checkbox
                                                label="showAnswers"
                                                v-model="answersChangable"
                                                @change="update('showAnswers', answersChangable)"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


            
        </v-card>


    </div>
  </template>
  
<script>
import colors from 'vuetify/lib/util/colors'
export default {
    name: 'creditsCard',
    props:{
        debug: Boolean
    },
    data: () => ({
        images: true,
        debugChangable: false,
        answersChangable: false,
        altColorPicker: false
    }),
    methods: {
        update(valName, value){
            // console.log('making emit')
            this.$emit('update', valName, value)
        },
        returnDefaultTheme(){
            if (!this.$vuetify.theme.dark){         
                this.$vuetify.theme.themes.light = {
                    primary: colors.brown.darken3,
                    secondary: colors.brown.base,
                    accent: colors.brown.base, 
                    task: colors.brown.base,
                    answerSelected: colors.brown.base,
                    passive: colors.brown.lighten4
                }
            } else {
                this.$vuetify.theme.themes.dark = {
                    primary: colors.teal.darken3,
                    secondary: colors.teal.base,
                    accent: colors.teal.base,
                    task: colors.teal.base,
                    answerSelected: colors.teal.lighten1,
                    passive: colors.blueGrey.base
                }
            }

        }
    }
}
</script>
  
  
  