<template>
    <div :class="$style.inputWrapper">
        <input :class="$style.input" v-model="inputValue" type="text">
        <button @click="handleClick" :class="$style.button" type="button">
            <Add />
        </button>
    </div>
</template>

<script setup lang="ts">
import { cityModel } from '@/entities/city';
import { weatherModel } from '@/entities/weather';
import Add from "@/shared/ui/icons/Add.vue";
import { ref } from 'vue';

const weatherStore = weatherModel.use();
const cityStore = cityModel.use();
const inputValue = ref('');

const handleClick = () => {
    if (!inputValue.value) return
    cityStore.addNewCity(inputValue.value)
        .then((weatherData => {
            weatherStore.addNewWeather(weatherData)
            inputValue.value = ''
        }))
}

</script>

<style lang="scss" module>
.inputWrapper {
    display: flex;
}

.input {
    margin-right: 16px;
    flex: 1 1 auto;
    padding: 4px;
}

.inputWrapper:focus-visible {
    border: unset;
}

.button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    outline: none;
    padding: 0;
    cursor: pointer;
    margin-right: 8px;
}
</style>