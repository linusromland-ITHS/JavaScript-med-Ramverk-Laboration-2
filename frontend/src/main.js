//External Dependencies import:
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { registerSW } from 'virtual:pwa-register';

//Internal Dependencies import:
import './index.css';
import App from './App.vue';
import router from './router';
import store from './store';

//Registers Service Worker for PWA
registerSW();

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Registers vuex
app.use(store);

//Registers axios
app.use(VueAxios, axios);

//Mounts app to div with id app
app.mount('#app');
