<template>
    <div :class="$style.city">
        <div :class="$style.burgerWrapper">
            <span :class="$style.burger"></span>
        </div>
        <div :class="$style.cityName">
            {{ city.name }}
        </div>
        <div :class="$style.binIcon">
            <Bin />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { City } from '@/shared/api';
import Bin from '@/shared/ui/icons/Bin.vue';
defineProps<{
    city: City
}>()
</script>

<style lang="scss" module>
.city {
    display: flex;
    align-items: center;
    background: #e2edfa;
    padding: 8px;
}

.cityName {
    display: flex;
    line-height: 120%;
    font-size: 14px;
    margin-right: 16px;
}

.binIcon {
    display: flex;
    margin-left: auto;
    cursor: pointer;
}

.burgerWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    min-width: 14px;
    margin-right: 16px;
    height: 20px;
    cursor: pointer;
}

.burger,
.burger:before,
.burger::after {
    display: block;
    background: #202429;
    position: absolute;
    height: 1.5px;
    width: 100%;
}

.burger::before {
    content: "";
    margin-top: -3.5px;
}

.burger::after {
    content: "";
    margin-top: 3.5px;
}
</style>