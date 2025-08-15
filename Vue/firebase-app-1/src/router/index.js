import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/store/user'

const requireAuth = async(to, from, next) => {
    const useUser = useUserStore()
    await useUser.currentUser()
    if(useUser.status === 'authenticated'){
        next()
    }else{
        next('/login')
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: requireAuth,
        },
        {
            path: '/login',
            name: 'login',
            component: ()=> import('../views/LoginView.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('../views/RegisterView.vue'),
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: ()=> import('../views/EditView.vue'),
            beforeEnter: requireAuth,
        },
    ],
})

export default router