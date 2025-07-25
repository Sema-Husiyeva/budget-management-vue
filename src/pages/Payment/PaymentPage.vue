<template>
    <the-banner bannerTitle="Payment page" bannerDescription="Secure your access to premium features with a quick and easy payment. Choose the plan that fits your needs and take control of your finances today. Your journey to smarter budgeting starts here." :bannerImg="bannerImg"/>

    <div class="payment-section">
      <div class="payment-section-left">
        <div class="payment-section-left-input">
          <label for="type">Payment Details</label>
          <select class="payment-section-left-input-select" v-model="paymentType">
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </select>
        </div>

        <div class="payment-section-left-input">
          <label for="name">Card Name</label>
          <input
            :class="['input', errors.cardName && 'error']"
            v-model="cardName"
            type="text"
          />
          <p v-if="errors.cardName" class="payment-section-left-error">{{ errors.cardName }}</p>
        </div>

        <div class="payment-section-left-input">
          <label for="number">Card Number</label>
          <input
            :class="['input', errors.cardNumber && 'error']"
            v-model="cardNumber"
            type="number"
          />
          <p v-if="errors.cardNumber" class="payment-section-left-error">{{ errors.cardNumber }}</p>
        </div>

        <div>
          <div class="payment-section-left-label">
            <p>Expiration</p>
            <div class="payment-section-left-label-cvc">
              <p>CVC</p>
              <img :src="CVCImg" alt="cvc" />
            </div>
          </div>
          <div class="payment-section-left-expiration">
            <input :class="['input', errors.month && 'error']" v-model="month" type="number" />
            <span>/</span>
            <input :class="['input', errors.year && 'error']" v-model="year" type="number" />
            <input :class="['input', errors.cvc && 'error']" v-model="cvc" type="number" />
          </div>
          <div>
            <p v-if="errors.month" class="payment-section-left-error">{{ errors.month }}</p>
            <p v-if="errors.year" class="payment-section-left-error">{{ errors.year }}</p>
            <p v-if="errors.cvc" class="payment-section-left-error">{{ errors.cvc }}</p>
          </div>
        </div>

        <div class="payment-section-left-buttons">
          <base-button @click="handlePayment" mode="btn-blue">Pay ${{ totalAmount.toFixed(2) }}</base-button>
        </div>
      </div>

      <div class="payment-section-right">
        <h3 class="payment-section-right-order">Order</h3>

        <div class="payment-section-right-order">
          <h3>Starter</h3>
          <h3>{{ amount }}</h3>
        </div>

        <div class="payment-section-right-order-promo">
          <div>
            <p>Promokod</p>
            <input v-model="promoCode" placeholder="Enter promo code" />
          </div>
          <base-button @click="handlePromoCode" mode="btn-blue">Apply</base-button>
        </div>
        <p v-if="promocodeError">{{ promocodeError }}</p>

        <div class="payment-section-right-order">
          <p>Time</p>
          <p>{{ planType }}</p>
        </div>

        <div class="payment-section-right-order">
          <h3>Total</h3>
          <h3>${{ totalAmount.toFixed(2) }}</h3>
        </div>
      </div>
    </div>
</template>


<script lang="ts" setup>
import bannerImg from '@/assets/images/payment.png';
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/features/auth';
import CVCImg from '@/assets/icons/cvc.svg';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const fromSubscription = computed(() => route.query.fromSubscription === 'true');
const amount = computed(() => (route.query.amount as string) || '$0');
const planType = computed(() => (route.query.planType as string) || 'Unknown');
const numberAmount = computed(() => parseFloat(amount.value.replace('$', '')));
const totalAmount = ref(numberAmount.value);
const discount = ref(0);
const promoCode = ref('');
const promocodeError = ref('');

const cardName = ref('');
const cardNumber = ref('');
const month = ref('');
const year = ref('');
const cvc = ref('');
const paymentType = ref('visa');

