import { it, expect, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../store/features/auth';

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  describe('signup', () => {
    it('should set user and mark as signed up', () => {
      const store = useAuthStore();
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      store.signup(userData);

      expect(store.user).toEqual(userData);
      expect(store.isSignedUp).toBe(true);
  });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', () => {
    const store = useAuthStore()
    const userData = { email: 'test@example.com', password: '123456' }

    store.signup(userData)
    store.login(userData)

    expect(store.loginSuccess).toBe(true)
  })

  it('should not login with wrong credentials', () => {
    const store = useAuthStore()
    const userData = { email: 'test@example.com', password: '123456' }

    store.signup(userData)
    store.login({ email: 'wrong@example.com', password: 'wrongpassword' })

    expect(store.loginSuccess).toBe(false)
  })
  })

  describe('setSubscriptionPlan', () => {
    it('should set subscription plan', () => {
    const store = useAuthStore()
    const plan = { amount: '3', planType: 'monthly' }

    store.setSubscriptionPlan(plan)
    expect(store.subscriptionPlan).toEqual(plan)
    })
  })

  describe('clearSubscriptionPlan', () => {
    it('should clear subscription plan', () => {
    const store = useAuthStore()
    const plan = { amount: '3', planType: 'monthly' }

    store.setSubscriptionPlan(plan)
    store.clearSubscriptionPlan()

    expect(store.subscriptionPlan).toBeNull()
    })
  })

  describe('logout', () => {
    it('should clear all user data', () => {
    const store = useAuthStore()
    const userData = { email: 'test@example.com', password: '123456' }
    const plan = { amount: '3', planType: 'monthly' }

    store.signup(userData)
    store.login(userData)
    store.setSubscriptionPlan(plan)

    store.logout()

    expect(store.user).toBeNull()
    expect(store.loginSuccess).toBe(false)
    expect(store.subscriptionPlan).toBeNull()
  })
  })
})