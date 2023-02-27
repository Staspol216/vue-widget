<template>
    <div :class="$style.empty">
        <slot />
    </div>
</template>


<style lang="scss" module>
.empty {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
}
</style>