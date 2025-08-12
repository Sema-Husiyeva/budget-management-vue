import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';

import HomePage from '@/pages/Home/HomePage.vue';
import HelpPage from '@/pages/Help/HelpPage.vue';
import FaqPage from '@/pages/FAQ/FaqPage.vue';
import BlogPage from '@/pages/Blog/BlogPage.vue';
import SubscriptionPage from '@/pages/Subscription/SubscriptionPage.vue';
import BlogDetail from '@/pages/blogDetail/blogDetail.vue';
import LoginPage from '@/pages/Login/LoginPage.vue';
import SignupPage from '@/pages/Signup/SignupPage.vue';
import PaymentPage from '@/pages/Payment/PaymentPage.vue';
import SuccessfulPayment from '@/pages/successfulPayment/SuccessfulPayment.vue';
import PrivacyPage from '@/pages/Privacy/PrivacyPage.vue';
import TermsPage from '@/pages/Terms/TermsPage.vue';
import ContactPage from '@/pages/Contact/ContactPage.vue';


export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'help', component: HelpPage },
      { path: 'faq', component: FaqPage },
      { path: 'blog', component: BlogPage },
      {
        path: 'blog/:id',
        name: 'BlogDetail',
        component: BlogDetail,
        props: true,
      },
      { path: 'subscription', component: SubscriptionPage },
      { path: 'payment', component: PaymentPage },
      { path: 'successfulPayment', component: SuccessfulPayment },
      { path: 'privacy', component: PrivacyPage },
      { path: 'terms', component: TermsPage },
      { path: 'contact', component: ContactPage },
    ],
  },
  {
  path: '/login',
  component: AuthLayout,
  children: [{ path: '', component: LoginPage }],
},
{
  path: '/signup',
  component: AuthLayout,
  children: [{ path: '', component: SignupPage }],
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
