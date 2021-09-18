import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/account-settings',
    name: 'pages-account',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/user/create',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/user/add.vue'),
  },
  {
    path: '/user/edit/:id',
    name: 'pages-settings',
    component: () => import('@/views/pages/user/edit.vue'),
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/views/pages/auth/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/forgotpassword',
    name: 'pages-for',
    component: () => import('@/views/pages/auth/forgotpassword.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/password-reset/:id',
    name: 'pages-forgotpassword',
    component: () => import('@/views/pages/auth/newpassword.vue'),
    meta: {
      layout: 'blank',
    },
  },
  // {
  //   path: '/pages/register',
  //   name: 'pages-register',
  //   component: () => import('@/views/pages/Register.vue'),
  //   meta: {
  //     layout: 'blank',
  //   },
  // },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
