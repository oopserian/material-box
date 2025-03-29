<template>
    <div class="layout">
        <div class="aside">
            <Folder/>
        </div>
        <div class="container">
            <Images/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Folder from "@renderer/components/Folders.vue";
import Images from "@renderer/components/Images.vue";
</script>

<style scoped>

.layout{
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.aside{
    width: 200px;
}

.container{
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1rem;
}

</style>