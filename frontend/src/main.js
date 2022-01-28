//External Dependencies import:
import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-3-socket.io';
import io from 'socket.io-client';

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

//Registers Socket.IO
const socketio = new VueSocketIO({ connection: io(window.location.origin) });
app.use(socketio);

//Mounts app to div with id app
app.mount('#app');
