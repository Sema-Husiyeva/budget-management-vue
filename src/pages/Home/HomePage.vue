<template>
    <the-banner :bannerImg="bannerImg" :bannerTitle="t('banner.title')" :bannerDescription="t('banner.description')"></the-banner>
    <div class="home-section-start">
    <h1 class="home-section-start-title">{{ t('main.how to start') }}</h1>

    <div class="home-section-start-icons">
      <div class="home-section-start-icons-info">
        <div class="home-section-start-icons-info-activity">
          <img :src="startActivityIcon" alt="start-activity-icon" />
        </div>
        <p>{{ t('main.step 1') }}</p>
      </div>

      <img class="home-section-start-icons-line" :src="startLineIcon" alt="start-line-icon" />

      <div class="home-section-start-icons-info">
        <div class="home-section-start-icons-info-wallet">
          <img :src="startWalletIcon" alt="start-wallet-icon" />
        </div>
        <p>{{ t('main.step 2') }}</p>
      </div>

      <img class="home-section-start-icons-line" :src="startLineIcon" alt="start-line-icon" />

      <div class="home-section-start-icons-info">
        <div class="home-section-start-icons-info-paper">
          <img :src="startPaperIcon" alt="start-paper-icon" />
        </div>
        <p>{{ t('main.step 3') }}</p>
      </div>
    </div>

    <div class="home-section-start-video">
    <video :src="budgetVideo" controls autoplay muted loop />
  </div>
  </div>

  <div class="slider-area">
    <div>
      <h1>{{ t('main.slider title') }}</h1>
    <div class="custom-nav">
      <button class="nav-btn custom-prev">
        <span>&lsaquo;</span>
      </button>
      <button class="nav-btn custom-next">
        <span>&rsaquo;</span>
      </button>
    </div>
    </div>

    <swiper
      class="mySwiper"
      :modules="[Navigation]"
      :slides-per-view="3"
      :space-between="32"
      :slides-per-group="1"
      :loop="false"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <div class="slide-box">
          <img :src="item.icon" alt="slider-icon" />
          <p>{{ item.text }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>

  
  <section class="home-section-subscription">
    <h1 class="home-section-subscription-title">{{ t('main.plan title') }}</h1>
    <p class="home-section-subscription-text">{{ t('main.plan description') }}</p>

    <div class="home-section-subscription-switch">
      <p class="home-section-subscription-switch-name">{{ t('main.yearly') }}</p>
      <label>
        <input type="checkbox" :checked="isMonthly" @change="handleToggle" />
        <span class="slider"></span>
      </label>
      <p class="home-section-subscription-switch-name">{{ t('main.monthly') }}</p>
    </div>

    <div class="home-section-subscription-cards">
      <div class="home-section-subscription-card left">
        <h2>{{ t('main.basic plan') }}</h2>
        <h1>{{ isMonthly ? `$3/${t('main.monthly')}` : `$3/${t('main.yearly')}` }}</h1>
        <p>{{ t('main.basic desc 1') }}</p>
        <p>{{ t('main.basic desc 2') }}</p>
        <p>{{ t('main.basic desc 3') }}</p>
        <base-button
          class="subscription-banner-section-card-btn"
          mode="btn-blue"
          @click="handleNavigate(
           isMonthly ? '$3' : '$30',
           isMonthly ? 'Basic (Monthly)' : 'Basic( Yearly)'
          )"
        >
        {{ t('main.get started') }}
        </base-button>
      </div>

      <div class="home-section-subscription-card right">
        <h2>{{ t('main.premium plan') }}</h2>
        <h1>{{ isMonthly ? `$25/${t('main.monthly')}` : `$250/${t('main.monthly')}` }}</h1>
        <p>{{ t('main.premium desc 1') }}</p>
        <p>{{ t('main.premium desc 2') }}</p>
        <p>{{ t('main.premium desc 3') }}</p>
        <base-button
          class="subscription-banner-section-card-btn"
          mode="btn-white"
          @click="handleNavigate(
           isMonthly ? '$25' : '$250',
           isMonthly ? 'Premium (Monthly)' : 'Premium (Yearly)'
        )"
        >
        {{ t('main.get started') }}
        </base-button>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import bannerImg from '@/assets/images/banner-img-home.png';
