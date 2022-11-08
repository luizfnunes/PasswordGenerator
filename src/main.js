import { createApp } from 'vue'
import App from './App.vue'

/* Bootstrap and Bootswatch */
import '../node_modules/bootswatch/dist/flatly/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap'

const Vue = createApp(App)
Vue.use(bootstrap)
Vue.mount('#app')
