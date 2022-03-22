/* global expect */
import { mount } from '@vue/test-utils';
import VuestroDropdown from './VuestroDropdown.vue';

describe('VuestroDropdown', () => {
  const wrapper = mount(VuestroDropdown, {
    propsData: {
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroDropdown');
  });

  it('only renders title when not hovered', () => {
    expect(wrapper.findAll('.vuestro-dropdown')).toHaveLength(1);
    expect(wrapper.find('.vuestro-dropdown-menu').isVisible()).toBe(false);
  });

  it('emits proper events when hovered', () => {
    wrapper.find('.vuestro-dropdown-title').trigger('mouseover');
    expect(wrapper.emitted().hover).toBeTruthy();
    wrapper.find('.vuestro-dropdown').trigger('mouseleave');
    expect(wrapper.emitted().leave).toBeTruthy();
  });

  it('renders drop-down-menu when title is hovered', () => {
    wrapper.find('.vuestro-dropdown-title').trigger('mouseover');
    expect(wrapper.find('.vuestro-dropdown-menu').isVisible()).toBe(true);
    wrapper.find('.vuestro-dropdown').trigger('mouseleave');
  });

  it('adds class for left-justified', () => {
    wrapper.setProps({
      left: true,
    });
    expect(wrapper.find('.vuestro-dropdown-menu').classes('left')).toBe(true);
  });

});
