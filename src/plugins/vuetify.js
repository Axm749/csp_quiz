import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.brown.darken3,
            // primary: colors.brown.base,
            secondary: colors.brown.base,
            accent: colors.brown.base, 
            task: colors.brown.base,
            answerSelected: colors.brown.base,
            passive: colors.brown.lighten4
          },
          dark: {
            primary: colors.teal.darken3,
            secondary: colors.teal.base,
            accent: colors.teal.base,
            task: colors.teal.base,
            answerSelected: colors.teal.lighten1,
            passive: colors.blueGrey.base
          },
        },
        options: { customProperties: true },
        themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    iconfont: 'md'
});
