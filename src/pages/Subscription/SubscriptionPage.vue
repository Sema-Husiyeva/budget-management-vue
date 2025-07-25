<template>
    <section class="subs-section-subscription">
    <h1 class="subs-section-subscription-title">Subscription Plans</h1>
    <p class="subs-section-subscription-text">Choose the best plan for your business.</p>

    <div class="subs-section-subscription-switch">
      <p class="subs-section-subscription-switch-name">Yearly</p>
      <label>
        <input type="checkbox" :checked="isMonthly" @change="handleToggle" />
        <span class="slider"></span>
      </label>
      <p class="subs-section-subscription-switch-name">Monthly</p>
    </div>

    <div class="subs-section-subscription-cards">
      <div class="subs-section-subscription-card left">
        <h2>Basic plan</h2>
        <h1>{{ isMonthly ? "$3/Month" : "$30/Year" }}</h1>
        <p>Access to basic features</p>
        <p>Monthly budget tracking</p>
        <p>Cancel anytime</p>
        <base-button
          class="subs-banner-section-card-btn"
          mode="btn-blue"
          @click="handleNavigate(
           isMonthly ? '$3' : '$30',
           isMonthly ? 'Basic (Monthly)' : 'Basic (Yearly)'
         )"
        >
        Get Started
        </base-button>
      </div>

      <div class="subs-section-subscription-card right">
        <h2>Premium plan</h2>
        <h1>{{ isMonthly ? "$25/Month" : "$250/Year" }}</h1>
        <p>Advanced analytics & insights</p>
        <p>Team collaboration tools</p>
        <p>Customizable budgeting tools</p>
        <base-button
          class="subscription-banner-section-card-btn"
          mode="btn-white"
          @click="handleNavigate(
           isMonthly ? '$25' : '$250',
           isMonthly ? 'Premium (Monthly)' : 'Premium (Yearly)'
          )"
        >
        Get Started
        </base-button>
      </div>
    </div>
  </section>

  <section class='plans-section container'>
        <h1 class='plans-section-title'>Advantages of Plans</h1>
        <div class='plans-section-info'>
            <img class='plans-section-img' :src="planImg" alt="plan-image" />
            <div>
                <h3 class='plans-section-info-title'>You will use the services of our application by subscribing to the plans:</h3>
                <ul class='plans-section-info-list'>
                    <li>1. Create unlimited accounts</li>
                    <li>2. Detailed graphs for analysis</li>
                    <li>3. Unlimited use of income and expense categories(and subcategories)</li>
                    <li>4. Monitoring money movements from one center</li>
                    <li>5. Multicurrency system</li>
                    <li>6. Synchronization between Web, IOS, Android versions</li>
                    <li>7. Using new features</li>
                    <li>8. The app will be free to use for the first 30 days</li>
                </ul>
            </div>
        </div>
    </section>
</template>


<script setup lang="ts" scoped>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/features/auth';
import planImg from '@/assets/images/plan.jpeg';

const isMonthly = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleToggle = () => {
  isMonthly.value = !isMonthly.value;
}

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
</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.subs-section {
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
.plans-section {
    margin-top: 100px;
    padding: 100px 0 80px 0;
    &-title {
        font-size: 3rem;
        color: $first-font-color;
        margin: 25px 0;
    }

    &-info {
        @include flex(space-between, center, 0);

        &-title {
            color: $second-font-color;
            margin-bottom: 20px;
        }
        &-list {
            list-style-type: none;
            color: $second-font-color;
            & li {
                margin-bottom: 15px;
            }
        }
    }
}
</style>