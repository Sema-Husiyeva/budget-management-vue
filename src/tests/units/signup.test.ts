import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SignupPage from '@/pages/Signup/SignupPage.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/store/features/auth';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

describe('SignupPage.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SignupPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn
          })
        ],
        components: {
          BaseDialog,
          BaseButton
        }
      }
    });
  });

  it('should render email, password, and repeat password inputs', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.findAll('input[type="password"]').length).toBeGreaterThanOrEqual(1);
  });

  it('should show validation errors if fields are empty', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Email is required');
    expect(wrapper.text()).toContain('Password is required');
    expect(wrapper.text()).toContain('Please repeat your password');
  });

  it('should show error for invalid email format', async () => {
    await wrapper.find('input[type="text"]').setValue('not-an-email');
    await wrapper.findAll('input[type="password"]')[0].setValue('123456');
    await wrapper.findAll('input[type="password"]')[1].setValue('123456');
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('Invalid email format');
  });

  it('should show error if passwords do not match', async () => {
    await wrapper.find('input[type="text"]').setValue('user@example.com');
    await wrapper.findAll('input[type="password"]')[0].setValue('123456');
    await wrapper.findAll('input[type="password"]')[1].setValue('654321');
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('Passwords do not match');
  });

  it('should show dialog on successful signup', async () => {
    const authStore = useAuthStore();
    authStore.user = null;

    await wrapper.find('input[type="text"]').setValue('user@example.com');
    await wrapper.findAll('input[type="password"]')[0].setValue('123456');
    await wrapper.findAll('input[type="password"]')[1].setValue('123456');
    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.showDialog).toBe(true);
    expect(wrapper.findComponent({ name: 'BaseDialog' }).exists()).toBe(true);
  });

  it('should show error if user already exists', async () => {
    const authStore = useAuthStore();
    authStore.user = { email: 'user@example.com', password: '123456' };

    await wrapper.find('input[type="text"]').setValue('user@example.com');
    await wrapper.findAll('input[type="password"]')[0].setValue('123456');
    await wrapper.findAll('input[type="password"]')[1].setValue('123456');
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('User already exists. Please log in.');
  });
});