<template>
    <div class="contact-us">
    <h1>Contact Us</h1>
    <p class="subtitle">Have questions or feedback? We’d love to hear from you.</p>

    <div class="contact-content">
      <div class="contact-info">
        <h2>Get in Touch</h2>
        <p>
          Email us anytime at
          <a href="mailto:support@monux.com">support@monux.com</a>
        </p>
        <div class="social-media">
          <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://linkedin.com/company" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <input type="text" placeholder="Your Name" v-model="name" />
        <span v-if="errors.name" class="form-error">{{ errors.name }}</span>

        <input type="email" placeholder="Your Email" v-model="email" />
        <span v-if="errors.email" class="form-error">{{ errors.email }}</span>

        <textarea placeholder="Your Message" v-model="message"></textarea>
        <span v-if="errors.message" class="form-error">{{ errors.message }}</span>

        <base-button mode="btn-blue" type="submit">Send</base-button>
      </form>

      <base-dialog v-model="showDialog" title="Your message has been sent!!">
            <template #default>
               <base-button mode="btn-blue" class="login-section-form-dialog" to="/" >Go to home page</base-button>
            </template>
      </base-dialog>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const showDialog = ref(false)

const errors = ref({
  name: '',
  email: '',
  message: ''
})

const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', message: '' }

  if (!name.value) {
    errors.value.name = 'Name is required'
    valid = false
  }

  if (!email.value) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^\S+@gmail\.com$/.test(email.value)) {
    errors.value.email = 'Only Gmail addresses are accepted'
    valid = false
  }

  if (!message.value) {
    errors.value.message = 'Message cannot be empty'
    valid = false
  }

  return valid
}

const handleSubmit = () => {
  if (validateForm()) {
    showDialog.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.contact-us {
  max-width: 1000px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;

  h1 {
    text-align: center;
    font-size: 2.8rem;
    margin-bottom: 10px;
    color: $main-color;
  }

  .subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: $third-font-color;
    margin-bottom: 40px;
  }

  .contact-content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;

    .contact-info {
      flex: 1 1 300px;

      h2 {
        font-size: 1.6rem;
        color: $main-color;
        margin-bottom: 10px;
      }

      a {
        color: $main-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      .social-media {
        margin-top: 20px;

        a {
          margin-right: 15px;
          font-size: 2rem;
          color: $main-color;
          transition: color 0.3s;

          &:hover {
            color: $second-bg-color;
          }
        }
      }
    }

    .contact-form {
      flex: 1 1 400px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      input,
      textarea {
        padding: 12px 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s;

        &:focus {
          border-color: $main-color;
          outline: none;
        }
      }
    }
  }
  .form-error {
  color: red;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}
}
</style>