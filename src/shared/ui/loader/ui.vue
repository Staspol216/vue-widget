<template>
    <div :class="$style.loader"></div>
</template>
  
<style lang="scss" module>
.loader {
    animation: rotation 0.75s linear infinite;
    border: 1px solid;
    border-color: #09121F transparent;
    border-radius: 50%;
    height: 60px;
    width: 60px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>