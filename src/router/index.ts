import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';

import HomePage from '@/pages/Home/HomePage.vue';
import HelpPage from '@/pages/Help/HelpPage.vue';
import FaqPage from '@/pages/FAQ/FaqPage.vue';
import BlogPage from '@/pages/Blog/BlogPage.vue';
import SubscriptionPage from '@/pages/Subscription/SubscriptionPage.vue';
import LoginPage from '@/pages/Login/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'help', component: HelpPage },
      { path: 'faq', component: FaqPage },
      { path: 'blog', component: BlogPage },
      { path: 'subscription', component: SubscriptionPage },
    ],
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