const errors = reactive({
  cardName: '',
  cardNumber: '',
  month: '',
  year: '',
  cvc: ''
});

function handlePromoCode() {
  if (promoCode.value.toLowerCase() === 'welcome20') {
    discount.value = numberAmount.value * 0.2;
    totalAmount.value = numberAmount.value - discount.value;
    promocodeError.value = '';
  } else {
    discount.value = 0;
    totalAmount.value = numberAmount.value;
    promocodeError.value = 'Invalid promo code!';
  }
  promoCode.value = '';
}

function handlePayment() {
  let valid = true;

  errors.cardName = /^[A-Za-z\s]+$/.test(cardName.value) ? '' : 'Card name cannot contain numbers';
  errors.cardNumber = /^\d{16}$/.test(cardNumber.value) ? '' : 'Card number must be exactly 16 digits';
  errors.month = +month.value >= 1 && +month.value <= 12 ? '' : 'Month must be between 01 and 12';
  errors.year = +year.value >= 25 ? '' : 'Year must be 25 or greater';
  errors.cvc = /^\d{3}$/.test(cvc.value) ? '' : 'CVC must be exactly 3 digits';

  if (Object.values(errors).some(error => error)) {
    valid = false;
  }

  if (valid) {
    authStore.setSubscriptionPlan({
      amount: amount.value,
      planType: planType.value
    });
    router.push('/successfulPayment');
  }
}
</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.payment-section {
    background-color: $main-bg-color;
    @include flex(center, center, 50px);
    padding: 70px 0;
    &-left {
        background-color: $white-color;
        padding: 80px;
        border-radius: 10px;
        &-input {
            @include flex(center, flex-start, 10px, column);
            margin-bottom: 20px;

            & .input {
                width: 534px;
                height: 60px;
                padding: 0 10px;
                border: 1px solid #D9D9D9;
                border-radius: 5px;
                &.error {
                  border: 1px solid red;
                }
            }
            &-select {
                width: 534px;
                height: 60px;
                padding: 0 10px;
                border: 1px solid #D9D9D9;
                border-radius: 5px;
            }
            & label {
                color: $first-font-color
            }
        }
        &-label {
            @include flex(flex-start, center, 185px);
            margin-bottom: 10px;
            & p {
                color: $first-font-color;
            }
            &-cvc {
                @include flex(center, center, 10px);
            }
        }
        &-expiration {
            @include flex(flex-start, center, 15px);
            & .input {
                border: 1px solid #D9D9D9;
                border-radius: 5px;
                &.error {
                     border: 1px solid red;
                }
            }
            & span {
                font-size: 2rem;
                font-weight: 300;
            }

            & input:nth-child(1) {
                width: 100px;
                height: 55px;
                padding-left: 40px;
            }
            & input:nth-child(3) {
                width: 100px;
                height: 55px;
                padding-left: 40px;
            }
            & input:nth-child(4) {
                height: 55px;
                width: 280px;
                padding-left: 10px;
            }
        }

        &-buttons {
            @include flex(flex-end, center, 15px);
            border-top: 1px solid #E2E8F0;
            padding-top: 30px
        }

        &-error {
        font-size: 0.90rem;
        color: red;
        }
}

    &-right, &-right-responsive {
        background-color: $white-color;
        padding: 62px;
        border-radius: 10px;
        & input {
                width: 260px;
                height: 50px;
                padding-left: 10px;
                border: 1px solid #D9D9D9;
                border-radius: 5px;
            }
        & h3 {
                color: $first-font-color;
                font-size: 1.2rem;
        }
        &-order {
             @include flex(space-between, flex-end, 15px);
             margin: 56px 0;
            &-promo {
                margin-bottom: 10px;
                @include flex(space-between, flex-end, 15px);
            }
        }
        & p {
            color: $third-font-color;
            margin-bottom: 20px;
        }
    }
    &-right-responsive {
        display: none;
    }
}
</style>