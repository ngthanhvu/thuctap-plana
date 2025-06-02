import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: '', name: 'home', component: Home }
        ]
    },
    {
        path: '/login',
        component: AuthLayout,
        children: [
            { path: '', name: 'login', component: Login }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
