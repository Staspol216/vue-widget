import { cityModel } from "@/entities/city";
import { weatherModel } from "@/entities/weather";
import { DraggableEvent } from "@/shared/lib/vuedraggable";

const citiesStore = cityModel.use();
const weathersStore = weatherModel.use()

export const onDrop = (e: DraggableEvent<HTMLDivElement>) => {
    citiesStore.reorderCities()
    weathersStore.reorderWeathers(e.oldIndex, e.newIndex);
}