import startActivityIcon from '@/assets/icons/start-activity-icon.svg'
import startWalletIcon from '@/assets/icons/start-wallet-icon.svg'
import startPaperIcon from '@/assets/icons/start-paper-icon.svg'
import startLineIcon from '@/assets/icons/start-line-icon.svg'
import budgetVideo from '@/assets/videos/budget-video.mp4'
import sliderActivityIcon from '@/assets/icons/home-slider-activity.svg'
import sliderCardIcon from '@/assets/icons/home-slider-card.svg'
import sliderPaperIcon from '@/assets/icons/home-slider-paper.svg'
import sliderWalletIcon from '@/assets/icons/home-slider-wallet.svg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { Navigation } from 'swiper/modules'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/features/auth';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const items = computed(() => [
    { id:1, icon: sliderActivityIcon, text: t('main.slider description 1') },
    { id:2, icon: sliderWalletIcon, text: t('main.slider description 2') },
    { id:3, icon: sliderPaperIcon, text: t('main.slider description 3') },
    { id:4, icon: sliderCardIcon, text: t('main.slider description 4') },
    { id:5, icon: sliderActivityIcon, text: t('main.slider description 1') },
    { id:6, icon: sliderWalletIcon, text: t('main.slider description 2') },
    { id:7, icon: sliderPaperIcon, text: t('main.slider description 3') },
    { id:8, icon: sliderCardIcon, text: t('main.slider description 4') },
]);
const isMonthly = ref(false);
const router = useRouter();
const authStore = useAuthStore();


const handleNavigate = (amount: string, planType: string) => {
  if (!authStore.loginSuccess) {
    router.push({
      path: '/login',
      query: {
        fromSubscription: 'true',
        amount,
        planType,
      }
    })
  } else {
    router.push({
      path: '/payment',
      query: {
        amount,
        planType,
      }
    })
  }
}

const handleToggle = () => {
  isMonthly.value = !isMonthly.value;
}

</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.home-section {
    &-start {
        background-color: $main-bg-color;
        padding: 80px;
        &-title {
            text-align: center;
            font-size: 3rem;
            color: $first-font-color;
            margin-bottom: 40px
        }
        &-icons {
            @include flex(center, center);
            &-info {
            @include flex(center, center, 30px, column);
            &-activity{
                @include flex(center, center, 0);
                width: 90px;
                background-color: $pink-color;
                height: 90px;
                border-radius: 20px;
                box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            }
            &-wallet {
                @include flex(center, center, 0);
                width: 90px;
                background-color: $main-color;
                height: 90px;
                border-radius: 20px;
                box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            }
            &-paper {
                @include flex(center, center, 0);
                width: 90px;
                background-color: $orange-color;
                height: 90px;
                border-radius: 20px;
                box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            }
            & p {
                text-align: center;
                color: $third-font-color
            }
          } 
          &-line {
                margin-bottom: 65px;
          }
        }

        &-video {
          @include flex(center, center, 0);
          padding: 80px 0 ;
          & video {
            max-width: 1200px;
            border-radius: 20px;
          }
        }
    }

    &-subscription {
        @include flex(start, center, 20px, column);
        padding: 80px 0;
        background-color: $second-bg-color;
       
        &-title {
        color: $first-font-color;
        font-size: 3.5rem;
    }
    &-text {
        color: $third-font-color;
    }

    &-switch {
        @include flex(center, center, 20px);

        &-name {
            color: $second-font-color;
        }

        & label {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;

            & input {
                opacity: 0;
                width: 0;
                height: 0;

                &:checked + .slider {
                    background-color: $second-bg-color;
                }
                & + .slider {
                    box-shadow: 0 0 4px $main-color;
                }
                &:checked + .slider:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                }
            }
        }

        & span {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: $second-bg-color;
            border-radius: 34px;
            -webkit-transition: .4s;
            transition: .4s;

            &:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: $main-color;
                border-radius: 50%;
                -webkit-transition: .4s;
                transition: .4s;
            }
        }
    }

    &-cards {
        @include flex(center, center, 70px);
    }
    &-card {
        @include flex(center, center, 30px, column);
        padding: 40px;
        border-radius: 10px;
        border: 1px solid #CECECE;
        width: 350px;
        &.left {
            background-color: $white-color;
            & h2 {
                color: $third-font-color;
                font-size: 2rem;
            }
            & h1 {
                color: $main-color;
                font-size: 3rem;
            }
            & p {
                color: $third-font-color;
            }
        }
        &.right {
            background-color: $main-color;
            color: $white-color;
            & h2 {
                font-size: 2rem;
            }
            & h1 {
                font-size: 3rem;
            }
        }
        &-btn {
            width: 100%;
        }
    }
}
}

.slider-area {
  position: relative;
  padding: 0 80px 100px 80px;    
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

.custom-prev, .custom-next{
  background: $main-color;
  color: $white-color;
}

.nav-btn:hover {
  filter: brightness(1.1);
}


.slide-box {
  height: 300px;
  border-radius: 16px;
  background: #b3d0d7;
  @include flex(center, flex-start, 50px, column);
  padding: 20px;
  font-size: 22px;
  font-weight: 600;
  & p {
    color: $second-font-color;
    font-weight: 400;
  }
}
.swiper-button-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>