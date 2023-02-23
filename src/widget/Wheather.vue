<template>
    <div :class="$style.app">
        <div :class="$style.widget">
            <div :class="$style.header">
                <div :class="$style.title">
                    Wheather
                </div>
                <div :class="$style.menu">
                    <Gear />
                </div>
            </div>

            <div :class="$style.list">
                <CityCard :city="city" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { city } from "@/shared/api/mock";
import { storageApi } from "@/shared/api";
import Gear from "@/shared/ui/icons/Gear.vue";
import { CityCard } from "@/entities"
import { defineComponent } from "vue";


export default defineComponent({
    name: 'Wheather',
    components: {
        Gear,
        CityCard
    },
    mounted() {
        console.log(this.city)
        storageApi.wheather.getWeatherByCity('Paris').then(res => {
            console.log(res);
        })
    },
    data() {
        return {
            city,
        }
    },
})

</script>

<style lang="scss" module>
.app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
}

.widget {
    padding: 16px;
    height: 350px;
    width: 300px;
    border-radius: 8px;
    background-color: #fff;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12));
    overflow-x: scroll;
}

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

.menu {
    display: flex;
}
</style>

