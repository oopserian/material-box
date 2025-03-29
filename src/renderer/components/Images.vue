<template>
    <div>
        <div class="tools">
            <button @click="selectLibrary">选择库</button>
            <p>{{ items?.length }}个文件</p>
        </div>
        <div class="images">
            <div class="item" v-for="item in items" :key="item.id">
                <img :src="'file://' + settings.rootLibraryDir + '/.pptbox/items/' + item.id + '/' + item.name + '.thumb.png'"
                    alt="" srcset="">
                <p>{{ item.name }}</p>
            </div>
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

.images {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.images>.item {
    width: 100px;
    object-fit: contain;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
}

.item>img{
    width: 100%;
    height: 100px;
    object-fit: contain;
    border: 1px solid #eee;
}
</style>