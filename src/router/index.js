import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '../components/Layout.vue'
import writeNode from '../views/writeNode.vue'
Vue.use(Router)

const router= new Router({
  routes: [
//     {
//       path: '/',
// component:layout,
// redirect:'index',
//       meta:{
//         title:'云笔记'
//       },
//       children:[
   
//       ]
//     },
    {
      path:'/',
      name:'index',
      component:index,
      meta:{
        title:'首页'
      }

    },
    {
      path:'/writeNode',
      name:'write',
      component:writeNode,
      meta:{
        title:'编辑器'
      }
    },
    {
      path:"/region",
      name:'region',
      component:()=>import('../views/region.vue')
    },
  ]
})
router.beforeEach((to,from,next)=>{
if(to.meta&&to.meta.title){
  document.title=to.meta.title
}
Nprogress.start
next()
})
export default router
