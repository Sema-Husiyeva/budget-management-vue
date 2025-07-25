<template>
    <section class='successful-payment-section'>
        <the-banner bannerTitle='Payment page' bannerDescription='Secure your access to premium features with a quick and easy payment. Choose the plan that fits your needs and take control of your finances today. Your journey to smarter budgeting starts here.' :bannerImg="bannerImg"/>

        <div class='successful-payment-section-message'>
            <div class='successful-payment-section-message-card'>
              <img :src="susccessImg" alt="successfulPayment" />
              <h1>Payment was successful!</h1>
              <p>Thank you for a good choice</p>
              <base-button to="/" mode='btn-blue'>Return to the home page</base-button>
            </div>
        </div>
    </section>
</template>


<script setup>
import bannerImg from "@/assets/images/payment.png";
import susccessImg from "@/assets/images/succesfulPayment.png";
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.successful-payment-section {
    background-color: $main-bg-color;

    &-message {
        @include flex(center, center);
        height: 100vh;

        &-card {
            @include flex(center, center, 40px, column);
            width: 70%;
            background-color: $white-color;
            border-radius: 10px;
            padding: 70px 0;

            & h1 {
                color: $second-font-color;
                font-size: 1.5rem;
            }
            & p {
                color: $third-font-color;
                font-size: 1.2rem;
            }
        }
    }
}
</style>