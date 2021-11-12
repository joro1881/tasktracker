<template>
    <div>
        <div style="margin-bottom: 5vw;">
            <header class="header"><h1>Task Tracker</h1></header>
            <ToggleTask @toggle-add-task="onClick" />
        </div>
        <AddTask v-if="showAddTask"/>
        <Tasks style="width: 40vw; margin: auto" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tasks from '@/components/Tasks.vue'
import AddTask from '@/components/AddTask.vue'
import ToggleTask from '@/components/ToggleTask.vue'

@Component({ components: { Tasks, AddTask, ToggleTask } })
export default class TaskTracker extends Vue {
    private showAddTask = false;

    private onClick (): void {
            this.showAddTask = !this.showAddTask
    }
}
</script>
<style scoped>
 .header {
     display: flex;
     justify-content: space-between;
     margin: auto;
     align-items: center;
     margin-bottom: 20px;
 }
</style>
