<template>
    <div>
        <the-header />

        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import TheHeader from '../common/TheHeader.vue';

export default {
    components: {
        TheHeader
    }
}
</script>