
<template>
    <div>
        <div v-for="task in this.tasks" :key="task.id">
            <div
                @dblclick="toggle(task.id)"
                :class="[task.reminder ? 'task-reminder' : '', 'task']"
            >
                <h3>
                    {{task.text}}
                    <i
                        @click="onDelete(task.id)"
                        class="fas fa-times"
                    >X</i>
                </h3>
                <p>{{task.day}}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    name: 'task-component',
    computed: { ...mapGetters('TaskModule', { tasks: 'fetchTasks' }) }
})
export default class Tasks extends Vue {
    // @Prop({ required: true, type: Array }) readonly tasks!: Array<Task>
    tasks!: any[];

    onDelete (id: number): void {
        this.$store.dispatch('TaskModule/deleteTask', id)
    }

    toggle (id:number): void {
        this.$store.dispatch('TaskModule/toggleReminder', id)
    }

    beforeMount (): void {
        this.$store.dispatch('TaskModule/setInitialTasks')
    }
}

// npm install --save vuex-class
// import { Action } from 'vuex-class'

// @Component()
// export default class UsersAdd extends Vue {
//   userName: string = "";

//   @Action('newUser')
//   newUser!: (newUser: string) => void
//   addUser() {
//     console.log("...adding new user");
//     this.newUser(this.userName);
//   }
// }
</script>
<style scoped>
.fas {
    color: red;
}
.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.task-reminder {
    border-left: 5px solid green;
}

.h3 {
    display: flex;
    align-items: center;
    justify-content:space-between;
}
</style>
