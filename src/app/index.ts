import { createPinia } from 'pinia';
import {createApp} from 'vue';
import { router } from './providers';
import App from './ui.vue';

const app = createApp(App).use(router).use(createPinia());

app.mount('weather-widget')