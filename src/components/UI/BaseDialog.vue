<template>
  <teleport to="body">
    <div v-if="modelValue" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
    <dialog open v-if="modelValue">
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot class="desc"></slot>
      </section>
      <menu v-if="!fixed">
        <slot name="actions">
          <base-button mode="btn-blue" @click="tryClose">Close</base-button>
        </slot>
      </menu>
    </dialog>
    </transition>
  </teleport>
</template>



<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  fixed?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function tryClose() {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 30vh;
  left: 30%;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: $main-color;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
  padding: 20px 0;
}

.desc {
  padding: 20px 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.dialog-enter-active {
    transition: all 0.3s ease-out;
}
.dialog-leave-active {
    transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>