<template>
    <section class="signup-section">
    <div class='signup-section-slider'> 
      <swiper
      class="mySwiper"
      :modules="[Pagination]"
      :slides-per-view="1"
      :space-between="32"
      :slides-per-group="1"
      pagination
    >
      <swiper-slide>
        <div class='signup-section-slider-info'>
            <img :src="firstImg" alt="first-login-img" />
            <h2>Register by entering your email or phone number</h2>
            <p>We suggest you spend smarter, not less</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class='signup-section-slider-info'>
            <img :src="secondImg" alt="second-login-img" />
            <h2>Create an account to control your cash flow</h2>
            <p>The most convenient way to track your expenses</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class='signup-section-slider-info'>
            <img :src="thirdImg" alt="third-login-img" />
            <h2>Start controlling your budget by adding your expenses or income.</h2>
            <p>The app that shapes your budget</p>
        </div>
      </swiper-slide>
     </swiper>
    </div>

    <div class="signup-section-form">
      <div class="signup-section-form-title">
        <h1>Welcome</h1>
        <p>Enter your login and password to log in</p>
      </div>

      <div class="signup-section-form-input">
        <label for="email">Email</label>
        <input v-model="email" type="text" :class="['signup-section-form-input-email', { error: errors.email }]" placeholder="Type your email" />
        <p v-if="errors.email" class="signup-section-form-input-error">{{ errors.email }}</p>
      </div>

    <div class="signup-section-form-input">
    <label for="password">Password</label>
    <div :class="['signup-section-form-input-password', { error: errors.password }]">
      <input
        id="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Type your password"
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

    <p v-if="errors.password" class="signup-section-form-input-error">
      {{ errors.password }}
    </p>
    </div>
    <div class="signup-section-form-input">
    <label for="repeatePassword">Repeate password</label>
    <div :class="['signup-section-form-input-password', { error: errors.password }]">
      <input
        id="repeatePassword"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Type your password"
        v-model="repeatePassword"
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

    <p v-if="errors.repeatePassword" class="signup-section-form-input-error">
      {{ errors.repeatePassword }}
    </p>
    </div>
    <base-dialog v-model="showDialog" title="You have been successfully registered!">
            <template #default>
               <base-button mode="btn-blue" class="login-section-form-dialog" to="/login" >Go to login page</base-button>
            </template>
    </base-dialog>
      <base-button mode="btn-blue" @click="handleLogin">Signup</base-button>

      <div class='signup-section-form-signin'>
        <p>Do you have an account?</p>
        <base-button to="/login" mode="btn-white">Login</base-button>
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
const repeatePassword = ref('');
const showDialog = ref(false);

const showPassword = ref(false);
const errors = ref<{ email?: string; password?: string; repeatePassword?: string }>({});

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

    if (!repeatePassword.value) {
        errors.value.repeatePassword = 'Please repeat your password';
    } else if (repeatePassword.value !== password.value) {
        errors.value.repeatePassword = 'Passwords do not match';
    }
    return Object.keys(errors.value).length === 0;
};

const handleLogin = () => {
    if (!validateForm()) return;
    if (authStore.user && authStore.user.email === email.value) {
        errors.value.email = 'User already exists. Please log in.';
        return;
    }

    authStore.signup({ email: email.value, password: password.value});
    showDialog.value = true;
    email.value = '';
    password.value = '';
    repeatePassword.value = '';
}
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.signup-section {
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
                width: 200px;
                border: none;
                background-color: $input-bg-color;
            }
            & input:focus {
                outline: none;
            }
           }

            &-error {
            color: red;
            font-size: 0.90rem
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