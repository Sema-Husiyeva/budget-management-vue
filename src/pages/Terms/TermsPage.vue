<template>
    <div class="terms-and-conditions">
     <h1>Terms and Conditions</h1>
     <p class="date">Last updated: May 28, 2025</p>

    <div class="terms-section">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using Monux, you agree to be bound by these Terms and Conditions.</p>
    </div>

    <div class="terms-section">
      <h2>2. Use of Service</h2>
      <p>You agree to use our service only for lawful purposes and in a way that does not infringe the rights of others.</p>
    </div>

    <div class="terms-section">
      <h2>3. Account Responsibility</h2>
      <p>You are responsible for maintaining the confidentiality of your account and password.</p>
    </div>

    <div class="terms-section">
      <h2>4. Subscription and Payment</h2>
      <p>By subscribing, you agree to pay the applicable fees and abide by the billing terms provided.</p>
    </div>

    <div class="terms-section">
      <h2>5. Termination</h2>
      <p>We reserve the right to suspend or terminate your access if you violate these terms.</p>
    </div>

    <div class="terms-section">
      <h2>6. Changes to Terms</h2>
      <p>We may update these Terms and Conditions at any time. Continued use of Monux means you accept the changes.</p>
    </div>

    <div class="terms-section">
      <h2>7. Contact Us</h2>
      <p>If you have any questions, feel free to contact us at support@monux.com.</p>
    </div>
   </div>
</template>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.terms-and-conditions {
  max-width: 900px;
  margin: 60px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  h1 {
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 10px;
    color: $main-color;
    transition: color 0.3s ease;
  }

  .date {
    text-align: center;
    font-size: 0.95rem;
    color: $third-font-color;
    margin-bottom: 40px;
  }

  .terms-section {
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(40px);
    animation: opacity 0.6s ease forwards;
    animation-delay: 0.2s;

    &:nth-child(even) {
      animation-delay: 0.3s;
    }

    h2 {
      font-size: 1.5rem;
      color: $main-color;
      margin-bottom: 10px;
      position: relative;

      &::after {
        content: '';
        width: 40px;
        height: 3px;
        background: $main-color;
        position: absolute;
        bottom: -6px;
        left: 0;
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 120px;
      }
    }

    p {
      font-size: 1.05rem;
      line-height: 1.7;
      color: $second-font-color;
    }
  }
}


@keyframes opacity {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>