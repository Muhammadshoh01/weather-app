import { createApp } from 'vue'
import App from './App.vue'

// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleExclamation, faX)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
