import { config } from '@vue/test-utils'

config.global.stubs = {
  RouterLink: true,
  RouterView: true,
}