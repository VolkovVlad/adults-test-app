import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Store } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft)


createApp(App).use(Store).use(router).mount('#app')

