import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/for_teachers',
    component: Layout,
    redirect: '/tasks_constructor',
    name: 'For teachers',
    alwaysShow: true,
    meta: {
      title: 'Преподавателям',
      icon: 'nested'
    },
    children: [
      {
        path: 'tasks_constructor',
        name: 'Tasks Constructor',
        component: () => import('@/views/tasks-constructor/index'),
        meta: { title: 'Конструктор заданий' }
      },
      /*{
        path: 'graders_constructor',
        name: 'Graders Constructor',
        component: () => import('@/views/tasks-constructor/grader_create'),
        meta: { title: 'Конструктор грейдеров' },
        hidden: true
      },
      {
        path: 'publish_grader',
        name: 'Publish Grader',
        component: () => import('@/views/tasks-constructor/grader_publish'),
        meta: { title: 'Публикация грейдера' },
        hidden: true
      },*/
      {
        path: '/for_teachers/tasks_constructor/:id/cmm_manage',
        name: 'Manage CMM',
        component: () => import('@/views/tasks-constructor/cmm_manage'),
        meta: { title: 'Управление КИМом' },
        props: true,
        hidden: true
      },
      {
        path: '/for_teachers/tasks_constructor/:id/create_variants',
        name: 'Create Variants',
        component: () => import('@/views/tasks-constructor/cmm_create_variants'),
        meta: { title: 'Сгенерировать варианты' },
        hidden: true
      },
      {
        path: '/for_teachers/tasks_constructor/:id/give_out_variants',
        name: 'Give Out Variants',
        component: () => import('@/views/tasks-constructor/cmm_give_out_variants'),
        meta: { title: 'Раздать варианты' },
        hidden: true
      },
    ]
  },

  {
    path: 'project-repo',
    component: Layout,
    children: [
      {
        path: 'https://git.miem.hse.ru/19101',
        meta: { title: 'Gitlab проекта', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
