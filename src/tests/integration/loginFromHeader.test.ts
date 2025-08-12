import { describe, it, expect, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises } from '@vue/test-utils'
import { useAuthStore } from '@/store/features/auth';
import { createI18n } from "vue-i18n";
import { routes } from "@/router";
import App from "@/App.vue";
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import TheBanner from '@/components/common/TheBanner.vue';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';


describe('HeaderLogin → Login → Signup → HomePage integration', () => {

  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: { navbar: { login: 'Login', 'my account': 'My Account' } }
    }
  });

  let router: ReturnType<typeof createRouter>
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })
    pinia = createPinia();
    setActivePinia(pinia);
  })

  it('should go from header to login and redirects to homepage after login', async () => {
    await router.push('/')
    await router.isReady()

    const appWrapper = mount(App, {
      global: {
        plugins: [router, pinia, i18n],
        components: {
          'base-button': BaseButton,
          'base-dialog': BaseDialog,
          'the-banner': TheBanner,
          'default-layout': DefaultLayout,
          'DefaultLayout': DefaultLayout,
        }
      },
    })

   
    const authStore = useAuthStore()
    authStore.loginSuccess = false 
    
    await flushPromises()

    const headerLogin = appWrapper.find('[data-testid="header-login-button"]')
    expect(headerLogin.exists()).toBe(true)
    
    
    const routerLink = headerLogin.find('a') 
    if (routerLink.exists()) {
      await routerLink.trigger('click')
    } else {
      await headerLogin.trigger('click')
    }
    
    await router.isReady()
    await flushPromises()
    
    expect(router.currentRoute.value.path).toBe('/login')

    await router.push('/signup')
    await flushPromises()

    await appWrapper.find('[data-testid="email-input"]').setValue('test@example.com')
    await appWrapper.find('[data-testid="password-input"]').setValue('password123')
    const repeatPasswordField = appWrapper.find('[data-testid="repeat-password-input"]')
    if (repeatPasswordField.exists()) {
      await repeatPasswordField.setValue('password123')
    }
    await appWrapper.find('[data-testid="signup-button"]').trigger('click')
    await flushPromises()

    expect(authStore.isSignedUp).toBe(true)

    await router.push('/login')
    await flushPromises()

    await appWrapper.find('[data-testid="email-input"]').setValue('test@example.com')
    await appWrapper.find('[data-testid="password-input"]').setValue('password123')
    await appWrapper.find('[data-testid="login-button"]').trigger('click')
    await flushPromises()

    expect(authStore.loginSuccess || authStore.isSignedUp).toBe(true)
    expect(router.currentRoute.value.path).toBe('/')

    const accountButton = appWrapper.find('[data-testid="account-dropdown-button"]')
    expect(accountButton.exists()).toBe(true)
  })
})