<template>
    <div>
        <button @click="onClick()" :class="[btnState ? 'green-btn' : 'red-btn', 'btn']">{{text}}</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'toggle-task' })
export default class ToggleTask extends Vue {
    private btnState = true;
    private text = 'Add task';

    @Emit() onClick (): void {
        this.btnState = !this.btnState
        this.text = this.btnState ? 'Add task' : 'Cancel'
        this.$emit('toggle-add-task')
    }
}
</script>
<style scoped>
.green-btn {
    background: #26ac26;
}

.red-btn {
    background: #d11525;
}

.btn {
    display: inline-block;
    color: rgb(255, 255, 255);
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
}
</style>
