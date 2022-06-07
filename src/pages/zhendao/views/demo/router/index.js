export const demoRoute = [
    {
      path: '/',
      name: 'index',
      meta: { title: 'demo' },
      component: resolve => require(['@/pages/zhendao/views/demo/page/index.vue'],resolve)
    }
]
