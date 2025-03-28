<template>
    <div id="app">
        <button @click="selectLibrary">选择库</button>
    </div>
</template>

<script lang="ts" setup>
import { windowAPI } from '@utils/renderer-api';
import { onMounted } from 'vue';

const selectLibrary = async () => {
};
onMounted(async () => {
    const a = await windowAPI('setting').getAll();
    console.log(a);
})
</script>

<style scoped>
/* 添加样式 */
#app {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>