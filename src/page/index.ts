export { default as Routing } from './ui.vue';

export const routes = [
    {path: '/', component: () => import('./weathers-list')},
    {path: '/settings', component: () => import('./settings')}
];
