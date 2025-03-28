<template>
    <div>
        <div class="tools">
            <button @click="selectLibrary">选择库</button>
            <p>{{ items?.length }}个文件</p>
        </div>
        <div class="images">
            <img v-for="item in items" :key="item.id"
                :src="'file://' + settings.rootLibraryDir + '/.pptbox/items/' + item.id + '/' + item.name + '.thumb.png'"
                alt="" srcset="">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type ItemData } from "@main/modules/item";
import { type SettingParams } from "@main/modules/setting";
import { windowAPI } from '@utils/renderer-api';
import { onMounted, ref } from 'vue';

const settings = ref<SettingParams>({});
const items = ref<ItemData[]>();

const selectLibrary = async () => {
    await windowAPI('library').select();
    await getSetting();
    getItems();
};

const getSetting = async () => {
    settings.value = await windowAPI('setting').getAll();
}

const getItems = async () => {
    items.value = await windowAPI('item').getAll();
}

onMounted(async () => {
    await getSetting();
    getItems();
})

</script>

<style scoped>
.tools {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.images{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.images>img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
</style>