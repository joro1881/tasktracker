import { mount, createLocalVue } from '@vue/test-utils'
import store from '@/store/modules/TaskModule'
import { Task } from '@/infrastructure/interface/task'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const fakeData: Array<Task> =
[
    {
    id: 1,
    text: 'Example 1',
    day: 'March 1st at 2:30pm',
    reminder: true
    },
    {
        id: 2,
        text: 'Example 2',
        day: 'April 1st at 2:30pm',
        reminder: true
    }
]

describe('TaskModuleStoreTest', () => {
    // beforeAll(() => {
    //  })
    // afterAll(() => { })

    describe('Getters : ', () => {
        const state = { tasks: fakeData }
        it('Fetch all Tasks', () => {
            const actual = store.getters.fetchTasks(state)
            expect(actual).toEqual(fakeData)
        })
    })

    describe('Actions : ', () => {
        const state = { tasks: {} }
        function setupFetchStub (data : Array<Task>) {
            return function fetchStub (_url: any) {
              return new Promise((resolve) => {
                resolve({
                  json: () =>
                    Promise.resolve({ data })
                })
              })
            }
          }

        globalThis.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

        it('Action setInitialTasks', () => {
            store.actions.setInitialTasks(state).then(() => {
                expect(state).toEqual({ tasks: fakeData })
            })
        })
        it('Action toggleReminder', () => {
            store.actions.toggleReminder(state, 1).then(() => {
                fakeData[0].reminder = false
                expect(state).toEqual({ tasks: fakeData })
            })
        })

        // it('Action saveTask', () => {

        // })
        // it('Action deleteTask', () => {

        // })
    })

    describe('Mutations : ', () => {
        const state = { tasks: {} }
        const tasksDummies: Array<Task> =
            [
                {
                id: 1,
                text: 'Example 1',
                day: 'March 1st at 2:30pm',
                reminder: true
                },
                {
                    id: 2,
                    text: 'Example 2',
                    day: 'April 1st at 2:30pm',
                    reminder: true
                }
            ]

        it('SET_TASKS', () => {
            store.mutations.SET_TASKS(state, tasksDummies)
            expect(state.tasks).toEqual(tasksDummies)
        })
        it('DELETE_TASK', () => {
            const payload = {
                res: {
                    status: 200
                },
                id: 2
            }

            store.mutations.DELETE_TASK(state, payload)
            expect(state).not.toEqual({ tasks: tasksDummies })
            expect(tasksDummies.length).toEqual(2)
            expect(Object.keys(state.tasks).length).toEqual(1)
        })
        it('ADD_TASK', () => {
            const payload: Task = {
                id: 3,
                text: 'Example 2',
                day: 'April 1st at 2:30pm',
                reminder: true
            }

            store.mutations.ADD_TASK(state, payload)
            tasksDummies[1].id = 3

            expect(state.tasks).toEqual(tasksDummies)
        })
        it('TOGGLE_REMINDER', () => {
            const payload: Task = {
                id: 3,
                text: 'Example 2',
                day: 'April 1st at 2:30pm',
                reminder: false
            }

            store.mutations.TOGGLE_REMINDER(state, payload)

            expect(state.tasks).not.toEqual(tasksDummies)
            tasksDummies[1].reminder = false
            expect(state.tasks).toEqual(tasksDummies)
        })
    })
})
