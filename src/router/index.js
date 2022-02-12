import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tab',
    component: resolve => require(['@/views/Tab.vue'], resolve),
  },
  {
    path: '/TimePicker',
    name: 'TimePicker',
    component: resolve => require(['@/views/TimePicker.vue'], resolve),
  },
]

const router = new VueRouter({
  routes
})

export default router