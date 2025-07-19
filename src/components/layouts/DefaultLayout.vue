<template>
    <div>
        <the-header />

        <main>
            <router-view />
        </main>

        <the-footer />
    </div>
</template>

<script>
import TheHeader from '../common/TheHeader.vue';
import TheFooter from '../common/TheFooter.vue';

export default {
    components: {
        TheHeader,
        TheFooter
    }
}
</script>