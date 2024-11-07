import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import staff_router from './router/staff-router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).use(router).mount('#app')
createApp(App).use(staff_router) .mount('#app');

