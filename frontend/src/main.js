//External Dependencies:
import { createApp } from 'vue';

// Internal Dependencies:
import './index.css';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(router).use(store).mount('#app');
