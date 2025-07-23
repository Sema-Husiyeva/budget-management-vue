import { ref } from 'vue';
import { defineStore } from 'pinia';

interface IUser {
  email: string;
  password: string;
}

interface ISubscription {
  amount: string;
  planType: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const isSignedUp = ref(false);
  const loginSuccess = ref(false);
  const subscriptionPlan = ref<ISubscription | null>(null);

  function signup(payload: IUser) {
    user.value = payload;
    isSignedUp.value = true;
  }

  function login(payload: IUser) {
    if (
      user.value &&
      user.value.email === payload.email &&
      user.value.password === payload.password
    ) {
      loginSuccess.value = true;
    }
  }

  function setSubscriptionPlan(payload: ISubscription) {
    subscriptionPlan.value = payload;
  }

  function clearSubscriptionPlan() {
    subscriptionPlan.value = null;
  }

  function logout() {
    user.value = null;
    loginSuccess.value = false;
    subscriptionPlan.value = null;
  }

  return {
    user,
    isSignedUp,
    loginSuccess,
    subscriptionPlan,
    signup,
    login,
    logout,
    setSubscriptionPlan,
    clearSubscriptionPlan
  };
});