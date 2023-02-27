import { routes } from '@/page';
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';


export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})