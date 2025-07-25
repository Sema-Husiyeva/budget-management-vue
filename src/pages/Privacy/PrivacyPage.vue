<template>
    <section class="privacy-policy">
     <h1>Privacy Policy</h1>
     <p class="date">Effective Date: May 28, 2025</p>

    <div class="policy-section">
      <h2>1. Introduction</h2>
      <p>Welcome to Monux. We value your privacy and are committed to protecting your personal data.</p>
    </div>

    <div class="policy-section">
      <h2>2. Data We Collect</h2>
      <p>We collect your email address and password when you sign up for our services.</p>
    </div>

    <div class="policy-section">
      <h2>3. How We Use Your Information</h2>
      <p>We use your data to manage your account, provide services, and improve your experience.</p>
    </div>

    <div class="policy-section">
      <h2>4. Data Sharing</h2>
      <p>We do not sell or share your data with third parties except where required by law.</p>
    </div>

    <div class="policy-section">
      <h2>5. Data Security</h2>
      <p>Your data is stored securely, and we take reasonable steps to protect it from unauthorized access.</p>
    </div>

    <div class="policy-section">
      <h2>6. Your Rights</h2>
      <p>You can request to access, correct, or delete your data at any time by contacting us.</p>
    </div>

    <div class="policy-section">
      <h2>7. Contact Us</h2>
      <p>If you have any questions, please email us at support@monux.com.</p>
    </div>
   </section>
</template>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.privacy-policy {
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

  .policy-section {
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(40px);
    animation: fadeInOpacity 0.6s ease forwards;
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


@keyframes fadeInOpacity {
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