<template>
    <div id="app">
        <button @click="selectLibrary">选择库</button>
    </div>
</template>

<script lang="ts" setup>
const selectLibrary = async () => {
    await window.libraryAPI.selectLibrary();
};
</script>

<style scoped>
/* 添加样式 */
#app{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>