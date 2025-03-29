<template>
    <div class="folder">
        <p v-for="folder in folders" :key="folder.id">{{ folder.name }}</p>
    </div>
</template>

<script lang="ts" setup>
import { type FolderData } from "@main/modules/folder";
import { windowAPI } from '@utils/renderer-api';
import { onMounted, ref } from 'vue';

const folders = ref<FolderData[]>([]);

onMounted(async () => {
    folders.value = await windowAPI('folder').getAll();
})
</script>

<style scoped>
.folder {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>