import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddTask from '@/components/AddTask.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
    saveTask: jest.fn()
}

const store = new Vuex.Store({
    modules: {
        TaskModule: {
            namespaced: true,
            actions
        }
    }
 })

describe('AddTask.vue', () => {
  it('renders with default values', () => {
    const wrapper = shallowMount(AddTask, { })

    expect(wrapper.vm.$data.text).toBe('')
    expect(wrapper.vm.$data.day).toBe('')
    expect(wrapper.vm.$data.reminder).toBe(false)
  })

  it('on submit dispatches action with new values', () => {
    const wrapper = shallowMount(AddTask, { store, localVue })
    const newTask = { text: 'testText', day: 'tuesday', reminder: true }

    wrapper.setData(newTask)
    wrapper.vm.$forceUpdate()

    expect(wrapper.vm.$data.text).toBe('testText')
    expect(wrapper.vm.$data.day).toBe('tuesday')
    expect(wrapper.vm.$data.reminder).toBe(true)

    wrapper.find('form').trigger('submit.prevent')

    expect(actions.saveTask).toHaveBeenCalled()
  })
})
