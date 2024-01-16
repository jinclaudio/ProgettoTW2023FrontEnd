import { createApp } from 'vue'
import './style.css'
import App from "./App.vue";
import router from "./router";
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import {createVuetify} from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme: {
                dark: false,
                colors: {
                    primary: '#2196F3',
                },
            },
        },

    },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')