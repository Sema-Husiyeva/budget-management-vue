<template>
    <the-banner :bannerImg="bannerImg" bannerTitle="Help" bannerDescription="Need assistance? We're here to help you every step of the way. Find guides, tips, and support to make your experience smoother. Whether you're just getting started or need help with something specific, we've got your back. Let us make things easier for you."></the-banner>

    <div class="help-section-main">
        <div class="help-section-services">
         <img class="help-section-services-img" :src="budgetAppImg" alt="budgetAppImg" />
         <div class="help-section-services-info">
           <h2 class="help-section-services-info-title">Services</h2>
           <p class="help-section-services-info-text">We have put the management of your financial flows into a simple interface. Through our application, you will be able to categorize your income and expenses and easily prepare your reports using various filters.</p>
        </div>
        </div>

    <div class="slider-area">
    <div class="custom-nav">
      <button  class="nav-btn custom-prev-1">
        <span>&lsaquo;</span>
      </button>
      <button class="nav-btn custom-next-1">
        <span>&rsaquo;</span>
      </button>
    </div>

    <swiper
      class="mySwiper"
      :modules="[Navigation]"
      :slides-per-view="3"
      :space-between="32"
      :slides-per-group="1"
      :loop="false"
      :navigation="{ nextEl: '.custom-next-1', prevEl: '.custom-prev-1' }"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <div class="slide-box">
          <img :src="item.icon" alt="slider-icon" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>

  <div class="slider-area">
    <div class="custom-nav">
      <button class="nav-btn custom-prev-2">
        <span>&lsaquo;</span>
      </button>
      <button  class="nav-btn custom-next-2">
        <span>&rsaquo;</span>
      </button>
    </div>

    <swiper
      class="mySwiper"
      :modules="[Navigation]"
      :slides-per-view="3"
      :space-between="32"
      :slides-per-group="1"
      :loop="false"
      :navigation="{ nextEl: '.custom-next-2', prevEl: '.custom-prev-2' }"
    >
      <swiper-slide v-for="review in reviews" :key="review.id">
        <div class="slide-box slide-box-review">
          <img class="slide-box-star" :src="review.icon" alt="slider-icon" />
          <p>{{ review.text }}</p>
          <div class="slide-box-info">
            <img class="slide-box-avatar" :src="review.avatar" alt="avatar">
            <div>
                <h3>{{ review.name }}</h3>
                <p>{{ review.subtitle }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>

    </div>
</template>


<script setup lang="ts">
import bannerImg from '@/assets/images/banner-img-help.png';
import budgetAppImg from '@/assets/images/budget-app.png';
import sliderCategoryIcon from '@/assets/icons/help-slider-category.svg';
import sliderCashbackIcon from '@/assets/icons/help-slider-cashback.svg';
import sliderSalaryIcon from '@/assets/icons/help-slider-salary.svg';
import sliderTemplateIcon from '@/assets/icons/help-slider-template.svg';
import starsIcon from '@/assets/images/stars-icon.png';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper'
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface ISliderItem {
  id: number
  text: string
  icon: string
  subtitle: string
  name: string
  avatar: string
}


const reviews = ref<ISliderItem[]>([])

onMounted(async () => {
  try {
    const res = await axios.get('https://dummyjson.com/comments?limit=8')
    const comments = res.data.comments
    reviews.value = comments.map((comment: any) => ({
      id: comment.id,
      text: comment.body,
      icon: starsIcon,
      subtitle: 'Baku, Azerbaijan',
      name: comment.user.username,
      avatar: `https://i.pravatar.cc/150?u=${comment.user.id}`,
    }))
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
  }
})


const items = [
    { id:1, icon: sliderCashbackIcon, title:'User account:', text: "Protect your personal budget by creating an account on Android (iOS) and browser." },
    { id:2, icon: sliderSalaryIcon, title:'Account:', text: "A quick summary of your budget - Track information about your cash and bank accounts in one central location." },
    { id:3, icon: sliderTemplateIcon, title:'Template:', text: "Creating templates to simplify and speed up the entry of transactions" },
    { id:4, icon: sliderCategoryIcon, title:'Category:', text: "To analyze your cash flow, divide it into specific categories. For example: Expenses: food, shopping or income: salary, gifts" },
    { id:5, icon: sliderCashbackIcon, title:'User account:', text: "Protect your personal budget by creating an account on Android (iOS) and browser." },
    { id:6, icon: sliderSalaryIcon, title:'Account:', text: "A quick summary of your budget - Track information about your cash and bank accounts in one central location." },
    { id:7, icon: sliderTemplateIcon, title:'Template:', text: "Creating templates to simplify and speed up the entry of transactions!" },
    { id:8, icon: sliderCategoryIcon, title:'Category:', text: "To analyze your cash flow, divide it into specific categories. For example: Expenses: food, shopping or income: salary, gifts." },
];



</script>


<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.help-section {
    &-main {
        background-color: $main-bg-color;
        padding: 50px 100px;
    }

    &-services {
        @include flex(center,center, 20px);

        &-info {
            width: 435px;
            &-title {
                font-size: 3rem;
                color: $second-font-color;
                margin-bottom: 20px;
            }
            &-text {
                color: $third-font-color;
            }
        }
    }
}

.slider-area {
  position: relative;
  padding: 50px 80px 100px 80px;    
  background-color: $main-bg-color;
  & h1 {
   margin-bottom: 60px;
   font-size: 3rem;
   color: $second-font-color;
  }
}

.custom-nav {
  position: absolute;
  top: 0;
  right: 7%;
  display: flex;
  gap: 12px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 26px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s;
}

.custom-prev-1, .custom-next-1, .custom-prev-2, .custom-next-2 {
  background: $main-color;
  color: $white-color;
}

.nav-btn:hover {
  filter: brightness(1.1);
}


.slide-box {
  height: 300px;
  border-radius: 16px;
  background: $main-bg-color;
  @include flex(center, flex-start, 30px, column);
  padding: 20px;
  font-size: 22px;
  font-weight: 600;
  &-review {
    background-color: $white-color;
  }  
  & h3 {
    font-size: 1.2rem;
    color: $second-font-color;
  }
  & p {
    font-size: 15px;
    color: $third-font-color;
    font-weight: 400;
  }
  &-star {
    width: 100px;
    height: 20px;
    margin-bottom: 20px;
  }
  &-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &-info {
    @include flex(center, flex-start, 10px);
  }  
}
.swiper-button-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>