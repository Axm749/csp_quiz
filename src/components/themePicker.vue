<template>
    <div class="themePicker">


        <v-expansion-panels>

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

           <!-- <v-expansion-panel>
                <v-expansion-panel-header>
                    Изображения
                </v-expansion-panel-header>
                <v-expansion-panel-content class="align-center text-center">
                    <v-checkbox
                    label="Убрать картинки?"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel> -->
        </v-expansion-panels>



    </div>
  </template>
  
<script>

export default {
    name: 'creditsCard',

}
</script>
  
  
  