<template>
    <div :class="$style.header">
        <div :class="$style.title">
            Settings
        </div>
        <RouterLink :class="$style.settingsBtn" to="/">
            <Close />
        </RouterLink>
    </div>
    <Empty :class="$style.empty" v-if="citiesStore.isEmptyCitiesList">Add at least one city</Empty>
    <div v-else :class="$style.list">
        <Draggable @end="onDrop" v-model="citiesStore.cities" item-key="id" handle=".dndHandler">
            <template #item="{ element }: { element: City }">
                <CityLabel dnd="dndHandler" :key="element.id" :city="element">
                    <template #extra>
                        <DeleteCity :id="element.id" />
                    </template>
                </CityLabel>
            </template>
        </Draggable>
    </div>
    <AddNewCity />
</template>

<script setup lang="ts">
import { AddNewCity } from "@/features/add-new-city";
import { DeleteCity } from "@/features/delete-city";
import { onDrop } from "@/features/drag-and-drop-city";
import { CityLabel, cityModel } from "@/entities/city";
import { Empty } from "@/shared/ui/empty";
import Close from "@/shared/ui/icons/Close.vue"
import Draggable from 'vuedraggable';
import { onMounted } from "vue";
import { City } from "@/shared/api";

const citiesStore = cityModel.use();

onMounted(() => {
    citiesStore.getCities()
});

</script>

<style lang="scss" module>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 12px;

    a {
        display: flex;
        align-items: center;
    }
}

.title {
    font-size: 24px;
}

.list {
    margin-bottom: 24px;
}

.settingsBtn {
    display: flex;
}

.empty {
    flex: 0 0 auto;
    margin-bottom: 20px;
}
</style>