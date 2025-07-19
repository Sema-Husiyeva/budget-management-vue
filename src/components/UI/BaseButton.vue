<template>
  <component
    :is="componentType"
    :to="isRouterLink ? to : undefined"
    :href="isExternalLink ? to : undefined"
    :target="isExternalLink ? '_blank' : undefined"
    rel="noopener noreferrer"
    :class="['btn', mode]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  to?: string
  external?: boolean
  mode?: string
}>()

const isExternalLink = computed(() =>
  props.external || props.to?.startsWith('http')
)

const isRouterLink = computed(() =>
  props.to && !isExternalLink.value
)

const componentType = computed(() => {
  if (isExternalLink.value) return 'a'
  if (isRouterLink.value) return 'router-link'
  return 'button'
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.btn {
    border: none;
    border-radius: 10px;
    padding: 14px 45px;
    @include flex(center, center, 5px);
    font-size: 17px;

    &-white {
        background-color: $white-color;
        color: $third-bg-color;
        text-decoration: none;
        transition: all 0.3s;
        &:hover {
            background-color: $hover-bg-color;
            color: $white-color;
            cursor: pointer;
        }
    }

    &-blue {
        background-color: $main-color;
        color: $white-color;
        text-decoration: none;
        transition: all 0.3s;
        &:hover {
            background-color: $hover-bg-color;
            cursor: pointer;
        }
    }
}
</style>