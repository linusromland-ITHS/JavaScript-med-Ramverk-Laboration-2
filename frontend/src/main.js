//External Dependencies:
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { registerSW } from 'virtual:pwa-register';

// Internal Dependencies:
import './index.css';
import App from './App.vue';
import router from './router';
import store from './store';

registerSW();

createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app');
