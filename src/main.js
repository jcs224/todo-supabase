import { createApp } from 'vue'
import App from './App.vue'
import './app.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faTrash, 
    faPlus, 
    faTimes 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
    faTrash, 
    faPlus, 
    faTimes
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')