import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "@/store/features/auth";

describe('Auth Integration', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should register and log in a user successfully', () => {
        const authStore = useAuthStore();

        const userData = {
            email: 'test@test.com',
            password: 'testpassword'
        }

        authStore.signup(userData);

        expect(authStore.user).toEqual(userData);
        expect(authStore.isSignedUp).toBe(true);
        expect(authStore.loginSuccess).toBe(false);

        authStore.login(userData);

        expect(authStore.loginSuccess).toBe(true);
    })

    it('should not login with incorrect credentials', () => {
        const authStore = useAuthStore();

        authStore.signup({email: 'test@test.com', password: '123456'});

        authStore.login({email: 'test@test.com', password: 'wrongpassword'});

        expect(authStore.loginSuccess).toBe(false);
    })

    it('should reset everything on logout', () => {
    const authStore = useAuthStore()

    authStore.signup({ email: 'a@a.com', password: '123' })
    authStore.login({ email: 'a@a.com', password: '123' })
    authStore.setSubscriptionPlan({ amount: '15', planType: 'premium' })

    expect(authStore.loginSuccess).toBe(true)
    expect(authStore.subscriptionPlan).not.toBeNull()

    authStore.logout()

    expect(authStore.user).toBeNull()
    expect(authStore.loginSuccess).toBe(false)
    expect(authStore.subscriptionPlan).toBeNull()
    expect(authStore.isSignedUp).toBe(false)
  })
})