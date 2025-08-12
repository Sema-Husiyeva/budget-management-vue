<template>
  <header class="header-section container">
    <h1 class="header-section-logo"><router-link to="/">Monux</router-link></h1>
    <nav class="header-section-navbar">
      <div></div>
      <router-link to="/" class="header-section-navbar-link">{{
        t("navbar.home")
      }}</router-link>
      <router-link to="/help" class="header-section-navbar-link">{{
        t("navbar.help")
      }}</router-link>
      <router-link to="/faq" class="header-section-navbar-link">{{
        t("navbar.faq")
      }}</router-link>
      <router-link to="/blog" class="header-section-navbar-link">{{
        t("navbar.blog")
      }}</router-link>
      <router-link to="/subscription" class="header-section-navbar-link">{{
        t("navbar.subscription")
      }}</router-link>
      <div>
    <base-button
      v-if="!authStore.loginSuccess"
      to="/login"
      mode="btn-blue"
      data-testid="header-login-button"
    >
    {{ t("navbar.login") }}
    </base-button>
    <div v-else class="header-section-navbar-account-dropdown">
      <base-button
        @click="toggleMenu"
        mode="btn-white"
        data-testid="account-dropdown-button"
      >
        {{ t("navbar.my account") }}
      </base-button>
      <div v-if="showMenu" class="header-section-navbar-account-dropdown-menu">
        <p><span>Email:</span> {{ authStore.user?.email }}</p>
        <p>
          <span>Plan:</span>
          {{
            authStore.subscriptionPlan
              ? `${authStore.subscriptionPlan.planType} - ${authStore.subscriptionPlan.amount}`
              : 'No active plan'
          }}
        </p>
        <base-button to="/subscription" mode="btn-white">Change Plan</base-button>
        <base-button data-testid="header-logout-button" @click="authStore.logout()" mode="btn-blue">Logout</base-button>
       </div>
      </div>
    </div>
      <select class="header-section-navbar-lang" v-model="selectedLang" @change="changeLanguage">
        <option value="en">EN</option>
        <option value="az">AZ</option>
      </select>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/features/auth'

const { locale, t } = useI18n()
const selectedLang = ref(locale.value)
const authStore = useAuthStore()
const router = useRouter()
const showMenu = ref(false)

watch(selectedLang, (newLang) =>{ 
  locale.value = newLang 
  document.documentElement.lang = newLang 
}) 

function changeLanguage() { 
  locale.value = selectedLang.value
  document.documentElement.lang = selectedLang.value
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.header-section {
  @include flex(space-between, center);
  padding: 30px 0;

  &-logo a {
    text-decoration: none;
    font-size: 1.5rem;
    color: $main-color;
    font-weight: 700;
  }

  &-navbar {
    display: flex;
    align-items: center;
    gap: 50px;

    &-link {
      text-decoration: none;
      color: $first-font-color;
      padding: 5px 15px;
      border-radius: 5px;
      transition: all 0.7s ease;
      &:hover {
        background-color: $main-color;
        color: $white-color;
      }
      &.router-link-exact-active {
        border-bottom: 2px solid $main-color;
        border-radius: 0;
      }
    }
    &-lang {
      background-color: $white-color;
      border: 1px solid $main-color;
      padding: 5px 10px;
      border-radius: 5px;
      color: $first-font-color;
      font-size: 1rem;
      cursor: pointer
    }
     &-account-dropdown{
            position: relative;
        
            &-menu {
                position: absolute;
                right: -5%;
                top: 120%;
                background-color: $white-color;
                border: 1px solid #ddd;
                padding: 30px;
                width: 240px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 30px;
                & p {
                    font-size: 1.1rem;
                    color: $first-font-color;
                    & span {
                        color: $main-color;
                        font-weight: 700;
                    }
                }
            }    
        }
  }
}
</style>
