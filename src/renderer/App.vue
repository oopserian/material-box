<template>
    <div id="app">
        <h1>Hello Vue 3!</h1>
        <button @click="selectLibrary">选择库</button>
    </div>
</template>

<script lang="ts" setup>
const selectLibrary = async () => {
    console.log(window)
    const result = await window.fileAPI.selectFolder();
    console.log(result);
};
</script>

<style scoped>
/* 添加样式 */
</style>