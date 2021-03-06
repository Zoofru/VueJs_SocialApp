import { createRouter, createWebHistory } from "vue-router";
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Settings from '../views/Setting.vue'
import Profile from '../views/Profile.vue'
import Spark from '../views/Spark.vue'
import AllSparks from '../views/AllSparks.vue'

const routes = [
    {
        path: '/about',
        name: 'About',
        component: About
    }, {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/signup',
        name: 'Signup',
        component: Signup
    }, {
        path: '/settings',
        name: 'Settings',
        component: Settings
    }, {
        path: '/profile',
        component: Profile
    }, {
        path:'/spark',
        component: Spark,
        props: true
    }, {
        path: '/sparks',
        name: 'All Sparks',
        component: AllSparks,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router