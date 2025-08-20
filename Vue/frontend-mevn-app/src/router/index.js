import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import linkApi from "@/api/linkApi";

const redirectLink = async(to, from, next) => {
  if(to.params.nano.length > 6) return next('/404');

  const { nano } = to.params
  try {
    const { data } = await linkApi.get(`/links/${nano}`)
    // console.log(data );
    window.location.href = data.fullLink
    next()
  } catch (error) {
    console.log(error);
    next('/404')
  }

}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
        path: '/',
        component: ()=> import('../views/IndexPage.vue'),
        meta: {
          auth: true,
        },
    },
    {
        path: '/protected',
        component: ()=> import('../views/ProtectedPage.vue'),
        meta: {
          auth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: ()=> import('../views/RegisterPage.vue')
    },
    {
        path: '/:nano',
        name: 'nano',
        component: ()=> import('../views/RedirectPage.vue'),
        beforeEnter: redirectLink
    },
    {
        path: '/404',
        name: '404',
        component: ()=> import('../views/ErrorNotFound.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=> import('../views/ErrorNotFound.vue')
    },
  ],
})

router.beforeEach(async(to, from, next)=>{
  const userStore = useUserStore()
  const requireAuth = to.meta.auth;

  if(requireAuth){

    // if(!userStore.token){
    //   console.log('refresh!');
    //   await userStore.getRefreshToken()
    // }
    if(userStore.token){
      return next()
    }
    return next('/login')
  }

  next()
})

export default router;
