<template>
    <section class="banner-section">
        <div class="banner-section-content">
            <h1 class="banner-section-content-title">
                {{ bannerTitle }}
            </h1>
            <p class="banner-section-content-desc">
                {{ bannerDescription }}
            </p>
            <div class="banner-section-content-buttons">
                <base-button to="https://play.google.com/store/search?q=wallet%20budget&c=apps" external mode="btn-blue">Google Play</base-button>
                <base-button to="https://apps.apple.com/az/app/wallet-budget-money-manager/id1032467659" external  mode="btn-blue">App Store</base-button>
            </div>
        </div>
        <img :src="bannerImg" alt="bannerImg">
    </section>
</template>


<script setup lang="ts">
defineProps<{
  bannerImg: string;
  bannerTitle: string;
  bannerDescription: string;
}>();
</script>



<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.banner-section {
    @include flex(space-between, center, 0);
    background-color: $second-bg-color;
    padding: 15px 100px;
    height: 592px;

    &-content {
        @include flex(center, start, 20px,  column);
        width: 440px;
        &-title {
            color: $first-font-color;
            font-size: 4.5rem;
            font-weight: 600;
            width: 800px;
        }
        &-desc {
            color: $third-font-color;
            line-height: 2rem;
        }
        &-buttons {
            @include flex(center, center, 20px);
        }
    }
}


@media screen and (max-width: 768px) {
    .banner-section {
        flex-direction: column;
        height: 700px;
        &-image {
            width: 350px;
            height: 270px;
        }
        &-content {
            align-items: normal;
            width: 390px;
            &-buttons {
                flex-direction: column;
                align-items: normal;
            }
            &-title {
                font-size: 49px;
                width: 400px;
            }
        }
    }
}
</style>