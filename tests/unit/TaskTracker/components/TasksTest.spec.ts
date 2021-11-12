// renders component
// before mount vue dispatched
// tasks are set

// on toggle vuex event dispatched / result changed
// on delete vuex event dispatched / result changed

import { shallowMount, createLocalVue } from '@vue/test-utils'
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

describe('Tasks.vue', () => {
  it('renders with all tasks', async () => {
    const wrapper = shallowMount(Tasks, { store, localVue })

    expect(actions.setInitialTasks).toHaveBeenCalled()
    expect(getters.fetchTasks).toHaveBeenCalled()
  })

  it('submits toggle event', async () => {
    const wrapper = shallowMount(Tasks, { store, localVue })

    wrapper.find('div div div').trigger('dblclick')

    expect(actions.toggleReminder).toHaveBeenCalled()
  })

  it('submits delete event', async () => {
    const wrapper = shallowMount(Tasks, { store, localVue })

    wrapper.find('i').trigger('click')

    expect(actions.deleteTask).toHaveBeenCalled()
  })
})
