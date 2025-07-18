import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/UI/BaseButton.vue';
import TheBanner from './components/common/TheBanner.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-button', BaseButton);
app.component('the-banner', TheBanner);

app.mount('#app');
