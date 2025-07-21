<template>
    <the-banner :bannerImg="bannerImg" bannerTitle="FAQ" bannerDescription="Got questions? We've got answers. Explore our most common topics to find quick and clear solutions."></the-banner>
    <div class='faq-section'>
        <h1 class='faq-section-title'>Questions and answers</h1>
        <p class='faq-section-text'>You can find answers to frequently asked questions here.</p>

        <div v-for="(item, index) in faqData" :key="index" @click="handeleClick(index)" class="faq-section-item">
            <div class="faq-section-item-question">
                <h3>{{ item.question }}</h3>
                <span>{{ activeIndex === index ? '-' : '+' }}</span>
            </div>
            <div class="faq-section-item-answer" :class="{ 'faq-section-item-answer-open': activeIndex === index }">
                <p>{{ item.answer }}</p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import faqData, { IFAQItem } from './faqData';
import bannerImg from '@/assets/images/banner-img-faq.png';

const activeIndex = ref<number | null>(null);

const handeleClick = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
}; 
</script>


<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.faq-section {
    background-color: $main-bg-color;
    padding: 80px 100px;

    &-title {
        text-align: center;
        font-size: 3rem;
        color: $first-font-color;
        margin-bottom: 20px;
    }
    &-text {
        text-align: center;
        font-size: 1.2rem;
        color: $third-font-color;
        margin-bottom: 20px;
    }

    &-item {
        padding: 10px 15px;
        background-color: $white-color;
        border-radius: 10px;
        margin: 30px 0;
        cursor: pointer;
        &:hover {
            background-color: $second-bg-color;
        }

        &-question {
            @include flex(space-between, center, 0);
            & h3 {
                color: $first-font-color;
                font-weight: 400;
            }
            & span {
                font-size: 2rem;
                color: $main-color;
                font-weight: 300;
            }
        }

        &-answer {
            color: $third-bg-color;
            font-size: 0.95rem;
            font-weight: 400;
            height: 0;
            overflow: hidden;
            transition: height 0.6s ease, opacity 0.6s ease;
            
            &-open {
            height: 50px;
            opacity: 1;
            margin-top: 30px;
            }
        }
    }
}
</style>