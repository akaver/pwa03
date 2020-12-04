import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/listitems',
        name: 'listitemsIndex',
        component: () => import(/* webpackChunkName: "listitemsIndex" */ '../views/ListItems/Index.vue')
    },
    {
        path: '/listitems/edit/:id',
        name: 'listitemsEdit',
        props: true,
        component: () => import(/* webpackChunkName: "listitemsEdit" */ '../views/ListItems/Edit.vue')
    },
    {
        path: '/listitems/create',
        name: 'listitemsCreate',
        component: () => import(/* webpackChunkName: "listitemsCreate" */ '../views/ListItems/Create.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
