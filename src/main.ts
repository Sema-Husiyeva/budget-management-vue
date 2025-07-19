import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/UI/BaseButton.vue';
import TheBanner from './components/common/TheBanner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import i18n from "./i18n";


const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);


app.component('base-button', BaseButton);
app.component('the-banner', TheBanner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
