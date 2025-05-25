<template>
    <div class="themePicker">
        <!-- <v-card class="mt-3">
            <v-card-title>
                Основные настройки
            </v-card-title>
        </v-card> -->

        <v-card class="mt-3">
            <!-- <v-card-title>
                Настройки темы
            </v-card-title> -->
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

            <v-expansion-panels flat focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Основной цвет
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center">
                        <v-color-picker v-if="!$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.light.primary"
                        ></v-color-picker>
                        <v-color-picker v-if="$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.dark.primary"
                        ></v-color-picker>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Второстепенный цвет
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center">
                        <v-color-picker v-if="!$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.light.secondary"
                        ></v-color-picker>
                        <v-color-picker v-if="$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.dark.secondary"
                        ></v-color-picker>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Выбранный объект
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center">
                        <v-color-picker v-if="!$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.light.answerSelected"
                        ></v-color-picker>
                        <v-color-picker v-if="$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.dark.answerSelected"
                        ></v-color-picker>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Не выбранный объект
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="align-center text-center">
                        <v-color-picker v-if="!$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.light.passive"
                        ></v-color-picker>
                        <v-color-picker v-if="$vuetify.theme.dark"
                        v-model="$vuetify.theme.themes.dark.passive"
                        ></v-color-picker>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
            </v-expansion-panels>


            
        </v-card>


    </div>
  </template>
  
<script>

export default {
    name: 'creditsCard',
    props:{
        debug: Boolean
    },
    data: () => ({
        images: true,
        debugChangable: false
    }),
    methods: {
        update(valName, value){
            // console.log('making emit')
            this.$emit('update', valName, value)
        }
    }
}
</script>
  
  
  