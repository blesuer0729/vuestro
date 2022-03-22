/* global expect */
import { mount } from '@vue/test-utils';
import VuestroButton from './VuestroButton.vue';

describe('VuestroButton', () => {
  const wrapper = mount(VuestroButton);

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroButton');
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="vuestro-button secondary">');
    expect(wrapper.html()).toContain('<div class="vuestro-button-content">');
  });

  it('assigns specified variant as a class', () => {
    wrapper.setProps({ variant: 'primary' });
    expect(wrapper.classes('primary')).toBe(true);
  });

  it('clicking should emit an event', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
