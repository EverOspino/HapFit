import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/inicio',
        name: 'inicio',
        component: () => import( /* webpackChunkName: "about" */ '../views/Inicio.vue')
    },
    {
        path: '/registro',
        name: 'registro',
        component: () => import( /* webpackChunkName: "about" */ '../views/Registro.vue')
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: () => import( /* webpackChunkName: "about" */ '../views/Perfil_Usuario.vue'),
        meta: { requireAuth: true }
    },
    {
        path: '/planes_entrenador',
        name: 'planes_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../views/Planes_Entrenador.vue')
    },
    {
        path: '/navegacion_entrenador',
        name: 'navegacion_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../components/Navbar.vue')
    },
    {
        path: '/rutinas_entrenador/:idRutina',
        name: 'rutinas_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../views/Rutinas_Entrenador.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import( /* webpackChunkName: "about" */ '../views/Admin.vue')
    },
    {
        path: '/chat_usuario/:usuarioQueRecibe',
        name: 'chat_usuario',
        component: () => import( /* webpackChunkName: "about" */ '../components/Chat_Entrenador.vue'),
        props: true,

    },
        {
        path: '/wallet',
        name: 'wallet',
        component: () => import( /* webpackChunkName: "about" */ '../views/Wallet.vue'),
        props: true,

    },
        {
        path: '/login_admin',
        name: 'login_admin',
        component: () => import( /* webpackChunkName: "about" */ '../views/Login_Admin.vue'),
        props: true,

    },

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
    store.dispatch('leerToken')
    // console.log(store.state.token)
    if (rutaProtegida && store.state.token === null) {
        // ruta protegida es true
        // token es nulo true, por ende redirigimos al inicio
        next('/')
    } else {
        // En caso contrario sigue...
        next()
    }

})
export default router