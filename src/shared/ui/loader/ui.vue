<template>
    <div :class="$style.loaderWrapper">
        <div :class="$style.loader"></div>
        <div :class="$style.loaderText">Loading...</div>
    </div>
</template>
  
<style lang="scss" module>
.loaderWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
}

.loader {
    animation: rotation 0.75s linear infinite;
    border: 1px solid;
    border-color: #09121F transparent;
    border-radius: 50%;
    height: 60px;
    width: 60px;
}

.loaderText {
    margin-top: 24px;
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