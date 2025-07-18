<template>
    <header class="header-section container">
        <h1 class="header-section-logo"><router-link to="/">Monux</router-link></h1>
        <nav class="header-section-navbar">
            <router-link to="/" class="header-section-navbar-link">Home</router-link>
            <router-link to="/help" class="header-section-navbar-link">Help</router-link>
            <router-link to="/faq" class="header-section-navbar-link">FAQ</router-link>
            <router-link to="/blog" class="header-section-navbar-link">Blog</router-link>
            <router-link to="/subscription" class="header-section-navbar-link">Subscription</router-link>
            <base-button to="/login" mode="btn-blue">Login</base-button>
        </nav>
    </header>
</template>



<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

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
    }
}        
</style>