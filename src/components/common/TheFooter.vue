<template>
  <footer class="footer-section container">
    <div class="footer-section-main">
      <div class="footer-section-info">
        <h1 class="footer-section-info-logo">Monux</h1>
        <div class="footer-section-info-list">
          <RouterLink class="footer-section-info-list-item" to="/privacy">Privacy Policy</RouterLink>
          <RouterLink class="footer-section-info-list-item" to="/terms">Terms and Conditions</RouterLink>
          <RouterLink class="footer-section-info-list-item" to="/contact">Contact Us</RouterLink>
        </div>
      </div>

      <div class="footer-section-contact">
        <p class="footer-section-contact-title">Newsletter</p>
        <div class="footer-section-contact-email">
          <div class="footer-section-contact-email-input">
            <input type="email" v-model="email" placeholder="E-mail" />
            <base-button
              class="footer-section-contact-email-input-btn"
              title="'Subscribe'"
              mode="btn-blue"
              @click="handleSubscribe"
            >
              Subscribe
            </base-button>
          </div>
          <p v-if="errorMessage" class="footer-section-contact-email-input-error">{{ errorMessage }}</p>
          <base-dialog v-model="showDialog" title="Subscribed Successfully">
            <template #default>
               You have been successfully subscribed to our newsletter.
            </template>
          </base-dialog>
        </div>

        <div class="footer-section-contact-social-media">
          <img :src="facebookIcon" @click="openLink('https://facebook.com')" alt="facebook-icon" />
          <img :src="instagramIcon" @click="openLink('https://instagram.com')" alt="instagram-icon" />
          <img :src="youtubeIcon" @click="openLink('https://youtube.com')" alt="youtube-icon" />
          <img :src="twitterIcon" @click="openLink('https://twitter.com')" alt="twitter-icon" />
          <img :src="linkedinIcon" @click="openLink('https://linkedin.com')" alt="linkedin-icon" />
        </div>
      </div>

      <div class="footer-section-navbar">
        <RouterLink class="footer-section-navbar-link" to="/" exact>Home</RouterLink>
        <RouterLink class="footer-section-navbar-link" to="/help">Help</RouterLink>
        <RouterLink class="footer-section-navbar-link" to="/faq">FAQ</RouterLink>
        <RouterLink class="footer-section-navbar-link" to="/blog">Blog</RouterLink>
        <RouterLink class="footer-section-navbar-link" to="/subscription">Subscription</RouterLink>
      </div>
    </div>
    <p class='footer-section-copyright'>© 2025 «Budget» ASC. All Rights Reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import facebookIcon from '@/assets/icons/facebook-icon.svg'
import instagramIcon from '@/assets/icons/instagram-icon.svg'
import youtubeIcon from '@/assets/icons/youtube-icon.svg'
import twitterIcon from '@/assets/icons/twitter-icon.svg'
import linkedinIcon from '@/assets/icons/linkedin-icon.svg'

const email = ref('');
const errorMessage = ref('');
const showDialog = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handleSubscribe() {
  const value = email.value.trim()

  if (!value) {
    errorMessage.value = 'Email cannot be empty.'
    return
  }

  if (!emailRegex.test(value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  showDialog.value = true
  email.value = ''
  errorMessage.value = ''
}

function openLink(url: string) {
  window.open(url, '_blank')
}
</script>


<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.footer-section {
    padding: 30px 0;
    position: relative;
    &-main {
        @include flex(space-between, center, 20px);
        margin-bottom: 40px;
    }

    &-info {
        &-logo {
            color: $main-color;
            font-size: 2rem;
            margin-bottom: 20px;
        }

        &-list {
             @include flex(center, flex-start, 10px, column);
            &-item {
                text-decoration: none;
                color: $third-font-color;
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
        }
    }

    &-contact {
        &-title {
            color: $first-font-color;
            margin-bottom: 12px;
        }

        &-email {
            margin-bottom: 20px;
            &-input {
                display: flex;

                & input {
                    border: 1px solid #CCCCCC91;
                    border-radius: 5px 0 0 5px;
                    padding: 12px 20px;
                }
    
                &-btn {
                    padding: 12px 30px;
                    border-radius: 0!important;
                }

                &-error {
                  color: red;
                  margin-top: 10px
                }
            }
        }

        &-social-media {
            @include flex(space-around, center);
        }
    }

    &-navbar {
        @include flex(center, center, 10px, column);

        &-link {
            text-decoration: none;
            color: $third-font-color;
            font-size: 1.1rem;
        }
    }
    &-copyright {
          font-size: 18px;
          margin-left: 0;
          margin-top: 30px;
          text-align: center;
          color: $third-font-color;;
    }
}
</style>