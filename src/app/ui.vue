<template>
    <div :class="$style.widget">
        <Routing />
    </div>
</template>
<script setup lang="ts">
import { Routing } from "@/page";
</script>

<style lang="scss" module>
@import "./index.scss";

.widget {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 400px;
    width: 300px;
    border-radius: 8px;
    background-color: #fff;
    filter: var(--shadow);
    overflow-x: scroll;
}
</style>

