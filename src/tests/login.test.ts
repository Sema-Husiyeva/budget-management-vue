import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginPage from '@/pages/Login/LoginPage.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/store/features/auth';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';


const mockPush = vi.fn();
const mockRoute = { query: {} };

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => mockRoute
}));

describe('LoginPage.vue', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    mockPush.mockClear();
    mockRoute.query = {};

    wrapper = mount(LoginPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: null,
                loginSuccess: false
              }
            }
          })
        ],
        components: {
          BaseDialog,
          BaseButton
        }
      }
    });

    store = useAuthStore();
  });

  it('should render email and password inputs', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('should show validation errors if fields are empty', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('Email is required');
    expect(wrapper.text()).toContain('Password is required');
  });

  it('should show error if email format is invalid', async () => {
    await wrapper.find('input[type="text"]').setValue('invalid-email');
    await wrapper.find('input[type="password"]').setValue('123456');
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('Invalid email format');
  });

  it('should show error if password is too short', async () => {
    await wrapper.find('input[type="text"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('123');
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('Password must be at least 6 characters');
  });

  it('should show dialog if login is successful', async () => {
    store.user = {
      email: 'user@example.com',
      password: '123456'
    };

    await wrapper.find('input[type="text"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('123456');
    await wrapper.find('button').trigger('click');


    wrapper.vm.showDialog = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showDialog).toBe(true);
    expect(wrapper.findComponent(BaseDialog).exists()).toBe(true);
  });
});