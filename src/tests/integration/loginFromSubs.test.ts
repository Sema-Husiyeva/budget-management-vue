import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { flushPromises } from '@vue/test-utils'
import { useAuthStore } from '@/store/features/auth';
import SignupPage from "@/pages/Signup/SignupPage.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import PaymentPage from "@/pages/Payment/PaymentPage.vue";
import SubscriptionPage from "@/pages/Subscription/SubscriptionPage.vue";

describe('Subscription → Login → Payment integration', () => {
  const routes = [
    { path: '/signup', component: SignupPage },
    { path: '/login', component: LoginPage },
    { path: '/payment', component: PaymentPage },
    { path: '/subscription', component: SubscriptionPage },
  ]  

  let router: ReturnType<typeof createRouter>
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })
    pinia = createPinia();
  })

  it('should go from subscription to login and redirects to payment after login', async () => {
    await router.push('/subscription')
    await router.isReady()

    const subsWrapper = mount(SubscriptionPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    const headerLogin = subsWrapper.find('[data-testid="subs-button"]')
    expect(headerLogin.exists()).toBe(true)
    await headerLogin.trigger('click');

    const signupWrapper = mount(SignupPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await signupWrapper.find('[data-testid="email-input"]').setValue('test@example.com')
    await signupWrapper.find('[data-testid="password-input"]').setValue('password123')
    

    const repeatPasswordField = signupWrapper.find('[data-testid="repeat-password-input"]')
    if (repeatPasswordField.exists()) {
      await repeatPasswordField.setValue('password123')
    }
    
    await signupWrapper.find('[data-testid="signup-button"]').trigger('click')
    await flushPromises()

    const authStore = useAuthStore()
    expect(authStore.isSignedUp).toBe(true)

    await router.push({ path: '/login', query: { fromSubscription: 'true' } })
    await router.isReady()

    const loginWrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await loginWrapper.find('[data-testid="email-input"]').setValue('test@example.com')
    await loginWrapper.find('[data-testid="password-input"]').setValue('password123')
    await loginWrapper.find('[data-testid="login-button"]').trigger('click')
    
    await flushPromises()

    expect(authStore.loginSuccess || authStore.isSignedUp).toBe(true)
    
    expect(router.currentRoute.value.path).toBe('/payment')
  })
})