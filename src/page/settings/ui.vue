<template>
    <div :class="$style.header">
        <div :class="$style.title">
            Settings
        </div>
        <RouterLink to="/">
            <Close />
        </RouterLink>
    </div>
    <div v-if="citiesStore.cities.length" :class="$style.list">
        <CityLabel v-for="city in citiesStore.cities" :city="city" :key="city.id" />
    </div>
</template>

<script setup lang="ts">

import Close from "@/shared/ui/icons/Close.vue"
import { CityLabel, cityModel } from "@/entities/city"
import { onMounted } from "vue";

const citiesStore = cityModel.use();

onMounted(async () => {
    await citiesStore.getCitiesAync();
});

</script>

<style lang="scss" module>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 12px;
}

.title {
    font-size: 24px;
}
</style>