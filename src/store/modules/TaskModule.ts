/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Task } from '@/infrastructure/interface/task'
/* eslint-disable @typescript-eslint/no-explicit-any */

const url = '/api/tasks'
const headers = { 'Content-type': 'application/json' }
const state = (): any => ({ tasks: [] })

const mutations = {
    TOGGLE_REMINDER (state: any, payload: Task): void {
        state.tasks = state.tasks.map((task: Task) => {
            return task.id === payload.id ? { ...task, reminder: payload.reminder } : task
        })
    },
    ADD_TASK (state: any, payload: Task): void {
        state.tasks = [...state.tasks, payload]
    },
    DELETE_TASK (state: any, payload: any): void {
        payload.res.status === 200
            ? (state.tasks = state.tasks.filter((task: Task) => task.id !== payload.id))
            : alert('Error deleting task')
    },
    SET_TASKS (state: any, payload: Array<Task>): void {
        state.tasks = payload
    }
}

const actions = {
    async toggleReminder (state: any, id: number): Promise<void> {
        let updateTask: any = []

        await fetch(url + '/' + id)
            .then((response) => response.json())
            .then((taskToToggle) => {
                updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
            })

        await fetch(url + '/' + id, { method: 'PUT', headers: headers, body: JSON.stringify(updateTask) })
            .then((response) => response.json())
            .then((responseJSON) => {
                state.commit('TOGGLE_REMINDER', responseJSON)
            })
    },
    async saveTask (state: any, payload: Task): Promise<void> {
        await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(payload) })
            .then((response) => response.json())
            .then((responseJSON) => {
                state.commit('ADD_TASK', responseJSON, payload)
            })
    },
    async deleteTask (state: any, payload: number): Promise<void> {
        if (confirm('Are you sure?')) {
            await fetch(url + '/' + payload, { method: 'DELETE' })
                .then((response) => {
                    state.commit('DELETE_TASK', { res: response, id: payload })
                })
        }
    },
    async setInitialTasks (state: any): Promise<void> {
        await fetch(url)
            .then((response) => response.json())
            .then((responseJSON) => {
                state.commit('SET_TASKS', responseJSON)
            })
    }
}

const getters = {
    fetchTasks (state: any): Array<Task> {
        return state.tasks
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
