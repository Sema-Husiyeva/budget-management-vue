<template>
    <section class="login-section">
    <div class='login-section-slider'> 
      <swiper
      class="mySwiper"
      :modules="[Pagination]"
      :slides-per-view="1"
      :space-between="32"
      :slides-per-group="1"
      pagination
    >
      <swiper-slide>
        <div class='login-section-slider-info'>
            <img :src="firstImg" alt="first-login-img" />
            <h2>Register by entering your email or phone number</h2>
            <p>We suggest you spend smarter, not less</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class='login-section-slider-info'>
            <img :src="secondImg" alt="second-login-img" />
            <h2>Create an account to control your cash flow</h2>
            <p>The most convenient way to track your expenses</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class='login-section-slider-info'>
            <img :src="thirdImg" alt="third-login-img" />
            <h2>Start controlling your budget by adding your expenses or income.</h2>
            <p>The app that shapes your budget</p>
        </div>
      </swiper-slide>
     </swiper>
    </div>

    <div class="login-section-form">
      <div class="login-section-form-title">
        <h1>Welcome</h1>
        <p>Enter your login and password to log in</p>
      </div>

      <div class="login-section-form-input">
        <label>Email</label>
        <input v-model="email" type="text" data-testid="email-input" :class="['login-section-form-input-email', { error: errors.email }]" placeholder="Type your email" />
        <p v-if="errors.email" class="login-section-form-input-error">{{ errors.email }}</p>
      </div>

    <div class="login-section-form-input">
    <label for="password">Password</label>

    <div :class="['login-section-form-input-password', { error: errors.password }]">
      <input
        id="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Type your password"
        data-testid="password-input"
        v-model="password"
      />
      <img
        :src="showPassword ? eyeVisible : eyeInvisible"
        :alt="showPassword ? 'Hide password' : 'Show password'"
        @click="togglePasswordVisibility"
        role="button"
        tabindex="0"
        aria-label="Toggle password visibility"
      />
    </div>

    <p v-if="errors.password" class="login-section-form-input-error">
      {{ errors.password }}
    </p>
    </div>
    <base-dialog v-model="showDialog" title="You have been successfully logged in!">
            <template #default>
               
               <base-button mode="btn-blue" class="login-section-form-dialog" to="/" >Go to homepage</base-button>
            </template>
    </base-dialog>
    <base-button mode="btn-blue" type="submit" data-testid="login-button" @click="handleLogin">Login</base-button>

      <div class='login-section-form-signin'>
        <p>Don't have an account?</p>
        <base-button to="/signup" mode="btn-white">Sign up</base-button>
      </div>
     </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/features/auth';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { Pagination } from 'swiper/modules'
import eyeVisible from '@/assets/icons/eye-visible.svg';
import eyeInvisible from '@/assets/icons/eye-invisible.svg';
import firstImg from '@/assets/images/first-login-img.png';
import secondImg from '@/assets/images/second-login-img.png';
import thirdImg from '@/assets/images/third-login-img.png';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const showDialog = ref(false);
const errors = ref<{ email?: string; password?: string }>({});

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const validateForm = () => {
    errors.value = {};
    if (!email.value) {
        errors.value.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors.value.email = 'Invalid email format';
    }

    if (!password.value) {
        errors.value.password = 'Password is required';
    } else if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
    }
    
    return Object.keys(errors.value).length === 0;
};

const handleLogin = () => {
    if (!validateForm()) return;

    if (!authStore.user) {
        errors.value.email = 'User not found. Please sign up first.';
        return;
    }
    if (
        email.value !== authStore.user.email ||
        password.value !== authStore.user.password
    ) {
        errors.value.password = 'Incorrect email or password';
        return;
    }
    
    authStore.login({ email: email.value, password: password.value});


    const fromSubscription = route.query.fromSubscription;
    if (fromSubscription) {
      router.push('/payment');
    } else {
      showDialog.value = true;
    
    }
}
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.login-section {
    @include flex(center,center, 0);
    &-slider {
        width: 50%;
        background-color: $second-bg-color;
        &-info {
            padding: 50px;
            @include flex(center,center, 40px, column);
            height: 100vh;
            & h2 {
                color: $second-font-color;
                font-weight: 600;
                font-size: 1.5rem;
                text-align: center;
            }
            & p {
                color: #455360;
            }
        }
        & .swiper-pagination {
            margin-bottom: 80px;
        }
        & .swiper-pagination-bullet-active {
            background-color: $main-color;
        }
    }

    &-form {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 90px;
        &-title {
            & h1 {
                color: $second-font-color;
                font-size: 2rem;
                margin-bottom: 10px;
            }
        }

        &-input {
           @include  flex(flex-start, flex-start, 10px, column);

           & label {
            color: #455360;
           }
           &-email {
            border: none;
            width: 100%;
            height: 48px;
            background-color: $input-bg-color;
            border-radius: 5px;
            padding-left: 10px;
           }
           &-email:focus {
            outline: none
           }
           &-password {
            @include flex(space-between, center);
            width: 100%;
            height: 48px;
            background-color: $input-bg-color;
            border-radius: 5px;
            padding: 0 10px;
            & input {
                border: none;
                background-color: $input-bg-color;
            }
            & input:focus {
                outline: none;
            }
           }
           &-error {
            color: red;
            
           }
        }

        &-signin {
            @include flex(center, center, 20px);
            & p {
                color: #455360;
            }
        }

       
    }
}
</style>