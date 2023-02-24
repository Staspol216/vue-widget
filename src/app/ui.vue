<template>
    <div :class="$style.app">
        <div :class="$style.widget">
            <Routing />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Routing } from "@/page"
</script>

<style lang="scss" module>
@import "./index.scss";

.app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
}

.widget {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 350px;
    width: 300px;
    border-radius: 8px;
    background-color: #fff;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12));
    overflow-x: scroll;
}
</style>

