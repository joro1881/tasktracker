import { shallowMount } from '@vue/test-utils'
import ToggleTask from '@/components/ToggleTask.vue'

describe('ToggleTask.vue', () => {
  it('renders with default values', () => {
    const wrapper = shallowMount(ToggleTask, { })

    expect(wrapper.vm.$data.btnState).toBe(true)
    expect(wrapper.vm.$data.text).toBe('Add task')

    expect(wrapper.find('button').text()).toBe('Add task')
    expect(wrapper.find('button').classes()).toStrictEqual(['green-btn', 'btn'])
  })

  it('on btn click change state and style', async () => {
    const wrapper = shallowMount(ToggleTask, { })

    wrapper.find('button').trigger('click')
    await wrapper.vm.$forceUpdate()

    expect(wrapper.find('button').text()).toBe('Cancel')
    expect(wrapper.find('button').classes()).toStrictEqual(['red-btn', 'btn'])
    expect(wrapper.vm.$data.btnState).toBe(false)
    expect(wrapper.vm.$data.text).toBe('Cancel')
    expect(wrapper.emitted('toggle-add-task'))
  })
})
