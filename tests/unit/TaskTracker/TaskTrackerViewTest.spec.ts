import { mount, createLocalVue } from '@vue/test-utils'
import TaskTrackerView from '@/views/TaskTracker.vue'
import Tasks from '@/components/Tasks.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  deleteTask: jest.fn(),
  toggleReminder: jest.fn(),
  setInitialTasks: jest.fn()

}

const getters = {
  fetchTasks: jest.fn(() => {
      return [
          {
            id: 1,
            text: 'Example 1',
            day: 'March 1st at 2:30pm',
            reminder: true
          }
        ]
  })
}

const store = new Vuex.Store({
  modules: {
      TaskModule: {
          namespaced: true,
          actions,
          getters
      }
  }
})

describe('TaskTracker.vue', () => {
  it('renders view and child components', () => {
    const wrapper = mount(TaskTrackerView, {
      store,
      localVue
    })

    // setTimeout(() => {
      expect(wrapper.vm.$data.showAddTask).toBe(false)
      expect(wrapper.findComponent({ name: 'ToggleTask' }).exists()).toBe(true)
      // expect(wrapper.findComponent({ name: 'AddTask' }).exists()).toBe(true)
      // expect(wrapper.findComponent({ name: 'Tasks' }).exists()).toBe(true)
      // done()
    // })
  })
})
