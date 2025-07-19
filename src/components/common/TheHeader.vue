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
      <base-button to="/login" mode="btn-blue">{{
        t("navbar.login")
      }}</base-button>
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
const { locale, t } = useI18n()
const selectedLang = ref(locale.value)

watch(selectedLang, (newLang) =>{ 
  locale.value = newLang 
  document.documentElement.lang = newLang 
}) 

function changeLanguage() { 
  locale.value = selectedLang.value
  document.documentElement.lang = selectedLang.value
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
  }
}
</style>
